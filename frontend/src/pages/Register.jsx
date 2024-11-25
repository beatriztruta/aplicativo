import { useState } from "react";
import axios from "axios";

function Register() {
  const [perfil, setPerfil] = useState("produtor");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    escolaridade: "",
    endereco: "",
    sexo: "",
    cep: "",
    dataNascimento: "",
  });
  const [erro, setErro] = useState(""); // Para exibir mensagens de erro
  const [sucesso, setSucesso] = useState(""); // Para exibir mensagem de sucesso
  const [loading, setLoading] = useState(false); // Indicador de carregamento

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    // Validações básicas
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      setErro("Preencha todos os campos obrigatórios!");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setErro("As senhas não coincidem!");
      return;
    }

    setLoading(true); // Iniciar carregamento
    try {
      const response = await axios.post("http://127.0.0.1:5000/auth/register", {
        ...formData,
        perfil,
      });
      setSucesso("Cadastro realizado com sucesso!");
      console.log("Resposta do backend:", response.data);
      setFormData({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        telefone: "",
        escolaridade: "",
        endereco: "",
        sexo: "",
        cep: "",
        dataNascimento: "",
      });
    } catch (err) {
      setErro(err.response?.data?.erro || "Erro ao cadastrar.");
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center", padding: "20px" }}>
      <h1>Tela de Cadastro</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="nome"
          placeholder="Nome *"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha *"
          value={formData.senha}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmarSenha"
          placeholder="Confirme sua senha *"
          value={formData.confirmarSenha}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="escolaridade"
          placeholder="Escolaridade"
          value={formData.escolaridade}
          onChange={handleChange}
        />
        {perfil !== "julgador" && (
          <>
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={formData.cep}
              onChange={handleChange}
            />
            <input
              type="text"
              name="endereco"
              placeholder="Endereço"
              value={formData.endereco}
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="text"
          name="sexo"
          placeholder="Sexo"
          value={formData.sexo}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dataNascimento"
          placeholder="Data de Nascimento"
          value={formData.dataNascimento}
          onChange={handleChange}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <label>
            <input
              type="radio"
              value="produtor"
              checked={perfil === "produtor"}
              onChange={(e) => setPerfil(e.target.value)}
            />
            Produtor
          </label>
          <label>
            <input
              type="radio"
              value="analista"
              checked={perfil === "analista"}
              onChange={(e) => setPerfil(e.target.value)}
            />
            Analista
          </label>
          <label>
            <input
              type="radio"
              value="julgador"
              checked={perfil === "julgador"}
              onChange={(e) => setPerfil(e.target.value)}
            />
            Julgador
          </label>
        </div>
        <button type="submit" disabled={loading} style={{ padding: "10px", cursor: "pointer" }}>
          {loading ? "Carregando..." : "Cadastrar"}
        </button>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {sucesso && <p style={{ color: "green" }}>{sucesso}</p>}
      </form>
    </div>
  );
}

export default Register;
