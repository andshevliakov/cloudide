import jwt
import secrets
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify

token_blueprint = Blueprint('token_blueprint', __name__)
secret_key = secrets.token_hex(15)


@token_blueprint.route('/verify', methods=['POST'])
async def verify_token():
    response = {}
    data = request.get_json()
    token = data['token']
    try:
        decoded = jwt.decode(token, secret_key, algorithms=[
                             'HS256'], verify=True)
    except jwt.exceptions.DecodeError:
        response = {
            'message': 'Token is Invalid'
        }
        return jsonify(response), 401

    exp_date = datetime.fromtimestamp(decoded['exp'])
    if datetime.now() >= exp_date:
        response = {
            'message': 'Token has expired'
        }
        return jsonify(response), 401

    response = {
        'message': 'Token is valid'
    }
    return jsonify(response), 200


@token_blueprint.route('/generate', methods=['GET'])
async def generate_token():
    response = {}
    username = request.args.get('username')
    if username is None:
        response = {
            'Username is not set'
        }
        return jsonify(response), 400

    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(minutes=20)
    }
    token = jwt.encode(
        payload=payload, key=secret_key, algorithm='HS256')
    response = {
        'token': token
    }
    return jsonify(response), 200
