/*
Copyright 2023.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package controller

import (
	"context"

	appsv1 "k8s.io/api/apps/v1"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/types"
	"k8s.io/apimachinery/pkg/util/intstr"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/controller/controllerutil"
	"sigs.k8s.io/controller-runtime/pkg/log"

	cloudidecomv1 "cloudide/api/v1"
)

const USER_LABEL = "cloudide.com/executor-app"

// UserReconciler reconciles a User object
type UserReconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=cloudide.com,resources=users,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=cloudide.com,resources=users/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=cloudide.com,resources=users/finalizers,verbs=update
// +kubebuilder:rbac:groups=core,resources=services;namespaces,verbs=get;create
// +kubebuilder:rbac:group=apps,resources=deployments,verbs=get;create
func (r *UserReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	instance := &cloudidecomv1.User{}
	logger.Info("Start to Reconcile", "name", req.Name)
	err := r.Get(ctx, req.NamespacedName, instance)
	if err != nil {
		if apierrors.IsNotFound(err) {
			return ctrl.Result{}, nil
		}
		logger.Error(err, "error reading the user object")
		return ctrl.Result{}, err
	}

	err = r.createExecutorNamespace(ctx, instance)
	if err != nil {
		logger.Error(err, "Unable to create namespace", "user", instance.Spec.Username)
		return ctrl.Result{}, err
	}

	err = r.createExecutorDeployment(ctx, instance)
	if err != nil {
		logger.Error(err, "Unable to create deployment", "user", instance.Spec.Username)
		return ctrl.Result{}, err
	}

	err = r.createExecutorService(ctx, instance)
	if err != nil {
		logger.Error(err, "Unable to create service", "user", instance.Spec.Username)
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

func (r *UserReconciler) createExecutorService(ctx context.Context, user *cloudidecomv1.User) error {
	logger := log.FromContext(ctx)
	serviceName := createUserResourceService(user.Spec.Username)
	serviceNamespace := createUserResourceNamespace(user.Spec.Username)

	found := &corev1.Service{}
	err := r.Get(ctx, types.NamespacedName{Name: serviceName, Namespace: serviceNamespace}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating Executor Service", "user", user.Spec.Username)

			service := &corev1.Service{
				ObjectMeta: metav1.ObjectMeta{
					Name:      serviceName,
					Namespace: serviceNamespace,
				},
				Spec: corev1.ServiceSpec{
					Selector: map[string]string{
						USER_LABEL: user.Spec.Username,
					},
					Ports: []corev1.ServicePort{
						{
							Name:       "http",
							Port:       80,
							TargetPort: intstr.FromInt(8080),
						},
					},
				},
			}

			if err := controllerutil.SetControllerReference(user, service, r.Scheme); err != nil {
				return err
			}

			err = r.Create(ctx, service)
			if err != nil {
				logger.Error(err, "Service creation failed", "user", user.Spec.Username)
				return err
			}
		} else {
			return err
		}
	}

	return nil
}

func (r *UserReconciler) createExecutorNamespace(ctx context.Context, user *cloudidecomv1.User) error {
	logger := log.FromContext(ctx)
	namespaceName := createUserResourceNamespace(user.Spec.Username)

	found := &corev1.Namespace{}
	err := r.Get(ctx, types.NamespacedName{Name: namespaceName}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating Namespace", "user", user.Spec.Username)
			userNamespace := &corev1.Namespace{
				ObjectMeta: metav1.ObjectMeta{
					Name: namespaceName,
				},
			}

			if err := controllerutil.SetControllerReference(user, userNamespace, r.Scheme); err != nil {
				return err
			}

			err = r.Create(ctx, userNamespace)
			if err != nil {
				logger.Error(err, "Namespace creation failed", "user", user.Spec.Username)
				return err
			}
		} else {
			return err
		}
	}
	return nil
}

func (r *UserReconciler) createExecutorDeployment(ctx context.Context, user *cloudidecomv1.User) error {
	logger := log.FromContext(ctx)
	deployName := createUserResourceName(user.Spec.Username)
	deployNamespace := createUserResourceNamespace(user.Spec.Username)

	found := &appsv1.Deployment{}
	err := r.Get(ctx, types.NamespacedName{Name: deployName, Namespace: deployNamespace}, found)
	if err != nil {
		if apierrors.IsNotFound(err) {
			logger.Info("Creating Executor deployment", "user", user.Spec.Username)
			replicas := int32(1)
			deployment := &appsv1.Deployment{
				ObjectMeta: metav1.ObjectMeta{
					Name:      deployName,
					Namespace: deployNamespace,
				},
				Spec: appsv1.DeploymentSpec{
					Replicas: &replicas,
					Selector: &metav1.LabelSelector{
						MatchLabels: map[string]string{
							USER_LABEL: user.Spec.Username,
						},
					},
					Template: corev1.PodTemplateSpec{
						ObjectMeta: metav1.ObjectMeta{
							Labels: map[string]string{
								USER_LABEL: user.Spec.Username,
							},
						},
						Spec: corev1.PodSpec{
							Containers: []corev1.Container{
								{
									Name:  "executor",
									Image: "kamlando/ubuntu-sleep:latest",
								},
							},
						},
					},
				},
			}

			if err := controllerutil.SetControllerReference(user, deployment, r.Scheme); err != nil {
				return err
			}

			err := r.Create(ctx, deployment)
			if err != nil {
				logger.Error(err, "Deployment creation failed", "user", user.Spec.Username)
				return err
			}
		} else {
			return err
		}
	}
	return nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *UserReconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&cloudidecomv1.User{}).
		Owns(&corev1.Namespace{}).
		Owns(&appsv1.Deployment{}).
		Owns(&corev1.Service{}).
		Complete(r)
}