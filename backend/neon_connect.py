import os
from psycopg2 import pool
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Obter a string de conexão do ambiente
connection_string = os.getenv('DATABASE_URL')

# Criar um pool de conexões
try:
    connection_pool = pool.SimpleConnectionPool(
        1,  # Número mínimo de conexões no pool
        10,  # Número máximo de conexões no pool
        connection_string
    )

    # Verificar se o pool foi criado com sucesso
    if connection_pool:
        print("Connection pool criado com sucesso")
    else:
        raise Exception("Falha ao criar o pool de conexões")
except Exception as e:
    print("Erro ao criar o pool de conexões:", e)
    raise

# Função para realizar operações no banco
def execute_query():
    conn = None
    cur = None
    try:
        # Obter uma conexão do pool
        conn = connection_pool.getconn()
        cur = conn.cursor()

        # Executar consultas de teste
        cur.execute('SELECT NOW();')
        current_time = cur.fetchone()[0]
        cur.execute('SELECT version();')
        version = cur.fetchone()[0]

        print('Hora atual:', current_time)
        print('Versão do PostgreSQL:', version)

    except Exception as e:
        print("Erro ao executar consulta:", e)
    finally:
        # Fechar cursor e retornar conexão ao pool
        if cur:
            cur.close()
        if conn:
            connection_pool.putconn(conn)

# Função para fechar todas as conexões do pool
def close_connection_pool():
    if connection_pool:
        connection_pool.closeall()
        print("Pool de conexões fechado com sucesso")

# Executar a consulta de teste
if __name__ == "__main__":
    try:
        execute_query()
    finally:
        # Garantir que o pool será fechado
        close_connection_pool()
