from flask import Blueprint, request, jsonify
from modules.user_module.user_controller import UserController


user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/create", methods=['POST'])
async def add_user():
    response, status = await UserController.create_user(request=request)
    return jsonify(response), status


@user_blueprint.route('/verify', methods=['GET'])
async def verify_user():
    response, status = await UserController.verify_user(request=request)
    return jsonify(response), status
