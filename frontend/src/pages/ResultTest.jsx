import { useState, useEffect } from "react";
import axios from "axios";

function ResultTest() {
  const [testData, setTestData] = useState({
    produto: "",
    data: "",
    local: "",
    julgadores: "",
    resultados: "",
  });

  useEffect(() => {
    // Substituir pelo ID real do teste que você deseja buscar
    const testId = "1";

    axios
      .get(`http://127.0.0.1:5000/test/${testId}`)
      .then((response) => {
        setTestData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados do teste:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teste</h2>
      <form>
        <label>Produto</label>
        <input
          type="text"
          value={testData.produto}
          readOnly
          placeholder="Aqui apresenta o produto"
        />
        <label>Data</label>
        <input
          type="text"
          value={testData.data}
          readOnly
          placeholder="Aqui apresenta a data do teste"
        />
        <label>Local</label>
        <input
          type="text"
          value={testData.local}
          readOnly
          placeholder="Aqui apresenta o local onde o teste foi realizado"
        />
        <label>Julgadores</label>
        <input
          type="text"
          value={testData.julgadores}
          readOnly
          placeholder="Aqui apresenta quem foram os julgadores"
        />
        <label>Resultados</label>
        <textarea
          value={testData.resultados}
          readOnly
          placeholder="Aqui apresenta os resultados obtidos no teste"
        />
      </form>
    </div>
  );
}

export default ResultTest;
