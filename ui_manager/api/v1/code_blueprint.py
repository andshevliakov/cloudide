import requests
from flask import Blueprint, request, jsonify, Response
from modules.code_module.code_controller import CodeController

code_blueprint = Blueprint('code_blueprint', __name__)


@code_blueprint.route('run', methods=['POST'])
async def run_code():
    response, status = await CodeController.run_code(request=request)
    # return Response(response=response.content, status=200, content_type=response.headers['Content-Type'])
    return jsonify(response), status
