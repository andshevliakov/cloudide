import requests
from flask import Request
from modules.k8s_module.k8s_controller import K8SController
from modules.token_module.token_controller import TokenController
from kubernetes.client import ApiException


class CodeController:
    def __init__(self) -> None:
        pass

    @staticmethod
    async def run_code(request: Request) -> tuple:
        response = {}
        result = await TokenController.authorize_token(request=request)
        if 'message' in result:
            return (result, 401)

        k8s_controller = K8SController()
        try:
            executor_endpoint = k8s_controller.get_endpoint_url(
                result['username'])
        except ApiException as error:
            response = {
                'message': 'Internal Kubernetes error',
                'defails': str(error),
            }
            return (response, 500)

        if executor_endpoint != '':
            data = request.get_json()
            response = requests.post(
                "http://" + executor_endpoint + '/code/run', json=data, headers={"Content-Type": "application/json"}, timeout=600)
            return (response.content, 200)
        else:
            response = {
                'message': 'Unable to retrieve executor endpoint'
            }
            return (response, 500)
