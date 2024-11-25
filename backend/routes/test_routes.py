from flask import Blueprint, request, jsonify
from database import db
from models import Teste, Resposta, Usuario
from flask_jwt_extended import jwt_required, get_jwt_identity

test_routes = Blueprint("test_routes", __name__)

# Criação de testes (somente para analistas)
@test_routes.route("/test/create", methods=["POST"])
@jwt_required()
def create_test():
    try:
        user_id = get_jwt_identity()
        usuario = Usuario.query.get(user_id)

        if usuario.perfil != "analista":
            return jsonify({"erro": "Apenas analistas podem criar testes"}), 403

        dados = request.json
        if not dados:
            return jsonify({"erro": "Dados não fornecidos"}), 400

        novo_teste = Teste(
            produto=dados.get("produto"),
            data=dados.get("data"),
            local=dados.get("local"),
            tipo_teste=dados.get("tipo_teste"),
            atributos=dados.get("atributos"),
        )

        db.session.add(novo_teste)
        db.session.commit()

        return jsonify({"mensagem": "Teste criado com sucesso!", "id": novo_teste.id}), 201

    except Exception as e:
        print(f"Erro ao criar teste: {e}")
        return jsonify({"erro": "Erro interno no servidor"}), 500


# Listar testes (baseado no perfil do usuário)
@test_routes.route("/test", methods=["GET"])
@jwt_required()
def list_tests():
    try:
        user_id = get_jwt_identity()
        usuario = Usuario.query.get(user_id)

        if usuario.perfil == "analista":
            testes = Teste.query.all()
        elif usuario.perfil == "produtor":
            # Aqui depende de como os testes são associados ao produto do produtor
            testes = Teste.query.filter_by(produto=usuario.nome).all()
        elif usuario.perfil == "julgador":
            # Obter apenas os testes respondidos pelo julgador
            testes = Teste.query.join(Resposta).filter(Resposta.usuario_id == usuario.id).all()
        else:
            return jsonify({"erro": "Perfil inválido"}), 403

        return jsonify([teste.to_dict() for teste in testes]), 200

    except Exception as e:
        print(f"Erro ao listar testes: {e}")
        return jsonify({"erro": "Erro interno no servidor"}), 500


# Enviar respostas (somente para julgadores)
@test_routes.route("/test/<int:test_id>/submit", methods=["POST"])
@jwt_required()
def submit_response(test_id):
    try:
        user_id = get_jwt_identity()
        usuario = Usuario.query.get(user_id)

        if usuario.perfil != "julgador":
            return jsonify({"erro": "Apenas julgadores podem enviar respostas"}), 403

        dados = request.json
        if not dados or "respostas" not in dados:
            return jsonify({"erro": "Respostas não fornecidas"}), 400

        respostas = dados["respostas"]

        for atributo, valor in respostas.items():
            nova_resposta = Resposta(
                teste_id=test_id, usuario_id=user_id, atributo=atributo, valor=valor
            )
            db.session.add(nova_resposta)

        db.session.commit()

        return jsonify({"mensagem": "Respostas enviadas com sucesso!"}), 201

    except Exception as e:
        print(f"Erro ao enviar respostas: {e}")
        return jsonify({"erro": "Erro interno no servidor"}), 500


# Realizar análise de teste (apenas analistas)
@test_routes.route("/test/<int:test_id>/analysis", methods=["GET"])
@jwt_required()
def analyze_test(test_id):
    try:
        user_id = get_jwt_identity()
        usuario = Usuario.query.get(user_id)

        if usuario.perfil != "analista":
            return jsonify({"erro": "Apenas analistas podem acessar a análise de testes"}), 403

        teste = Teste.query.get(test_id)
        if not teste:
            return jsonify({"erro": "Teste não encontrado"}), 404

        # Obter respostas
        respostas = Resposta.query.filter_by(teste_id=test_id).all()

        if not respostas:
            return jsonify({"erro": "Nenhuma resposta encontrada para este teste"}), 404

        # Processar análise fictícia (Exemplo)
        resultado_anova = {"Atributo": "Aroma", "P-valor": 0.03}
        resultado_media = {"Atributo": "Aroma", "Média": 7.5}

        return jsonify({
            "resultado_anova": resultado_anova,
            "resultado_media": resultado_media,
        }), 200

    except Exception as e:
        print(f"Erro ao analisar teste: {e}")
        return jsonify({"erro": "Erro interno no servidor"}), 500
