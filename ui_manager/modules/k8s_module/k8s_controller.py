from kubernetes import client, config

CRD_NAME = 'users.cloudide.com'


class K8SController:
    def __init__(self) -> None:
        try:
            config.load_incluster_config()
        except config.ConfigException:
            config.load_kube_config()
        self._api_client = client.ApiClient()
        api = client.ApiextensionsV1Api(self._api_client)
        self._crd = api.read_custom_resource_definition(name=CRD_NAME)
        self._custom_api = client.CustomObjectsApi(self._api_client)

    def create_user(self, name: str, username: str) -> None:
        body = {
            "apiVersion": "cloudide.com/v1",
            "kind": "User",
            "metadata": {
                "name": username,
            },
            "spec": {
                "name": name,
                "username": username
            }
        }
        self._custom_api.create_cluster_custom_object(
            self._crd.spec.group, self._crd.spec.versions[0].name,
            self._crd.spec.names.plural, body)

    def get_endpoint_url(self, username: str) -> str:
        user_status = self._custom_api.get_cluster_custom_object_status(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username
        )
        if 'status' in user_status:
            if 'executorEndpoint' in user_status['status']:
                return user_status['status']['executorEndpoint']

        return ''

    def update_user(self, name: str, username: str) -> None:
        obj = self._custom_api.get_cluster_custom_object(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username
        )
        obj['spec']['name'] = name
        self._custom_api.replace_cluster_custom_object(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username,
            body=obj
        )

    def verify_executor_spec(self, username: str) -> dict:
        obj = self._custom_api.get_cluster_custom_object(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username
        )
        if 'executorSpec' in obj['spec']:
            return obj['spec']['executorSpec']
        return None

    def add_executor_spec(self, spec: dict, username: str) -> None:
        obj = self._custom_api.get_cluster_custom_object(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username
        )
        obj['spec']['executorSpec'] = spec
        self._custom_api.replace_cluster_custom_object(
            group=self._crd.spec.group,
            version=self._crd.spec.versions[0].name,
            plural=self._crd.spec.names.plural,
            name=username,
            body=obj
        )
