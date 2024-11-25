import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/forgot-password", {
        email,
      });
      setMessage(response.data.mensagem || "Instruções enviadas para o seu e-mail.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.erro || "Erro ao solicitar redefinição de senha.");
      setMessage("");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Esqueceu a Senha?</h1>
      <p style={styles.description}>
        Insira o seu e-mail para receber as instruções de recuperação de senha.
      </p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Enviar
        </button>
      </form>
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "10px",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  success: {
    color: "green",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default ForgotPassword;
