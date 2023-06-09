TAG ?= release-0.3

MYSQL_ROOT_PASSWORD ?= cloudide
MYSQL_DATABASE ?= users
MYSQL_USER ?= myuser
MYSQL_PASSWORD ?= mysqlide
MYSQL_HOST ?= mysql.mysql-ns.svc.cluster.local
MANAGER_PORT ?= 5000
MANAGER_HOST ?= ui-manager-service
REACT_APP_MANAGER_URI ?= 

build-all:
	make -C ui_manager build-image TAG=$(TAG)
	make -C ui build-image TAG=$(TAG)
	make -C executor_server build-image TAG=$(TAG)
	make -C userController docker-build

push-all:
	make -C ui_manager push-image TAG=$(TAG)
	make -C ui push-image TAG=$(TAG)
	make -C executor_server push-image TAG=$(TAG)
	make -C userController docker-push

build-and-push:
	make -C ui_manager build-and-push-image
	make -C ui build-and-push-image

deploy-mysql:
	MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) \
	MYSQL_DATABASE=$(MYSQL_DATABASE) \
	MYSQL_USER=$(MYSQL_USER) \
	MYSQL_PASSWORD=$(MYSQL_PASSWORD) \
	kustomize build manifests/mysql | kubectl apply -f -

undeploy-mysql:
	kustomize build manifests/mysql | kubectl delete -f -

deploy-usercontroller:
	kustomize build userController/config/default | kubectl apply -f -

undeploy-usercontroller:
	kustomize build userController/config/default | kubectl delete -f -

deploy-ui:
	MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD) \
	MYSQL_DATABASE=$(MYSQL_DATABASE) \
	MYSQL_USER=$(MYSQL_USER) \
	MYSQL_PASSWORD=$(MYSQL_PASSWORD) \
	MYSQL_HOST=$(MYSQL_HOST) \
	REACT_APP_MANAGER_URI=$(REACT_APP_MANAGER_URI) \
	MANAGER_PORT=$(MANAGER_PORT) \
	kustomize build manifests/ui | kubectl apply -f -

undeploy-ui:
	kustomize build manifests/ui | kubectl delete -f -

deploy-istio:
	kustomize build manifests/istio | kubectl apply -f -

undeploy-istio:
	kustomize build manifests/istio | kubectl delete -f -

deploy-all: deploy-mysql deploy-usercontroller deploy-ui

undeploy-all: undeploy-mysql undeploy-usercontroller undeploy-ui

