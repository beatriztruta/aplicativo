from app import create_app, db
from models import Usuario, Teste, Resposta
from datetime import date, time

app = create_app()

def populate_database():
    with app.app_context():
        # Garante que todas as tabelas sejam criadas
        print("Criando tabelas...")
        db.drop_all()  # Remove as tabelas existentes
        db.create_all()  # Cria as tabelas com base nos modelos

        # Criar usuários fake com credenciais de login
        usuario1 = Usuario(
            nome="João da Silva",
            email="joao@gmail.com",
            perfil="Analista",
            telefone="123456789",
            escolaridade="Ensino Médio",
            endereco="Rua A, 123",
            sexo="Masculino",
            cep="12345-678"
        )
        usuario1.set_password("senha123")  # Define a senha para o login

        usuario2 = Usuario(
            nome="Maria Oliveira",
            email="maria@gmail.com",
            perfil="Produtor",
            telefone="987654321",
            escolaridade="Ensino Superior",
            endereco="Rua B, 456",
            sexo="Feminino",
            cep="87654-321"
        )
        usuario2.set_password("senha456")  # Define a senha para o login

        # Criar testes fake
        teste1 = Teste(
            produto="Chocolate",
            fabricante="Nestlé",
            tipo_embalagem="Barra",
            peso_produto=100.0,
            data_fabricacao=date(2023, 1, 1),
            data_validade=date(2024, 1, 1),
            data_teste=date(2024, 11, 25),
            horario_teste=time(14, 0, 0),
            local_teste="Laboratório 1",
            tipo_teste="Escala Hedônica",
            quantidade_avaliadores=10,
            atributos_avaliados=["Aroma", "Sabor", "Textura"],
            metodos_analise=["ANOVA", "Teste de Médias"]
        )

        teste2 = Teste(
            produto="Biscoito",
            fabricante="Bauducco",
            tipo_embalagem="Caixa",
            peso_produto=200.0,
            data_fabricacao=date(2023, 6, 1),
            data_validade=date(2024, 6, 1),
            data_teste=date(2024, 11, 30),
            horario_teste=time(10, 0, 0),
            local_teste="Laboratório 2",
            tipo_teste="Escala de Preferência",
            quantidade_avaliadores=15,
            atributos_avaliados=["Cor", "Sabor", "Crocância"],
            metodos_analise=["Regressão Linear"]
        )

        # Criar respostas de testes fake
        resposta1 = Resposta(
            teste_id=1,
            usuario_id=1,
            atributo="Aroma",
            valor=8.5
        )

        resposta2 = Resposta(
            teste_id=1,
            usuario_id=1,
            atributo="Sabor",
            valor=9.0
        )

        resposta3 = Resposta(
            teste_id=2,
            usuario_id=2,
            atributo="Crocância",
            valor=7.5
        )

        # Adicionar dados ao banco
        print("Populando o banco de dados...")
        db.session.add_all([usuario1, usuario2, teste1, teste2, resposta1, resposta2, resposta3])
        db.session.commit()

        print("Banco de dados populado com sucesso!")

# Executar a função
if __name__ == "__main__":
    populate_database()
