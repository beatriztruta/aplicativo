import { useState } from "react";
import axios from "axios";

function CreateTest() {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    produto: "",
    quantidade_avaliadores: 1, // Valor inicial padrão
  });

  const [erro, setErro] = useState(""); // Estado para erros

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!formData.nome || !formData.tipo || !formData.produto || !formData.quantidade_avaliadores) {
      setErro("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:5000/test/create", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Teste criado com sucesso!");
      setErro(""); // Limpa mensagens de erro em caso de sucesso
    } catch (err) {
      console.error(err);
      setErro("Erro ao criar teste. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Teste</h2>
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        <input
          name="nome"
          placeholder="Nome do teste *"
          value={formData.nome}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <textarea
          name="descricao"
          placeholder="Descrição (opcional)"
          value={formData.descricao}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", width: "100%", height: "80px" }}
        />
        <input
          name="tipo"
          placeholder="Tipo *"
          value={formData.tipo}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <input
          name="produto"
          placeholder="Produto *"
          value={formData.produto}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <input
          name="quantidade_avaliadores"
          type="number"
          min="1"
          placeholder="Quantidade de avaliadores *"
          value={formData.quantidade_avaliadores}
          onChange={handleChange}
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            margin: "10px 0",
          }}
        >
          Criar Teste
        </button>
      </form>
    </div>
  );
}

export default CreateTest;
