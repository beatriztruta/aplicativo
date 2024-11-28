from flask import Blueprint, request, jsonify
from models import Usuario
from werkzeug.security import generate_password_hash, check_password_hash

auth_routes = Blueprint("auth_routes", __name__)

@auth_routes.route("/auth/register", methods=["POST"])
def register():
    try:
        dados = request.json
        email = dados.get("email")
        senha = dados.get("senha")
        confirmar_senha = dados.get("confirmarSenha")

        if senha != confirmar_senha:
            return jsonify({"erro": "As senhas não coincidem"}), 400

        if Usuario.find_by_email(email):
            return jsonify({"erro": "E-mail já cadastrado"}), 400

        hashed_password = generate_password_hash(senha)
        dados['senha'] = hashed_password
        dados.pop("confirmarSenha", None)

        Usuario.create(dados)
        return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201
    except Exception as e:
        print("Erro ao registrar usuário:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500
