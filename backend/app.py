import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv  # Adicione esta importação
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes

# Importar os modelos explicitamente
from models import Usuario, Teste, Resposta

# Inicializa o banco de dados
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Carregar variáveis de ambiente do arquivo .env
    load_dotenv()  # Isso carrega as variáveis definidas no arquivo .env

    # Configuração do Banco de Dados
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")  # Pega a URI do .env
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Ativar logs do SQLAlchemy para depuração
    app.config["SQLALCHEMY_ECHO"] = True  # Mostra os comandos SQL no terminal

    # Inicializar Extensões
    db.init_app(app)

    # Criar tabelas automaticamente ao iniciar a aplicação
    with app.app_context():
        db.create_all()  # Garante que todas as tabelas definidas nos modelos sejam criadas

    # Registrar Blueprints
    app.register_blueprint(auth_routes)
    app.register_blueprint(test_routes)

    # Rota de Teste de Banco de Dados
    @app.route('/test_db')
    def test_db():
        try:
            with app.app_context():
                db.create_all()  # Recria as tabelas, se necessário
            return "Conexão bem-sucedida e tabelas criadas!"
        except Exception as e:
            return f"Erro ao conectar com o banco de dados: {e}"

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

    # Listar rotas registradas (para depuração)
    print("Rotas registradas:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint}")
