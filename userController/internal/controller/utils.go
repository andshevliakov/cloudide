package controller

import (
	"fmt"
	"os"

	corev1 "k8s.io/api/core/v1"
)

func createUserResourceName(username string) string {
	return fmt.Sprintf("%s-%s", username, "executor")
}

func createUserResourceNamespace(username string) string {
	return fmt.Sprintf("%s-%s-%s", username, "executor", "ns")
}

func createUserResourceService(username string) string {
	return fmt.Sprintf("%s-%s-%s", username, "executor", "service")
}

func GetEnvOr(key string, def string) string {
	value, exists := os.LookupEnv(key)
	if !exists || value == "" {
		return def
	}
	return value
}

func isExecutorSpecEmpty(spec corev1.ResourceRequirements) bool {
	return spec.Limits == nil && spec.Requests == nil
}

func areEqualResources(resources1, resources2 corev1.ResourceRequirements) bool {
	if resources1.Limits.Cpu().Equal(*resources2.Limits.Cpu()) {
		if resources1.Limits.Memory().Equal(*resources2.Limits.Memory()) {
			if resources1.Requests.Cpu().Equal(*resources2.Requests.Cpu()) {
				if resources1.Requests.Memory().Equal(*resources2.Requests.Memory()) {
					return true
				}
			}
		}
	}

	return false
}
