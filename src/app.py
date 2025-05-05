from flask import Flask
from extensions import db, jwt, token_blacklist

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"
app.config["JWT_SECRET_KEY"] = "super-secreta"

db.init_app(app)
jwt.init_app(app)

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload):
    jti = jwt_payload["jti"]
    return jti in token_blacklist

from routes.auth import auth_bp
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)