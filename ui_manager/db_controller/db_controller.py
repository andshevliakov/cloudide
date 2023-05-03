from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    surname = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(
        db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)

    def __init__(self, data):
        self.name = data.get('name')
        self.surname = data.get('surname')
        self.username = data.get('username')
        self.password = data.get('password')


def create_user(user_json: dict) -> None:
    user = User(user_json)
    db.session.add(user)
    db.session.commit()


def find_user(user_json: dict) -> None:
    user = User(user_json)
    return db.session.query(User).filter_by(username=user.username, password=user.password).first_or_404()
