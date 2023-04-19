import os
from flask import Flask, request, jsonify
from api.code_execution import code_execution
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv

load_dotenv()

UI_URI = os.getenv('UI_URI')
EXECUTOR_PORT = os.getenv('EXECUTOR_PORT')


app = Flask(__name__)
# TODO add restrict polic
CORS(app)

app.register_blueprint(code_execution)


if __name__ == '__main__':
    app.run(port=EXECUTOR_PORT, debug=True)
