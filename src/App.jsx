import { useState } from "react";
import ProductForm from "./components/ProductForm";

function App() {
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = (produto) => {
    setProdutos([...produtos, produto]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-3xl font-bold text-center">Gestão de Produtos</h1>
      </header>

      
      <main className="flex flex-col items-center mt-10 mb-10 flex-grow">
        <ProductForm onSave={adicionarProduto} />

        <ul className="mt-2 w-96">
          {produtos.map((p, index) => (
            <li key={index} className="border p-2 mb-2 rounded shadow">
              <strong>ID:</strong> {p.id} <br />
              <strong>Nome:</strong> {p.nome} <br />
              <strong>Descrição:</strong> {p.descricao} <br />
              <strong>Estoque:</strong> {p.estoque} <br />
              <strong>Valor:</strong> R$ {p.valor} <br />
              <strong>Data de Entrada:</strong> {p.dataEntrada}
            </li>
          ))}
        </ul>
      </main>

      <footer className="bg-gray-800 text-white p-3"> 
        <p className="text-center text-sm">© {new Date().getFullYear()} Treko-Sistema de Gestão de Estoque. Todos os direitos reservados a Trupe do Borrego Johnson.</p>
      </footer>
      
    </div>
  );
}

export default App;