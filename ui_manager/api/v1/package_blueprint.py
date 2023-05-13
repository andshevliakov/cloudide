from flask import Blueprint, request, jsonify
from modules.package_module.package_conroller import PackageController

package_blueprint = Blueprint('package_blueprint', __name__)


@package_blueprint.route('install', methods=['POST'])
async def install_package():
    response, status = await PackageController.install_package(request=request)
    return jsonify(response), status
