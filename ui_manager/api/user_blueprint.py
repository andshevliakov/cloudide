import sys
import logging
from flask_sqlalchemy import SQLAlchemy
from kubernetes.client import ApiException
from flask import Blueprint, request, jsonify
from envloader import DB_HOST, DB_PASSWD, DB_USER, DB_NAME
from k8s_controller.k8s_controller import K8SController
from db_controller.db_controller import create_user, find_user

user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/create", methods=['POST'])
async def add_user():
    response = {}
    data = request.get_json()
    if create_user(data):
        response = {
            'message': "User created"
        }
        try:
            k8sController = K8SController()
            k8sController.create_user(
                name=data['name'], username=data['username'])
        except ApiException as error:
            logging.error(error)
            response = {
                'message': error.reason
            }
            return jsonify(response), 500
        return jsonify(response), 201
    else:
        response = {
            'message': 'Unable to create user'
        }
        return jsonify(response), 500


@user_blueprint.route('/verify', methods=['GET'])
async def verify_user():
    response = {}
    username = request.args.get('username')
    if username is None:
        response = {
            'message': 'Username is not set'
        }
        return jsonify(response), 400
    password = request.args.get('password')
    if password is None:
        response = {
            'message': 'Password is not set'
        }
        return jsonify(response), 400

    values = {
        'username': username,
        'password': password
    }
    result = find_user(values)
    if result:
        response = {
            'username': username
        }
        return jsonify(response), 200
