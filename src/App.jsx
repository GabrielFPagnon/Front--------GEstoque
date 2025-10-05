import React, { useState } from 'react';

function ProductForm({ onSave }) {
    const [form, setForm] = useState({
        nome: "",
        codigo: "",
        quantidade: 0,
        preco: 0,
        categoria: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newProduct = {
            ...form,
            id: Math.random().toString(36).substring(2, 9).toUpperCase(),
            valor: parseFloat(form.preco), 
            estoque: parseInt(form.quantidade), 
            descricao: form.nome + " / " + form.categoria,
            dataEntrada: new Date().toLocaleDateString('pt-BR'),
        }
        
        onSave(newProduct);
        setForm({ nome: "", codigo: "", quantidade: 0, preco: 0, categoria: "" });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="p-6 bg-white shadow-lg rounded-xl w-full max-w-md mx-auto space-y-4 border border-gray-100"
        >
            <h2 className="text-2xl font-semibold text-center text-gray-700">Adicionar Novo Produto</h2>

            {/* Nome */}
            <div className="space-y-1">
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                <input
                    id="nome"
                    name="nome"
                    type="text"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            
            {/* Código */}
            <div className="space-y-1">
                <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
                <input
                    id="codigo"
                    name="codigo"
                    type="text"
                    value={form.codigo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Quantidade e Preço em uma linha */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Estoque</label>
                    <input
                        id="quantidade"
                        name="quantidade"
                        type="number"
                        value={form.quantidade}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="space-y-1">
                    <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                    <input
                        id="preco"
                        name="preco"
                        type="number"
                        value={form.preco}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            {/* Categoria */}
            <div className="space-y-1">
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                <select
                    id="categoria"
                    name="categoria"
                    value={form.categoria}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                    <option value="">Selecione...</option>
                    <option value="Eletronicos">Eletrônicos</option>
                    <option value="Vestuario">Vestuário</option>
                    <option value="Alimentos">Alimentos</option>
                    <option value="Limpeza">Limpeza</option>
                </select>
            </div>

            <button 
                type="submit" 
                className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
            >
                Salvar Produto
            </button>
        </form>
    );
}

function LoginForm({ onLogin }) {
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
   
    if (employeeCode && employeeName && password) {
        onLogin(true);
    } else {
        setError('Por favor, preencha todos os campos.');
    }
  };

  const primaryGreen = '#41853C'; 

  return (
    <form className="p-6 space-y-5" onSubmit={handleSubmit}>
        
        {/* Logo Placeholder */}
        <div className="text-center pb-2">
            <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl text-gray-600">LOGO</span>
            </div>
            <p className="text-sm text-gray-500">Insira a imagem da sua logo aqui.</p>
        </div>
        
        {/* Campos de Input */}
        <div className="space-y-3">
            <input
                type="text"
                placeholder="Código do Funcionário"
                value={employeeCode}
                onChange={(e) => setEmployeeCode(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
            />
            <input
                type="text"
                placeholder="Nome"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
            />
        </div>
        
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <button 
            type="submit" 
            style={{ backgroundColor: primaryGreen }}
            className="w-full py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200"
        >
            Entrar
        </button>
    </form>
  );
}


function LoginContainer({ onLogin }) {
    const primaryGreen = '#41853C';
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden">
                <div style={{ backgroundColor: primaryGreen }} className="p-4">
                    <h2 className="text-xl font-bold text-white text-center">Login do Sistema</h2>
                </div>
                <LoginForm onLogin={onLogin} />
            </div>
        </div>
    );
}


function App() {
  const [produtos, setProdutos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const adicionarProduto = (produto) => {
    setProdutos([produto, ...produtos]); 
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setProdutos([]);
  }
  
  
  if (!isLoggedIn) {
      return <LoginContainer onLogin={setIsLoggedIn} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Cabeçalho do Dashboard */}
      <header className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
        <button 
            onClick={handleLogout} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
        >
            Sair
        </button>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex flex-col md:flex-row gap-8 p-6 flex-grow max-w-7xl w-full mx-auto">
        
        {/* Formulário de Produto (Esquerda) */}
        <div className="w-full md:w-1/3">
            <ProductForm onSave={adicionarProduto} />
        </div>

        {/* Lista de Produtos (Direita) */}
        <div className="w-full md:w-2/3 bg-white p-6 shadow-xl rounded-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Produtos em Estoque ({produtos.length})</h2>
            <div className="space-y-3 max-h-[80vh] overflow-y-auto">
                {produtos.length === 0 ? (
                    <p className="text-gray-500 text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                        Nenhum produto cadastrado.
                    </p>
                ) : (
                    produtos.map((p, index) => (
                        <div key={p.id} className="border-l-4 border-blue-500 p-4 bg-gray-50 hover:bg-white rounded-lg shadow transition duration-150">
                            <p className="text-lg font-bold text-gray-800">{p.nome} ({p.codigo})</p>
                            <p className="text-sm text-gray-600 mb-1">{p.descricao}</p>
                            <div className="flex justify-between text-sm text-gray-500 pt-1 border-t border-gray-200">
                                <span><strong>Estoque:</strong> <span className="font-semibold text-blue-600">{p.estoque}</span></span>
                                <span><strong>Valor:</strong> R$ {parseFloat(p.valor).toFixed(2)}</span>
                                <span><strong>Entrada:</strong> {p.dataEntrada}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white p-3 mt-auto shadow-inner"> 
        <p className="text-center text-sm">© {new Date().getFullYear()} Treko-Sistema de Gestão de Estoque. Todos os direitos reservados a Trupe do Borrego Johnson.</p>
      </footer>
      
    </div>
  );
}

export default App;