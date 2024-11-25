from flask_sqlalchemy import SQLAlchemy

# Instância do SQLAlchemy
db = SQLAlchemy()

# Função para inicializar o banco de dados (opcional)
def init_db(app):
    """
    Inicializa a extensão SQLAlchemy com o aplicativo Flask.
    """
    db.init_app(app)
