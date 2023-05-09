import requests
from flask import Blueprint, request, jsonify, Response
from k8s_controller.k8s_controller import K8SController

code_blueprint = Blueprint('code_blueprint', __name__)


@code_blueprint.route('run', methods=['POST'])
async def run_code():
    k8s_controller = K8SController()
    executor_endpoint = k8s_controller.get_endpoint_url('admin')
    data = request.get_json()
    response = requests.post(
        "http://" + executor_endpoint + '/code/run', json=data, headers={"Content-Type": "application/json"})
    return Response(response=response.content, status=200, content_type=response.headers['Content-Type'])


@code_blueprint.route('install', methods=['POST'])
async def install_package():
    k8s_controller = K8SController()
    executor_endpoint = k8s_controller.get_endpoint_url('admin')
    data = request.get_json()
    if executor_endpoint != '':
        response = requests.post(
            "http://" + executor_endpoint + '/code/install', json=data, headers={"Content-Type": "application/json"})
        return Response(response=response.content, status=200, content_type=response.headers['Content-Type'])
    else:
        response = {
            'message': 'Unable to retrieve executor endpoint'
        }
        return jsonify(response), 500
