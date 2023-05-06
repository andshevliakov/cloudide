from flask import Blueprint
from api.token_blueprint import token_blueprint
from api.user_blueprint import user_blueprint

api_blueprint = Blueprint('api_blueprint', __name__)

api_blueprint.register_blueprint(token_blueprint, url_prefix='/token')
api_blueprint.register_blueprint(user_blueprint, url_prefix='/user')
