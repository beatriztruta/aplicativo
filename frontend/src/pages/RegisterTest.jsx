import { useState } from "react";
import axios from "axios";

const RegisterTest = () => {
  const [formData, setFormData] = useState({
    produto: "",
    fabricante: "",
    tipoEmbalagem: "",
    pesoProduto: "",
    dataFabricacao: "",
    dataValidade: "",
    dataTeste: "",
    horarioTeste: "",
    localTeste: "",
    tipoTeste: "",
    quantidadeAvaliadores: "",
    atributosAvaliados: [],
    metodosAnalise: [],
  });

  const atributosDisponiveis = [
    "Aroma",
    "Cor",
    "Textura",
    "Aparência",
    "Sabor",
    "Aparência Global",
  ];

  const metodosDisponiveis = [
    "Anova - Análise de variância",
    "Teste de média",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedArray = checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/test/create", formData);
      alert("Teste cadastrado com sucesso!");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar teste!");
    }
  };

  return (
    <div className="register-test-container">
      <h2>Cadastrar teste</h2>
      <form onSubmit={handleSubmit} className="register-test-form">
        <div className="form-group">
          <input
            type="text"
            name="produto"
            placeholder="Produto"
            value={formData.produto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="fabricante"
            placeholder="Fabricante"
            value={formData.fabricante}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tipoEmbalagem"
            placeholder="Tipo de embalagem"
            value={formData.tipoEmbalagem}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="pesoProduto"
            placeholder="Peso do produto"
            value={formData.pesoProduto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dataFabricacao"
            value={formData.dataFabricacao}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dataValidade"
            value={formData.dataValidade}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            name="dataTeste"
            value={formData.dataTeste}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="time"
            name="horarioTeste"
            value={formData.horarioTeste}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="localTeste"
            placeholder="Local do teste"
            value={formData.localTeste}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <select
            name="tipoTeste"
            value={formData.tipoTeste}
            onChange={handleChange}
          >
            <option value="">Selecione o tipo de teste</option>
            <option value="Escala Hedônica">Escala Hedônica</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="number"
            name="quantidadeAvaliadores"
            placeholder="Quantidade de avaliadores"
            value={formData.quantidadeAvaliadores}
            onChange={handleChange}
          />
        </div>
        <fieldset className="form-group">
          <legend>Atributos avaliados</legend>
          {atributosDisponiveis.map((atributo) => (
            <label key={atributo}>
              <input
                type="checkbox"
                value={atributo}
                checked={formData.atributosAvaliados.includes(atributo)}
                onChange={(e) => handleCheckboxChange(e, "atributosAvaliados")}
              />
              {atributo}
            </label>
          ))}
        </fieldset>
        <fieldset className="form-group">
          <legend>Métodos de análise</legend>
          {metodosDisponiveis.map((metodo) => (
            <label key={metodo}>
              <input
                type="checkbox"
                value={metodo}
                checked={formData.metodosAnalise.includes(metodo)}
                onChange={(e) => handleCheckboxChange(e, "metodosAnalise")}
              />
              {metodo}
            </label>
          ))}
        </fieldset>
        <button type="submit" className="submit-button">Confirmar teste</button>
      </form>
    </div>
  );
};

export default RegisterTest;
