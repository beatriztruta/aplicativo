from database import db
from flask_bcrypt import generate_password_hash, check_password_hash

# Modelo para os Usuários
class Usuario(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha_hash = db.Column(db.String(200), nullable=False)
    perfil = db.Column(db.String(20), nullable=False)  # Produtor, Analista, Julgador
    telefone = db.Column(db.String(20))
    escolaridade = db.Column(db.String(100))
    endereco = db.Column(db.String(200))
    sexo = db.Column(db.String(10))
    cep = db.Column(db.String(20))
    data_nascimento = db.Column(db.Date)

    def set_password(self, senha):
        self.senha_hash = generate_password_hash(senha).decode("utf-8")

    def check_password(self, senha):
        return check_password_hash(self.senha_hash, senha)


# Modelo para os Testes
class Teste(db.Model):
    __tablename__ = "testes"

    id = db.Column(db.Integer, primary_key=True)
    produto = db.Column(db.String(150), nullable=False)
    fabricante = db.Column(db.String(150))
    tipo_embalagem = db.Column(db.String(100))
    peso_produto = db.Column(db.Float)
    data_fabricacao = db.Column(db.Date)
    data_validade = db.Column(db.Date)
    data_teste = db.Column(db.Date)
    horario_teste = db.Column(db.Time)
    local_teste = db.Column(db.String(200))
    tipo_teste = db.Column(db.String(50), nullable=False)  # Ex: Escala Hedônica
    quantidade_avaliadores = db.Column(db.Integer)
    atributos_avaliados = db.Column(db.JSON, nullable=False)  # Ex: ["Aroma", "Cor"]
    metodos_analise = db.Column(db.JSON, nullable=False)  # Ex: ["ANOVA", "Teste de média"]
    respostas = db.relationship("Resposta", backref="teste", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "produto": self.produto,
            "fabricante": self.fabricante,
            "tipo_embalagem": self.tipo_embalagem,
            "peso_produto": self.peso_produto,
            "data_fabricacao": str(self.data_fabricacao),
            "data_validade": str(self.data_validade),
            "data_teste": str(self.data_teste),
            "horario_teste": str(self.horario_teste),
            "local_teste": self.local_teste,
            "tipo_teste": self.tipo_teste,
            "quantidade_avaliadores": self.quantidade_avaliadores,
            "atributos_avaliados": self.atributos_avaliados,
            "metodos_analise": self.metodos_analise,
        }


# Modelo para as Respostas
class Resposta(db.Model):
    __tablename__ = "respostas"

    id = db.Column(db.Integer, primary_key=True)
    teste_id = db.Column(db.Integer, db.ForeignKey("testes.id"), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)
    atributo = db.Column(db.String(50), nullable=False)
    valor = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "teste_id": self.teste_id,
            "usuario_id": self.usuario_id,
            "atributo": self.atributo,
            "valor": self.valor,
        }
