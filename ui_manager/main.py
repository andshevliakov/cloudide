from flask import Flask
from flask_cors import CORS
from envloader import MANAGER_PORT
from api.api_blueprint import api_blueprint
from db_controller.db_controller import db
from envloader import DB_USER, DB_PASSWD, DB_HOST, DB_NAME

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWD}@{DB_HOST}/{DB_NAME}"
db.init_app(app=app)

with app.app_context():
    db.create_all()

# TODO add restrict polic
CORS(app)

app.register_blueprint(api_blueprint, url_prefix='/api')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=MANAGER_PORT, debug=True)
