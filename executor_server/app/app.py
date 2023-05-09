from flask import Flask
from api.code_blueprint import code_blueprint

app = Flask(__name__)


app.register_blueprint(code_blueprint, url_prefix='/code')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
