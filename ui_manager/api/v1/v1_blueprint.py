from flask import Blueprint
from api.v1.code_blueprint import code_blueprint
from api.v1.user_blueprint import user_blueprint
from api.v1.token_blueprint import token_blueprint
from api.v1.package_blueprint import package_blueprint

v1_blueprint = Blueprint('v1_blueprint', __name__)

v1_blueprint.register_blueprint(code_blueprint, url_prefix='/code')
v1_blueprint.register_blueprint(user_blueprint, url_prefix='/user')
v1_blueprint.register_blueprint(token_blueprint, url_prefix='/token')
v1_blueprint.register_blueprint(package_blueprint, url_prefix='/package')
