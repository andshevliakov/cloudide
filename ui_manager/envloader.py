import os
from dotenv import load_dotenv

load_dotenv()

MANAGER_PORT = os.getenv('MANAGER_PORT')

DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWD = os.getenv('DB_PASSWD')
DB_NAME = os.getenv('DB_NAME')
