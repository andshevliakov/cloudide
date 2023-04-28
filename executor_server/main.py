import os
from flask import Flask
from api.code_execution import code_execution
from api.token_blueprint import token_blueprint
from api.user_blueprint import user_blueprint
from flask_cors import CORS
from envloader import EXECUTOR_PORT

app = Flask(__name__)
# TODO add restrict polic
CORS(app)

app.register_blueprint(code_execution)
app.register_blueprint(token_blueprint, url_prefix='/token')
app.register_blueprint(user_blueprint, url_prefix='/user')


if __name__ == '__main__':
    app.run(port=EXECUTOR_PORT, debug=True)
