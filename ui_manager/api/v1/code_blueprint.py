from flask import Blueprint, request, jsonify
from modules.code_module.code_controller import CodeController

code_blueprint = Blueprint('code_blueprint', __name__)


@code_blueprint.route('run', methods=['POST'])
async def run_code():
    response, status = await CodeController.run_code(request=request)
    return jsonify(response), status
