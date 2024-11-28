from flask import Flask
from routes.auth_routes import auth_routes
from routes.test_routes import test_routes
from database import db

app = Flask(__name__)

# Registrar Blueprints
app.register_blueprint(auth_routes)
app.register_blueprint(test_routes)

if __name__ == "__main__":
    app.run(debug=True)
