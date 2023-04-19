TAG ?= latest

build-all:
	make -C executor_server build-image
	make -C ui build-image

push-all:
	make -C executor_server push-image
	make -C ui push-image

build-and-push:
	make -C executor_server build-and-push-image
	make -C ui build-and-push-image

deploy-all:
	kustomize build ui/manifests | kubectl apply -f -
	kustomize build executor_server/manifests | kubectl apply -f -

undeploy-all:
	kustomize build ui/manifests | kubectl delete -f -
	kustomize build executor_server/manifests | kubectl delete -f -
