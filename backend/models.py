from database import usuarios_collection, testes_collection, respostas_collection
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

# Modelo para os Usuários
class Usuario:
    @staticmethod
    def create(data):
        # Criação de um novo usuário no MongoDB
        data['senha_hash'] = generate_password_hash(data['senha']).decode("utf-8")
        usuarios_collection.insert_one(data)

    @staticmethod
    def find_by_email(email):
        return usuarios_collection.find_one({"email": email})

    @staticmethod
    def find_by_id(user_id):
        return usuarios_collection.find_one({"_id": user_id})

    @staticmethod
    def check_password(user, senha):
        return check_password_hash(user['senha_hash'], senha)

# Modelo para os Testes
class Teste:
    @staticmethod
    def create(data):
        # Criação de um novo teste no MongoDB
        data['data_fabricacao'] = datetime.strptime(data['data_fabricacao'], "%Y-%m-%d")
        data['data_validade'] = datetime.strptime(data['data_validade'], "%Y-%m-%d")
        data['data_teste'] = datetime.strptime(data['data_teste'], "%Y-%m-%d")
        # Atribuindo valores padrão ou manipulando tipos para os atributos
        testes_collection.insert_one(data)

    @staticmethod
    def find_all():
        return list(testes_collection.find())

    @staticmethod
    def find_by_id(teste_id):
        return testes_collection.find_one({"_id": teste_id})

# Modelo para as Respostas
class Resposta:
    @staticmethod
    def create(data):
        # Criação de uma nova resposta no MongoDB
        respostas_collection.insert_one(data)

    @staticmethod
    def find_by_teste_id(teste_id):
        return list(respostas_collection.find({"teste_id": teste_id}))
