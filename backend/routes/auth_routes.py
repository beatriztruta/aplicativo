from flask import Blueprint, request, jsonify
from database import db
from models import Usuario
from flask_bcrypt import Bcrypt

# Inicializa o Blueprint para rotas de autenticação
auth_routes = Blueprint("auth_routes", __name__)
bcrypt = Bcrypt()

@auth_routes.route("/auth/register", methods=["POST"])
def register():
    try:
        print("Dados recebidos:", request.json)  # Para depuração
        # Obtendo os dados do request
        dados = request.json
        if not dados:
            return jsonify({"erro": "Dados não fornecidos"}), 400

        nome = dados.get("nome")
        email = dados.get("email")
        senha = dados.get("senha")
        confirmar_senha = dados.get("confirmarSenha")
        perfil = dados.get("perfil")  # Deve ser "Produtor", "Analista" ou "Julgador"
        telefone = dados.get("telefone")
        escolaridade = dados.get("escolaridade")
        endereco = dados.get("endereco")
        sexo = dados.get("sexo")
        cep = dados.get("cep")
        data_nascimento = dados.get("dataNascimento")

        # Validar campos obrigatórios
        if not nome or not email or not senha or not perfil:
            return jsonify({"erro": "Campos obrigatórios não preenchidos"}), 400

        # Verificar se as senhas coincidem
        if senha != confirmar_senha:
            return jsonify({"erro": "As senhas não coincidem"}), 400

        # Verificar se o e-mail já existe no banco
        if Usuario.query.filter_by(email=email).first():
            return jsonify({"erro": "E-mail já cadastrado"}), 400

        # Criar um novo usuário
        novo_usuario = Usuario(
            nome=nome,
            email=email,
            senha_hash=bcrypt.generate_password_hash(senha).decode("utf-8"),
            perfil=perfil,
            telefone=telefone,
            escolaridade=escolaridade,
            endereco=endereco,
            sexo=sexo,
            cep=cep,
            data_nascimento=data_nascimento
        )

        # Adicionar e salvar no banco de dados
        db.session.add(novo_usuario)
        db.session.commit()

        return jsonify({"mensagem": "Usuário cadastrado com sucesso!"}), 201

    except Exception as e:
        print(f"Erro capturado no servidor: {e}")  # Mostra o erro exato
        return jsonify({"erro": "Erro interno no servidor"}), 500
