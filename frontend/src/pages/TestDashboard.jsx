
import { Bar, Pie, Line } from "react-chartjs-2"; // Bibliotecas de gráficos
import "chart.js/auto"; // Necessário para inicializar os gráficos

const TestDashboard = () => {
    // Dados para gráficos
    const barData = {
        labels: ["Aroma", "Sabor", "Textura", "Aparência"],
        datasets: [
            {
                label: "Pontuação Média",
                data: [8.5, 9.0, 7.5, 8.0], // Fake data
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
            },
        ],
    };

    const pieData = {
        labels: ["Satisfeitos", "Neutros", "Insatisfeitos"],
        datasets: [
            {
                label: "Satisfação dos Juízes",
                data: [70, 20, 10], // Percentual
                backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            },
        ],
    };

    const lineData = {
        labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"],
        datasets: [
            {
                label: "Pontuação Média ao Longo do Tempo",
                data: [7.5, 8.0, 8.5, 9.0], // Fake data
                fill: false,
                borderColor: "#4BC0C0",
                tension: 0.1,
            },
        ],
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>Resultados do Teste</h1>

            {/* Informações do teste */}
            <div style={{ marginBottom: "30px" }}>
                <h2>Detalhes do Teste</h2>
                <p><strong>Produto:</strong> Chocolate Bar</p>
                <p><strong>Data do Teste:</strong> 25 de Novembro de 2024</p>
                <p><strong>Local:</strong> Laboratório 1</p>
                <p><strong>Juízes:</strong> 10</p>
            </div>

            {/* Gráficos */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                {/* Gráfico de Barras */}
                <div>
                    <h3>Pontuação Média por Atributo</h3>
                    <Bar data={barData} />
                </div>

                {/* Gráfico de Pizza */}
                <div>
                    <h3>Satisfação dos Juízes</h3>
                    <Pie data={pieData} />
                </div>
            </div>

            {/* Gráfico de Linha */}
            <div>
                <h3>Pontuação ao Longo do Tempo</h3>
                <Line data={lineData} />
            </div>
        </div>
    );
};

export default TestDashboard;
