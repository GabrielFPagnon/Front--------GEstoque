import { useState } from "react";

function ProductForm({ onSave }) {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    descricao: "",
    estoque: 0,
    valor: 0,
    dataEntrada: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({
      id: "",
      nome: "",
      descricao: "",
      estoque: 0,
      valor: 0,
      dataEntrada: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded w-96">
      <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>

      <label className="block mb-2">
        ID:
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Nome:
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Descrição:
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border p-1 rounded"
        />
      </label>

      <label className="block mb-2">
        Estoque:
        <input
          type="number"
          name="estoque"
          value={form.estoque}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Valor:
        <input
          type="number"
          step="0.01"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          required
        />
      </label>

      <label className="block mb-2">
        Data de Entrada:
        <input
          type="date"
          name="dataEntrada"
          value={form.dataEntrada}
          onChange={handleChange}
          className="w-full border p-1 rounded"
          required
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Salvar
      </button>
    </form>
  );
}

export default ProductForm;
