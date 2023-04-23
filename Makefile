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

generate-certificates:
	./scripts/gencert.sh

deploy-dex: generate-certificates
	kustomize build common/dex/manifests | kubectl apply -f -
	kubectl -n dex create secret tls dex.example.com.tls --cert=ssl/cert.pem --key=ssl/key.pem

undeploy-dex: 
	kustomize build common/dex/manifests | kubectl delete -f -

deploy-all-apps:
	kustomize build ui/manifests | kubectl apply -f -
	kustomize build executor_server/manifests | kubectl apply -f -

undeploy-all-apps:
	kustomize build ui/manifests | kubectl delete -f -
	kustomize build executor_server/manifests | kubectl delete -f -
