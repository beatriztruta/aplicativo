from app import create_app  # Importa a função create_app do app.py
from database import db  # Importa a instância do banco de dados
from models import Usuario, Teste, Resposta  # Importa os modelos

# Cria a aplicação Flask
app = create_app()

# Garante que a aplicação e o banco estão vinculados
with app.app_context():
    try:
        # Cria todas as tabelas
        db.create_all()
        print("Tabelas criadas com sucesso!")
    except Exception as e:
        print(f"Erro ao criar tabelas: {e}")
