from flask import Blueprint, request, jsonify
from modules.user_module.user_controller import UserController


user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/create", methods=['POST'])
async def add_user():
    response, status = await UserController.create_user(request=request)
    return jsonify(response), status


@user_blueprint.route("/createK8s", methods=['POST'])
async def create_k8s_user():
    response, status = await UserController.create_k8s_user(request=request)
    return jsonify(response), status


@user_blueprint.route('/verify', methods=['GET'])
async def verify_user():
    response, status = await UserController.verify_user(request=request)
    return jsonify(response), status


@user_blueprint.route('/info', methods=['GET'])
async def get_user():
    response, status = await UserController.get_user(request=request)
    return jsonify(response), status


@user_blueprint.route('/update', methods=['PUT'])
async def update_user():
    response, status = await UserController.update_user(request=request)
    return jsonify(response), status


@user_blueprint.route('verifySpec', methods=['POST'])
async def verify_executor_spec():
    response, status = await UserController.verify_executor_spec(request=request)
    return jsonify(response), status


@user_blueprint.route('/executorSpec', methods=['POST'])
async def add_executor_spec():
    response, status = await UserController.add_executor_spec(request=request)
    return jsonify(response), status
