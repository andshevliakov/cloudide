import os
from dotenv import load_dotenv

load_dotenv()

UI_URI = os.getenv('UI_URI')
EXECUTOR_PORT = os.getenv('EXECUTOR_PORT')

DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWD = os.getenv('DB_PASSWD')
DB_NAME = os.getenv('DB_NAME')
