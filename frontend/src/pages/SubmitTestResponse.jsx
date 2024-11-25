import { useState } from "react";
import axios from "axios";

function SubmitTestResponse() {
  const [testId, setTestId] = useState("");
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(""); // Para exibir mensagens de erro
  const [success, setSuccess] = useState(""); // Para exibir mensagens de sucesso

  const handleResponseChange = (atributo, valor) => {
    setResponses((prev) => ({
      ...prev,
      [atributo]: valor,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!testId || Object.keys(responses).length === 0) {
      setError("Por favor, preencha o ID do teste e as respostas.");
      return;
    }

    try {
      await axios.post(
        `http://127.0.0.1:5000/test/${testId}/submit`,
        { respostas: responses },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess("Respostas enviadas com sucesso!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar resposta. Por favor, tente novamente.");
      setSuccess("");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <h2>Responder Teste</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <input
          name="testId"
          placeholder="ID do Teste *"
          value={testId}
          onChange={(e) => setTestId(e.target.value)}
          style={{ display: "block", margin: "10px auto", width: "100%" }}
        />
        <div>
          <p>Preencha as respostas para os atributos avaliados:</p>
          {["Aroma", "Sabor", "Textura", "Aparência"].map((atributo) => (
            <div key={atributo} style={{ marginBottom: "10px" }}>
              <label>{atributo}:</label>
              <input
                type="number"
                placeholder={`Nota para ${atributo}`}
                onChange={(e) => handleResponseChange(atributo, e.target.value)}
                style={{ marginLeft: "10px", width: "60px" }}
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Enviar Resposta
        </button>
      </form>
    </div>
  );
}

export default SubmitTestResponse;
