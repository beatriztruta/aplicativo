from app import create_app, db
from models import Usuario, Teste, Resposta  # Certifique-se de importar todos os modelos

app = create_app()

with app.app_context():
    print("Tabelas registradas no SQLAlchemy:")
    print(db.metadata.tables.keys())  # Mostra as tabelas registradas no SQLAlchemy
    db.create_all()  # Cria as tabelas no banco de dados
    print("Tabelas criadas com sucesso!")
