import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [perfil, setPerfil] = useState("");

  useEffect(() => {
    // Recuperar o perfil do localStorage ou do token
    const storedPerfil = localStorage.getItem("perfil") || "produtor"; // Exemplo
    setPerfil(storedPerfil);
  }, []);

  // Componentes reutilizáveis para listas de links
  const AnalistaLinks = () => (
    <>
      <li style={styles.linkItem}>
        <Link to="/create-test">Criar Teste</Link>
      </li>
      <li style={styles.linkItem}>
        <Link to="/list-tests">Listar Testes</Link>
      </li>
      <li style={styles.linkItem}>
        <Link to="/analyze-test">Analisar Testes</Link>
      </li>
    </>
  );

  const ProdutorLinks = () => (
    <li style={styles.linkItem}>
      <Link to="/list-tests">Ver Testes do Produto</Link>
    </li>
  );

  const JulgadorLinks = () => (
    <li style={styles.linkItem}>
      <Link to="/submit-response">Enviar Respostas</Link>
    </li>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Bem-vindo ao Dashboard</h1>
      <p style={styles.description}>Perfil: {perfil}</p>
      <nav>
        <ul style={styles.linkList}>
          {/* Links comuns para todos os perfis */}
          <li style={styles.linkItem}>
            <Link to="/register">Cadastrar Usuário</Link>
          </li>

          {/* Links específicos por perfil */}
          {perfil === "analista" && <AnalistaLinks />}
          {perfil === "produtor" && <ProdutorLinks />}
          {perfil === "julgador" && <JulgadorLinks />}

          {/* Mensagem para perfil desconhecido */}
          {!["analista", "produtor", "julgador"].includes(perfil) && (
            <p style={styles.error}>Perfil desconhecido. Por favor, faça login novamente.</p>
          )}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2rem",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  linkList: {
    listStyleType: "none",
    padding: 0,
  },
  linkItem: {
    marginBottom: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Dashboard;
