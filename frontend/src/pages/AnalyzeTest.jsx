import { useState } from "react";
import axios from "axios";

function AnalyzeTest() {
  const [testId, setTestId] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!testId) {
      setError("Por favor, insira o ID do teste.");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:5000/test/${testId}/analysis`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAnalysis(response.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Erro ao obter análise. Verifique o ID do teste e tente novamente.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Analisar Teste</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        name="testId"
        placeholder="ID do Teste *"
        value={testId}
        onChange={(e) => setTestId(e.target.value)}
        style={{
          display: "block",
          margin: "10px auto",
          width: "100%",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <button
        onClick={handleAnalyze}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Obter Análise
      </button>
      {analysis && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Resultados:</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Atributo</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Média</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>ANOVA (P-valor)</th>
              </tr>
            </thead>
            <tbody>
              {analysis.resultado_anova.map((res, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{res.atributo}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{res.media}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{res.p_valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnalyzeTest;
