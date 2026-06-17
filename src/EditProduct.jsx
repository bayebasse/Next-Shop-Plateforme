import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);
  
  const product = products.find(p => p.id.toString() === id);

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (product) {
      setForm(product);
      setPreview(product.image);
    }
  }, [product]);

  if (!product) return <div className="text-center py-20 font-bold">Produit introuvable...</div>;

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
    updateProduct({ 
      ...form, 
      price: parseFloat(form.price), 
      stock: parseInt(form.stock) 
    });
    navigate(`/produit/${id}`);
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border-4 border-black">
      <div className="flex justify-between items-center border-b-4 border-black pb-6 mb-8">
        <div>
          <h2 className="text-4xl font-black text-black mb-2">Modifier la Référence</h2>
          <p className="text-lg text-gray-600 font-medium italic">ID: #{product.id}</p>
        </div>
        <Link to={`/produit/${id}`} className="text-gray-400 hover:text-black font-bold">Annuler ×</Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Nom du produit</label>
          <input required className="w-full p-3 border-2 border-black rounded-lg focus:ring-4 focus:ring-orange-500 outline-none text-lg"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Catégorie</label>
          <select className="w-full p-3 border-2 border-black rounded-lg text-lg font-medium"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Informatique</option>
            <option>Accessoires</option>
            <option>Audio</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Prix (€)</label>
          <input type="number" required className="w-full p-3 border-2 border-black rounded-lg text-lg"
            value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div className="space-y-3">
          <label className="block text-base font-black text-black">Stock actuel</label>
          <input type="number" required className="w-full p-3 border-2 border-black rounded-lg text-lg"
            value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        </div>
        <div className="md:col-span-2 space-y-3">
          <label className="block text-base font-black text-black">Image (laisser vide pour conserver l'actuelle)</label>
          <div className="flex items-center gap-6">
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
            {preview && <img src={preview} alt="Preview" className="h-20 w-20 object-contain border-2 border-black rounded" />}
          </div>
        </div>
        <div className="md:col-span-2 space-y-3">
          <label className="block text-base font-black text-black">Description détaillée</label>
          <textarea className="w-full p-3 border-2 border-black rounded-lg h-40 text-lg"
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button className="md:col-span-2 bg-black text-white py-4 rounded-lg font-black hover:bg-orange-500 transition shadow-lg text-lg">
          Mettre à jour les informations
        </button>
      </form>
    </div>
  );
};

export default EditProduct;