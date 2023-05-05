from flask import Flask
from flask_cors import CORS
from api.code_blueprint import code_blueprint

app = Flask(__name__)

# TODO add restrict polic
CORS(app)

app.register_blueprint(code_blueprint, url_prefix='/code')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
