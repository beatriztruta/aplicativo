from pymongo import MongoClient
from datetime import datetime

# URL do MongoDB (utilizando a URL do MongoDB Atlas)
uri = "mongodb+srv://anatruta:senha@aplicativo.xiklh.mongodb.net/teste?retryWrites=true&w=majority"

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

# Exemplo de inserção de respostas aos testes
def inserir_respostas():
    respostas = [
        { "teste_id": 1, "usuario_id": 1, "atributo": "Aroma", "valor": 7.5 },
        { "teste_id": 1, "usuario_id": 1, "atributo": "Sabor", "valor": 8.0 },
        { "teste_id": 1, "usuario_id": 1, "atributo": "Textura", "valor": 6.5 },
        { "teste_id": 1, "usuario_id": 2, "atributo": "Aroma", "valor": 6.0 },
        { "teste_id": 1, "usuario_id": 2, "atributo": "Sabor", "valor": 7.5 },
        { "teste_id": 1, "usuario_id": 2, "atributo": "Textura", "valor": 6.0 }
    ]
    respostas_collection.insert_many(respostas)
    print("Respostas inseridas com sucesso!")

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

# Função para calcular a média das respostas por atributo
def calcular_media_respostas():
    atributos = ["Aroma", "Sabor", "Textura"]  # Atributos que queremos calcular a média
    for atributo in atributos:
        respostas = respostas_collection.find({"atributo": atributo})
        soma = 0
        count = 0
        for resposta in respostas:
            soma += resposta["valor"]
            count += 1
        media = soma / count if count > 0 else 0
        print(f"Média de {atributo}: {media:.2f}")

# Função para realizar a análise simples (simulação de ANOVA)
def realizar_analise():
    # Vamos considerar que os dados estão divididos por atributo (exemplo)
    atributos = ["Aroma", "Sabor", "Textura"]
    for atributo in atributos:
        respostas = respostas_collection.find({"atributo": atributo})
        valores = [resposta["valor"] for resposta in respostas]
        if len(valores) > 0:
            media = sum(valores) / len(valores)
            variacao = sum((x - media) ** 2 for x in valores) / len(valores)  # Simples variância
            print(f"Análise para {atributo}: Média = {media:.2f}, Variância = {variacao:.2f}")
        else:
            print(f"Análise para {atributo}: Não há dados suficientes para análise.")

# Chame as funções para testar
if __name__ == "__main__":
    
    # Inserir usuários e testes
    inserir_usuario()
    inserir_teste()
    inserir_respostas()

    # Listar usuários e testes
    listar_usuarios()
    listar_testes()

    # Calcular a média das respostas
    calcular_media_respostas()

    # Realizar a análise
    realizar_analise()
