import sys
import mysql.connector
import logging
from flask import Blueprint, request, jsonify
from envloader import DB_HOST, DB_PASSWD, DB_USER, DB_NAME
from db_controller.db_controller import create_user, find_user

user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/create", methods=['POST'])
async def add_user():
    response = {}
    data = request.get_json()
    create_user(data)
    response = "User created"
    return jsonify(response), 200


@user_blueprint.route('/verify', methods=['GET'])
async def verify_user():
    response = {}
    username = request.args.get('username')
    if username is None:
        response = {
            'Username is not set'
        }
        return jsonify(response), 400
    password = request.args.get('password')
    if password is None:
        response = {
            'Password is not set'
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
