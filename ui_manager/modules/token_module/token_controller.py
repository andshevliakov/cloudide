import jwt
import secrets
from flask import Request
from datetime import datetime, timedelta


SECRET_KEY = secrets.token_hex(15)


class TokenController:
    def __init__(self) -> None:
        pass

    @staticmethod
    async def generate_token(request: Request) -> tuple:
        response = {}
        username = request.args.get('username')
        name = request.args.get('name')
        if username is None:
            response = {
                'message': 'Username is not set'
            }
            return (response, 400)

        payload = {
            'username': username,
            'name': name,
            'exp': datetime.utcnow() + timedelta(minutes=20)
        }
        token = jwt.encode(
            payload=payload, key=SECRET_KEY, algorithm='HS256')
        response = {
            'token': token
        }
        return (response, 200)

    @staticmethod
    async def verify_token(request: Request) -> tuple:
        result = await TokenController.authorize_token(request=request)
        if 'message' not in result:
            response = {
                'message': 'Token is valid'
            }
            return (response, 200)
        else:
            return (result, 401)

    @staticmethod
    async def authorize_token(request: Request) -> dict:
        payload = {}
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers.get('Authorization')
            token = auth_header.split(' ')[1]
        if not token:
            payload = {
                'message': 'Authorization header is missing or invalid'
            }
            return payload
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=[
                'HS256'], verify=True)
        except jwt.exceptions.DecodeError:
            payload = {
                'message': 'Token is Invalid'
            }
            return payload
        except jwt.exceptions.ExpiredSignatureError:
            payload = {
                'message': 'Token expired'
            }
            return payload
        if 'exp' not in decoded:
            payload = {
                'message': 'Token doesn`t have expiration date'
            }
            return payload
        exp_date = datetime.fromtimestamp(decoded['exp'])
        if datetime.now() >= exp_date:
            payload = {
                'message': 'Token has expired'
            }
            return payload

        return decoded
