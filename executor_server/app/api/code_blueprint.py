from flask import Blueprint, request, jsonify
from runner.runner import Runner

code_blueprint = Blueprint('code_blueprint', __name__)
runner = Runner()


@code_blueprint.route('/run', methods=['POST'])
def run_code():
    request_data = request.get_json()
    output = ''
    try:
        output = runner.run_code(code_snippet=request_data['code'])
        response = {
            'message': output
        }
        return jsonify(response), 200
    except Exception as error:
        output = str(error)
        response = {
            'message': output
        }
        return jsonify(response), 500


@code_blueprint.route('/install', methods=['POST'])
def install_package():
    request_data = request.get_json()
    output = ''
    try:
        output = runner.install_package(
            package_name=request_data['packageName'])
        response = {
            'message': output
        }
        return jsonify(response), 200
    except Exception as error:
        output = str(error)
        response = {
            'message': output
        }
        return jsonify(response), 500
