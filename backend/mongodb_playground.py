from pymongo import MongoClient
from datetime import datetime

# URL do MongoDB (utilizando a URL do MongoDB Atlas)
uri = "mongodb+srv://anatruta:IxiOU3e1r5bR74Si@aplicativo.u0qpc.mongodb.net/?retryWrites=true&w=majority&appName=aplicativo"

# Conectar ao MongoDB
client = MongoClient(uri)

# Banco de dados
db = client['projeto']  # Nome do banco de dados

# Coleções
usuarios_collection = db['usuarios']
testes_collection = db['testes']
respostas_collection = db['respostas']

# Exemplo de inserção de um novo usuário
def inserir_usuario():
    usuario = {
        "nome": "João Santos",
        "email": "joao.santos@gmail.com",
        "senha_hash": "senha123",
        "perfil": "produtor",
        "telefone": "83998887766",
        "escolaridade": "Ensino Superior",
        "endereco": "Rua A, 123",
        "sexo": "Masculino",
        "cep": "58000000",
        "data_nascimento": datetime(1990, 5, 25),
    }
    usuarios_collection.insert_one(usuario)
    print("Usuário João Santos inserido com sucesso!")

# Exemplo de inserção de um novo teste
def inserir_teste():
    teste = {
        "produto": "Produto A",
        "fabricante": "Fabricante X",
        "tipo_embalagem": "Plástico",
        "peso_produto": 1.5,
        "data_fabricacao": datetime(2023, 1, 10),
        "data_validade": datetime(2025, 1, 10),
        "data_teste": datetime(2024, 2, 15),
        "horario_teste": datetime(2024, 2, 15, 14, 30),
        "local_teste": "Laboratório A",
        "tipo_teste": "Escala Hedônica",
        "quantidade_avaliadores": 5,
        "atributos_avaliados": ["Aroma", "Sabor", "Textura"],
        "metodos_analise": ["ANOVA", "Teste de média"],
    }
    testes_collection.insert_one(teste)
    print("Teste inserido com sucesso!")

# Exemplo de consulta aos usuários
def listar_usuarios():
    usuarios = usuarios_collection.find({})
    for usuario in usuarios:
        print(f"Usuário: {usuario['nome']}, Email: {usuario['email']}")

# Exemplo de consulta aos testes
def listar_testes():
    testes = testes_collection.find({})
    for teste in testes:
        print(f"Teste: {teste['produto']}, Tipo de Teste: {teste['tipo_teste']}")

# Chame as funções para testar
if __name__ == "__main__":
    inserir_usuario()
    inserir_teste()
    listar_usuarios()
    listar_testes()
