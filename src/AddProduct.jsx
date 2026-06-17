import React, { useState, useContext } from 'react';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', category: 'Informatique', stock: '', description: '', image: null });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const hasLetter = /[a-zA-ZÀ-ÿ]/;

    if (form.name.trim().length < 3) {
      newErrors.name = "Le nom doit contenir au moins 3 caractères.";
    } else if (!hasLetter.test(form.name)) {
      newErrors.name = "Le nom doit contenir au moins une lettre (pas uniquement des chiffres).";
    }

    if (!form.price || parseFloat(form.price) <= 0) {
      newErrors.price = "Le prix doit être supérieur à 0.";
    } else if (form.price.toString().match(/[.,]/)) {
      newErrors.price = "Le prix CFA doit être un nombre entier (pas de virgule ni de point).";
    }

    if (form.stock === '' || parseInt(form.stock) < 0) newErrors.stock = "Le stock ne peut pas être négatif.";
    else if (form.stock.toString().match(/[.,]/)) {
      newErrors.stock = "Le stock doit être un nombre entier.";
    }

    if (form.description.trim().length < 10) {
      newErrors.description = "La description doit faire au moins 10 caractères.";
    } else if (!hasLetter.test(form.description)) {
      newErrors.description = "La description doit contenir du texte descriptif (pas uniquement des chiffres).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (validate()) {
      addProduct({ ...form, price: parseInt(form.price, 10), stock: parseInt(form.stock, 10) });
      navigate('/catalogue');
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-4xl mx-auto">
      <div className="border-b border-gray-100 pb-6 mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-1">Nouvelle Référence</h2>
        <p className="text-gray-500 font-medium">Complétez les informations pour publier le produit.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Nom */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Nom du produit</label>
          <input className={`w-full p-4 bg-gray-50 border-2 rounded-xl focus:bg-white transition-all outline-none ${errors.name ? 'border-red-500 ring-2 ring-red-100' : 'border-transparent focus:border-orange-500'}`}
            placeholder="Ex: MacBook Pro M3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          {errors.name && <p className="text-red-500 text-xs font-bold">{errors.name}</p>}
        </div>

        {/* Catégorie */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Catégorie</label>
          <select className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-orange-500 outline-none transition-all font-medium"
            value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>Informatique</option>
            <option>Accessoires</option>
            <option>Audio</option>
          </select>
        </div>

        {/* Prix */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Prix de vente (CFA)</label>
          <input type="number" className={`w-full p-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.price ? 'border-red-500' : 'border-transparent focus:border-orange-500'}`}
            placeholder="0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          {errors.price && <p className="text-red-500 text-xs font-bold">{errors.price}</p>}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Stock initial</label>
          <input type="number" className={`w-full p-4 bg-gray-50 border-2 rounded-xl outline-none transition-all ${errors.stock ? 'border-red-500' : 'border-transparent focus:border-orange-500'}`}
            placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          {errors.stock && <p className="text-red-500 text-xs font-bold">{errors.stock}</p>}
        </div>

        {/* Image */}
        <div className="md:col-span-2 space-y-2">
          <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Visuel produit</label>
          <div className="flex items-center gap-6">
            <label className="cursor-pointer flex items-center gap-3 bg-white hover:bg-orange-50 border-2 border-dashed border-gray-200 hover:border-orange-400 rounded-2xl px-8 py-5 transition-all">
              <span className="font-bold text-gray-500">Importer une image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImage} />
            </label>
            {preview && (
              <div className="relative group">
                <img src={preview} alt="Aperçu" className="h-20 w-20 object-contain rounded-xl border border-gray-100 shadow-md bg-gray-50 p-2" />
                <button type="button" onClick={() => {setPreview(null); setForm({...form, image: null})}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] font-bold shadow-lg">✕</button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="md:col-span-2 space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-wider">Description détaillée</label>
            <span className={`text-[10px] font-bold ${form.description.length < 10 ? 'text-orange-500' : 'text-green-500'}`}>
              {form.description.length} caractères (min 10)
            </span>
          </div>
          <textarea className={`w-full p-4 bg-gray-50 border-2 rounded-xl h-32 outline-none transition-all resize-none ${errors.description ? 'border-red-500' : 'border-transparent focus:border-orange-500'}`}
            placeholder="Décrivez les fonctionnalités clés, les dimensions ou les points forts..."
            value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <p className="text-[10px] text-gray-400 font-medium leading-tight">Une bonne description augmente les chances de vente de 40%. Mentionnez les specs techniques.</p>
          {errors.description && <p className="text-red-500 text-xs font-bold">{errors.description}</p>}
        </div>

        <button type="submit" className="md:col-span-2 cursor-pointer bg-black text-white py-5 rounded-2xl font-black hover:bg-orange-500 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-lg">
          Publier le produit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;