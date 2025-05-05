from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

db = SQLAlchemy(session_options={"autoflush": False})
jwt = JWTManager()
token_blacklist = set()