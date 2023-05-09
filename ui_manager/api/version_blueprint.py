from flask import Blueprint
from api.v1.v1_blueprint import v1_blueprint

version_blueprint = Blueprint('version_blueprint', __name__)

version_blueprint.register_blueprint(v1_blueprint, url_prefix='/v1')
