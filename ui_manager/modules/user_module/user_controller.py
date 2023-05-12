from flask import Request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from modules.k8s_module.k8s_controller import K8SController
from kubernetes.client import ApiException

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    def __init__(self, data: dict):
        self.name = data.get('name')
        self.surname = data.get('surname')
        self.username = data.get('username')
        self.password = data.get('password')


class UserController:

    @staticmethod
    async def verify_user(request: Request) -> tuple:
        response = {}
        username = request.args.get('username')
        if username is None:
            response = {
                'message': 'Username is not set'
            }
            return (response, 400)
        password = request.args.get('password')
        if password is None:
            response = {
                'message': 'Password is not set'
            }
            return (response, 400)

        values = {
            'username': username,
            'password': password
        }
        user = User(values)
        result = db.session.query(User).filter_by(username=user.username,
                                                  password=user.password).first()
        if result is not None:
            response = {
                'username': username
            }
            return (response, 200)
        else:
            response = {
                'message': 'No such user'
            }
            return (response, 404)

    @staticmethod
    async def create_user(request: Request) -> tuple:
        response = {}
        data = request.get_json()
        user = User(data)
        try:
            db.session.add(user)
            db.session.commit()
            k8sController = K8SController()
            k8sController.create_user(
                name=user.name, username=user.username)
        except IntegrityError as error:
            db.session.rollback()
            response = {
                'message': 'User exists',
                'details': str(error),
            }
            return (response, 409)
        except SQLAlchemyError as error:
            db.session.rollback()
            response = {
                'message': 'Unknown database error',
                'details': str(error),
            }
            return (response, 500)
        except ApiException as error:
            db.session.delete(user)
            db.session.commit()
            response = {
                'message': 'Internal Kubernetes error',
                'details': str(error),
            }
            return (response, 500)
        response = {
            'message': 'User registered'
        }
        return (response, 201)
