from pymongo import MongoClient
import os

# String de Conexão MongoDB Atlas
uri = os.getenv("MONGO_URI")  # Usando variáveis de ambiente para segurança

# Conectar ao MongoDB
client = MongoClient(uri)

# Banco de dados
db = client['projeto']  # Nome do banco de dados que você está usando no MongoDB Atlas

# Coleções
usuarios_collection = db['usuarios']  # Coleção de usuários
testes_collection = db['testes']  # Coleção de testes
respostas_collection = db['respostas']  # Coleção de respostas

# Função para verificar a conexão (opcional)
def check_connection():
    try:
        client.admin.command('ping')
        print("Conexão com o MongoDB bem-sucedida!")
    except Exception as e:
        print(f"Erro na conexão com o MongoDB: {e}")

# Verificar se a conexão foi bem-sucedida
check_connection()
