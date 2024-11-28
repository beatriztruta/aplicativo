from flask import Blueprint, request, jsonify
from models import Teste, Resposta

test_routes = Blueprint("test_routes", __name__)

@test_routes.route("/test/create", methods=["POST"])
def create_test():
    try:
        data = request.json
        Teste.create(data)
        return jsonify({"mensagem": "Teste criado com sucesso!"}), 201
    except Exception as e:
        print("Erro ao criar teste:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500

@test_routes.route("/test", methods=["GET"])
def list_tests():
    try:
        testes = Teste.find_all()
        return jsonify(testes), 200
    except Exception as e:
        print("Erro ao listar testes:", e)
        return jsonify({"erro": "Erro interno no servidor"}), 500

@test_routes.route("/test/<teste_id>/submit", methods=["POST"])
def submit_response(teste_id):
    try:
        respostas = request.json.get("respostas", [])
        for resposta in respostas:
            Resposta.create({
                "teste_id": teste_id,
                "usuario_id": resposta.get("usuario_id"),
                "atributo": resposta.get("atributo"),
                "valor": resposta.get("valor")
            })
        return jsonify({"mensagem": "Respostas enviadas com sucesso!"}), 201
    except Exception as e:
        print("Erro ao enviar respostas:", e)
        return jsonify({"erro": "Erro ao enviar respostas"}), 500
