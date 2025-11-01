import { useState } from "react";

function classificarIMC(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Peso normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade grau I";
  if (imc < 40) return "Obesidade grau II";
  return "Obesidade grau III";
}

export default function App() {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  function parseNumber(value) {
    return Number(String(value).replace(",", "."));
  }

  function calcular(e) {
    e.preventDefault();
    setErro("");
    setResultado(null);

    const h = parseNumber(altura);
    const p = parseNumber(peso);

    if (!h || !p || h <= 0 || p <= 0) {
      setErro("Informe altura (m) e peso (kg) válidos.");
      return;
    }

    const imc = p / (h * h);
    setResultado({ imc: Math.round(imc * 100) / 100, classificacao: classificarIMC(imc) });
  }

  function limpar() {
    setAltura("");
    setPeso("");
    setResultado(null);
    setErro("");
  }

  // Adicionamos classNames para conectar ao CSS
  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <form onSubmit={calcular}>
        <div className="form-group">
          <label>Altura (m)</label>
          <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Peso (kg)</label>
          <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} />
        </div>

        <div className="button-group">
          <button type="submit">Calcular</button>
          <button type="button" onClick={limpar}>Limpar</button>
        </div>
      </form>

      {erro && <p className="error-message">{erro}</p>}
      
      {resultado && (
        <div className="result-container">
          <p>IMC: {resultado.imc}</p>
          <p>Classificação: {resultado.classificacao}</p>
        </div>
      )}
    </div>
  );
}