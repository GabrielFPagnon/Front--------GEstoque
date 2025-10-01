import { useState } from "react";

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
    onSave(form);
    setForm({ nome: "", codigo: "", quantidade: 0, preco: 0, categoria: "" });
  };

  
}

export default ProductForm;
