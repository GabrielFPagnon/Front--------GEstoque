import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiFetch, BASE } from './api';
import ProductForm from './components/ProductForm';

const API_URL = `${BASE}/api/login`;

function LoginForm({ onLogin }) {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const primaryGreen = '#41853C'; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!codigo || !nome || !password) {
            setError('Por favor, preencha todos os campos.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(API_URL, {
                codigo: codigo,
                nome: nome,
                password: password,
            });

            console.log('Login efetuado com sucesso!', response.data);
            onLogin(true); 

        } catch (err) {
            const errorMessage = err.response 
                ? err.response.data?.message || 'Credenciais inválidas. Tente novamente.'
                : 'Não foi possível conectar ao servidor. Verifique o Back-end.';
            
            setError(errorMessage);
            console.error('Erro de Login:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
            
            <div className="text-center pb-2">
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-2">
                    <span className="text-2xl text-gray-600">LOGO</span>
                </div>
                <p className="text-sm text-gray-500">Insira a imagem da sua logo aqui.</p>
            </div>
            
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Código do Funcionário"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
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
                className="w-full py-3 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition duration-200 disabled:opacity-50"
                disabled={isLoading}
            >
                {isLoading ? 'Acessando...' : 'Entrar'}
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
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [submitToServer, setSubmitToServer] = useState(false);

    const adicionarProduto = (produto) => {
        setProdutos([produto, ...produtos]); 
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        setProdutos([]);
    }
    
    useEffect(() => {
        const fetchProducts = async () => {
            setLoadingProducts(true);
            try {
                const data = await apiFetch('/api/products');
                if (Array.isArray(data)) setProdutos(data);
            } catch (err) {
                console.warn('Não foi possível carregar produtos do servidor:', err.message || err);
            } finally {
                setLoadingProducts(false);
            }
        };

        if (isLoggedIn) fetchProducts();
    }, [isLoggedIn]);
    
    
    if (!isLoggedIn) {
        return <LoginContainer onLogin={setIsLoggedIn} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            
            <header className="bg-blue-600 text-white p-4 shadow-lg flex justify-between items-center">
                <h1 className="text-3xl font-bold">Gestão de Produtos</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-150"
                >
                    Sair
                </button>
            </header>

            <main className="flex flex-col md:flex-row gap-8 p-6 flex-grow max-w-7xl w-full mx-auto">
                
                <div className="w-full md:w-1/3">
                    <div className="mb-4 flex items-center justify-between">
                        <label className="text-sm text-gray-600">Enviar ao servidor:</label>
                        <button
                            onClick={() => setSubmitToServer((s) => !s)}
                            className={`px-3 py-1 rounded ${submitToServer ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            type="button"
                        >
                            {submitToServer ? 'Ativo' : 'Inativo'}
                        </button>
                    </div>
                    <ProductForm onSave={adicionarProduto} submitToServer={submitToServer} />
                </div>

                <div className="w-full md:w-2/3 bg-white p-6 shadow-xl rounded-xl">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Produtos em Estoque ({produtos.length})</h2>
                    <div className="space-y-3 max-h-[80vh] overflow-y-auto">
                        {produtos.length === 0 ? (
                            <p className="text-gray-500 text-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
                                Nenhum produto cadastrado.
                            </p>
                        ) : (
                            produtos.map((p) => (
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

            <footer className="bg-gray-800 text-white p-3 mt-auto shadow-inner"> 
                <p className="text-center text-sm">© {new Date().getFullYear()} Treko-Sistema de Gestão de Estoque. Todos os direitos reservados a Trupe do Borrego Johnson.</p>
            </footer>
            
        </div>
    );
}

export default App;
