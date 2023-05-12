from flask import Blueprint, request, jsonify
from modules.token_module.token_controller import TokenController

token_blueprint = Blueprint('token_blueprint', __name__)


@token_blueprint.route('/verify', methods=['GET'])
async def verify_token():
    response, status = await TokenController.verify_token(request=request)
    return jsonify(response), status


@token_blueprint.route('/generate', methods=['GET'])
async def generate_token():
    response, status = await TokenController.generate_token(request=request)
    return jsonify(response), status
