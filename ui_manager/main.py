import os
from flask import Flask
from api.code_execution import code_execution
from api.token_blueprint import token_blueprint
from api.user_blueprint import user_blueprint
from flask_cors import CORS
from envloader import MANAGER_PORT
from db_controller.db_controller import db
from envloader import DB_USER, DB_PASSWD, DB_HOST, DB_NAME

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWD}@{DB_HOST}/{DB_NAME}"
db.init_app(app=app)

with app.app_context():
    db.create_all()

# TODO add restrict polic
CORS(app)

app.register_blueprint(code_execution)
app.register_blueprint(token_blueprint, url_prefix='/token')
app.register_blueprint(user_blueprint, url_prefix='/user')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=MANAGER_PORT, debug=True)
