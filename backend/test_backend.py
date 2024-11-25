import requests

BASE_URL = "http://127.0.0.1:5000"

# Função auxiliar para exibir os resultados de forma legível
def print_response(endpoint, method, response):
    print(f"\n[TESTE {method.upper()}] Endpoint: {endpoint}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Resposta: {response.json()}")
    except Exception as e:
        print(f"Erro ao interpretar a resposta como JSON: {e}")
        print(f"Resposta bruta: {response.text}")


# Testar o cadastro de usuário (/auth/register)
def test_register_user():
    endpoint = "/auth/register"
    data = {
        "nome": "José",
        "email": "jose@jose.com",
        "senha": "senha123",
        "confirmarSenha": "senha123",
        "perfil": "produtor",
        "telefone": "83988997755",
        "escolaridade": "Ensino Médio",
        "endereco": "Rua A",
        "sexo": "Masculino",
        "cep": "58000000",
        "dataNascimento": "1980-07-06"
    }
    response = requests.post(BASE_URL + endpoint, json=data)
    print_response(endpoint, "POST", response)


# Testar login de usuário (/auth/login)
def test_login_user():
    endpoint = "/auth/login"
    data = {
        "email": "jose@jose.com",
        "senha": "senha123"
    }
    response = requests.post(BASE_URL + endpoint, json=data)
    print_response(endpoint, "POST", response)


# Testar o cadastro de um teste (/test/register)
def test_register_test():
    endpoint = "/test/register"
    data = {
        "produto": "Produto Teste",
        "data": "2024-11-23",
        "local": "Laboratório XYZ",
        "julgadores": "Maria, João",
        "resultados": "Aroma excelente, cor adequada"
    }
    response = requests.post(BASE_URL + endpoint, json=data)
    print_response(endpoint, "POST", response)


# Testar a exibição de um teste específico (/test/<id>)
def test_get_test():
    endpoint = "/test/1"  # Certifique-se de que há um teste com ID 1 no banco
    response = requests.get(BASE_URL + endpoint)
    print_response(endpoint, "GET", response)


# Testar a listagem de todos os testes (/test)
def test_get_all_tests():
    endpoint = "/test"
    response = requests.get(BASE_URL + endpoint)
    print_response(endpoint, "GET", response)


# Executar todos os testes
def run_all_tests():
    print("\nIniciando testes do backend...")
    test_register_user()
    test_login_user()
    test_register_test()
    test_get_test()
    test_get_all_tests()
    print("\nTestes finalizados!")


if __name__ == "__main__":
    run_all_tests()
