import os
from psycopg2 import pool
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Obter a string de conexão do ambiente
connection_string = os.getenv('DATABASE_URL')

# Criar um pool de conexões
connection_pool = pool.SimpleConnectionPool(
    1,  # Número mínimo de conexões no pool
    10,  # Número máximo de conexões no pool
    connection_string
)

# Verificar se o pool foi criado com sucesso
if connection_pool:
    print("Connection pool criado com sucesso")

# Obter uma conexão do pool
conn = connection_pool.getconn()

# Criar um cursor e executar consultas
try:
    cur = conn.cursor()
    cur.execute('SELECT NOW();')
    current_time = cur.fetchone()[0]
    cur.execute('SELECT version();')
    version = cur.fetchone()[0]

    print('Hora atual:', current_time)
    print('Versão do PostgreSQL:', version)
finally:
    cur.close()
    connection_pool.putconn(conn)  # Retornar a conexão ao pool

# Fechar todas as conexões no pool
connection_pool.closeall()
