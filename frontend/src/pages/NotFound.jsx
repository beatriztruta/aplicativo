import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404</h1>
      <p style={styles.text}>Página não encontrada.</p>
      <Link to="/" style={styles.button}>
        Voltar para a página inicial
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: "5rem",
    color: "#ff4757",
    margin: "0",
  },
  text: {
    fontSize: "1.5rem",
    color: "#555",
    margin: "10px 0",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default NotFound;
