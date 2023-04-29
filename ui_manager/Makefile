TAG ?= latest
IMAGE_REPOSITORY ?= andriisoft/cloudide-ui-manager
DOCKER_BUILD_ARGS ?= --platform=linux/x86_64

build-image:
	docker build $(DOCKER_BUILD_ARGS) . -t $(IMAGE_REPOSITORY):$(TAG)

push-image:
	docker push $(IMAGE_REPOSITORY):$(TAG)

build-and-push-image: build-image push-image