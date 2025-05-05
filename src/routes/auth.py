from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from models.user import User
from extensions import db, token_blacklist

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if User.query.filter_by(username=data["username"]).first():
        return jsonify({"error": "Usuario ya existe"}), 400
    
    user = User(username=data["username"])
    user.set_password(data["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Usuario creado"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data["username"]).first()
    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Credenciales inválidas"}), 401
    
    access_token = create_access_token(identity=user.username)
    return jsonify({"token": access_token}), 200

@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Acceso concedido a: {current_user}"}), 200

@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    token_blacklist.add(jti)
    return jsonify({"message": "Sesión cerrada correctamente"}), 200