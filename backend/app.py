from flask import Flask
from database import db
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes

def create_app():
    app = Flask(__name__)

    # Configuração do Banco de Dados
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:senha@localhost/projeto"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # Inicializar Extensões
    db.init_app(app)

    # Registrar Blueprints
    app.register_blueprint(auth_routes)
    app.register_blueprint(test_routes)

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

    # Listar rotas registradas (para depuração)
    print("Rotas registradas:")
    for rule in app.url_map.iter_rules():
        print(f"{rule} -> {rule.endpoint}")
