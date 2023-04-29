import sys
import mysql.connector
import logging
from flask import Blueprint, request, jsonify
from db_controller.db_controller import DBController
from envloader import DB_HOST, DB_PASSWD, DB_USER, DB_NAME

TABLE_NAME = 'users1'

user_blueprint = Blueprint('user_blueprint', __name__)

try:
    db_controller = DBController(
        host=DB_HOST,
        user=DB_USER,
        passwd=DB_PASSWD,
        db=DB_NAME,
        table=TABLE_NAME,
        columns={
            'id': 'INT PRIMARY KEY AUTO_INCREMENT',
            'name': 'VARCHAR(100) NOT NULL',
            'surname': 'VARCHAR(100) NOT NULL',
            'username': 'VARCHAR(100) NOT NULL UNIQUE',
            'password': 'VARCHAR(100) NOT NULL',
            'created_at': 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
        })
except mysql.connector.errors.DatabaseError as e:
    logging.error('Database error occured: %s', e)
    sys.exit(1)


@user_blueprint.route("/create", methods=['POST'])
async def add_user():
    response = {}
    data = request.get_json()
    result = db_controller.add_row_in_db(table=TABLE_NAME, values=data)
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
    result = db_controller.is_exist_in_db(TABLE_NAME, values)
    value, = result
    is_exist = True if value == 1 else False
    if is_exist:
        response = {
            'username': username
        }
        return jsonify(response), 200
    else:
        response = {
            'message': 'Invalid username or password'
        }
        return jsonify(response), 401
