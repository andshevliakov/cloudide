TAG ?= latest

MYSQL_ROOT_PASSWORD ?= cloudide
MYSQL_DATABASE ?= users
MYSQL_USER ?= myuser
MYSQL_PASSWORD ?= mysqlide
MYSQL_HOST ?= mysql.mysql-ns.svc.cluster.local:3306
MANAGER_PORT ?= 5000
MANAGER_HOST ?= ui-manager-service.cloudide-ui-ns.svc.cluster.local
REACT_APP_EXECUTOR_URI ?= http://$(MANAGER_HOST):$(MANAGER_PORT)

build-all:
	make -C ui-manager build-image
	make -C ui build-image

push-all:
	make -C ui-manager push-image
	make -C ui push-image

build-and-push:
	make -C ui-manager build-and-push-image
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
	REACT_APP_EXECUTOR_URI=$(REACT_APP_EXECUTOR_URI) \
	MANAGER_PORT=$(MANAGER_PORT) \
	kustomize build manifests/ui | kubectl apply -f -

undeploy-ui:
	kustomize build manifests/ui | kubectl delete -f -

deploy-all: deploy-mysql deploy-usercontroller deploy-ui

undeploy-all: undeploy-mysql undeploy-usercontroller undeploy-ui
