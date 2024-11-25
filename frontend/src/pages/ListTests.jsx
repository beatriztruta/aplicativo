import { useEffect, useState } from "react";
import axios from "axios";

function ListTests() {
  const [tests, setTests] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado. Faça login para visualizar os testes.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:5000/test", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTests(response.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar os testes. Por favor, tente novamente.");
      }
    };

    fetchTests();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <h2>Listagem de Testes</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tests.map((test) => (
            <li
              key={test.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                margin: "10px 0",
                padding: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>{test.nome}</strong>
              <p>{test.descricao}</p>
              <p>Produto: {test.produto}</p>
              <p>Data: {test.data}</p>
              <p>Tipo: {test.tipo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListTests;
