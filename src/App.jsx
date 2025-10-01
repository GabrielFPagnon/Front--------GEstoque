import { useState } from "react";
import ProductForm from "./components/ProductForm";

function App() {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutos([...produtos, produto]);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <ProductForm onSave={adicionarProduto} />

      
      <ul className="mt-2 w-96">
        {produtos.map((p, index) => (
          <li key={index} className="border p-2 mb-2 rounded">
            <strong>ID:</strong> {p.id} <br />
            <strong>Nome:</strong> {p.nome} <br />
            <strong>Descrição:</strong> {p.descricao} <br />
            <strong>Estoque:</strong> {p.estoque} <br />
            <strong>Valor:</strong> R$ {p.valor} <br />
            <strong>Data de Entrada:</strong> {p.dataEntrada}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
