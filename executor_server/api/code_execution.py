from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from runner.runner import Runner

executor = Runner()

code_execution = Blueprint('code_execution', __name__)


@code_execution.route('/code', methods=['POST'])
def run_code():
    request_data = request.get_json()
    executor.run_code(request_data)
    response = jsonify({'message': 'success'})
    return response, 200
