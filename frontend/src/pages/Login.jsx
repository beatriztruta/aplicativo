import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("produtor"); // Perfil padrão
  const [erro, setErro] = useState(""); // Estado para exibir erros
  const [isLoading, setIsLoading] = useState(false); // Estado para o botão de carregamento

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação básica no frontend
    if (!email || !senha) {
      setErro("Todos os campos devem ser preenchidos.");
      return;
    }

    setErro(""); // Limpa mensagens de erro anteriores
    setIsLoading(true); // Inicia o estado de carregamento

    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/login", {
        email,
        senha,
        perfil,
      });
      const { token } = response.data;

      // Salve o token no localStorage ou sessionStorage
      localStorage.setItem("token", token);

      alert("Login bem-sucedido!");
      console.log("Token recebido:", token);

      // Redirecione o usuário para o dashboard (exemplo)
      window.location.href = "/dashboard";
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro no login.");
    } finally {
      setIsLoading(false); // Finaliza o estado de carregamento
    }
  };

  const handlePerfilChange = (perfilSelecionado) => {
    setPerfil(perfilSelecionado);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Tela de Login</h1>
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          aria-label="Senha"
        />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          {["produtor", "analista", "julgador"].map((perfilOption) => (
            <button
              type="button"
              key={perfilOption}
              onClick={() => handlePerfilChange(perfilOption)}
              style={{
                flex: 1,
                margin: "0 5px",
                padding: "10px",
                backgroundColor: perfil === perfilOption ? "#007bff" : "#e0e0e0",
                color: perfil === perfilOption ? "white" : "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {perfilOption.charAt(0).toUpperCase() + perfilOption.slice(1)}
            </button>
          ))}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isLoading ? "#6c757d" : "black",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        {erro && <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>}
      </form>
      <p style={{ marginTop: "20px" }}>
        <a href="/forgot-password" style={{ color: "blue", textDecoration: "none" }}>
          Esqueceu a senha?
        </a>
      </p>
      <p>
        <a href="/register" style={{ color: "blue", textDecoration: "none" }}>
          Criar Cadastro
        </a>
      </p>
    </div>
  );
}

export default Login;
