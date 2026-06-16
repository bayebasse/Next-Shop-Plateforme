import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', category: 'Informatique', stock: '', description: '', image: null });
  const [preview, setPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
    navigate('/catalogue');
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border-4 border-orange-500">
      <div className="border-b-4 border-orange-500 pb-6 mb-8">
        <h2 className="text-4xl font-black text-black mb-2">Ajouter une Référence</h2>
        <p className="text-lg text-gray-600 font-medium">Enrichissez votre catalogue</p>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Nom du produit</label>
          <input required className="w-full p-3 border-2 border-orange-500 rounded-lg focus:ring-4 focus:ring-orange-500 outline-none text-lg"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Catégorie</label>
          <select className="w-full p-3 border-2 border-orange-500 rounded-lg text-lg font-medium"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Informatique</option>
            <option>Accessoires</option>
            <option>Audio</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Prix (€)</label>
          <input type="number" required className="w-full p-3 border-2 border-orange-500 rounded-lg text-lg"
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Stock initial</label>
          <input type="number" required className="w-full p-3 border-2 border-orange-500 rounded-lg text-lg"
            value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </div>

        {/* Champ image */}
        <div className="md:col-span-2 space-y-3">
          <label className="block text-base font-black text-black">Image du produit</label>
          <div className="flex items-center gap-6">
            <label className="cursor-pointer flex items-center gap-3 bg-gray-100 hover:bg-orange-50 border-2 border-dashed border-orange-400 rounded-xl px-6 py-4 transition">
              <span className="text-2xl">📷</span>
              <span className="font-bold text-gray-600">Choisir une image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            {preview && (
              <img src={preview} alt="Aperçu" className="h-24 w-24 object-cover rounded-xl border-2 border-orange-400 shadow" />
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-3">
          <label className="block text-base font-black text-black">Description</label>
          <textarea className="w-full p-3 border-2 border-orange-500 rounded-lg h-40 text-lg"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button className="md:col-span-2 bg-orange-500 text-white py-4 rounded-lg font-black hover:bg-black transition shadow-lg text-lg">
          ✓ Enregistrer le produit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;