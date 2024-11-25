from flask_sqlalchemy import SQLAlchemy

# Instância global de SQLAlchemy
db = SQLAlchemy()

def init_db(app):
    """
    Inicializa a extensão SQLAlchemy com o aplicativo Flask.
    """
    db.init_app(app)
