TAG ?= latest

MYSQL_ROOT_PASSWORD ?= cloudide
MYSQL_DATABASE ?= users
MYSQL_USER ?= myuser
MYSQL_PASSWORD ?= mysqlide

mysql-export:
	export MYSQL_ROOT_PASSWORD=$(MYSQL_ROOT_PASSWORD)
	export MYSQL_DATABASE=$(MYSQL_DATABASE)
	export MYSQL_USER=$(MYSQL_USER)
	export MYSQL_PASSWORD=$(MYSQL_PASSWORD)

build-all:
	make -C ui-manager build-image
	make -C ui build-image

push-all:
	make -C ui-manager push-image
	make -C ui push-image

build-and-push:
	make -C ui-manager build-and-push-image
	make -C ui build-and-push-image

deploy-mysql: mysql-export
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
