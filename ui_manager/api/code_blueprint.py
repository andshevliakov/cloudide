import requests
from flask import Blueprint
from k8s_controller.k8s_controller import K8SController

code_blueprint = Blueprint('code_blueprint', __name__)


@code_blueprint.route('run', methods=['POST'])
async def run_code():
    k8s_controller = K8SController()
    executor_endpoint = k8s_controller.get_endpoint_url('admin')
    data = request.get_json()
    response = requests.post(
        executor_endpoint + '/code/run', data=data, timeout=10)
    return response
