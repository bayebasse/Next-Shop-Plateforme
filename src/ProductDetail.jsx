import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, deleteProduct } = useContext(ProductContext);
  
  const product = products.find(p => p.id.toString() === id);

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Produit introuvable...</h2>
      <Link to="/catalogue" className="text-orange-500 hover:underline mt-4 inline-block">Retour au catalogue</Link>
    </div>
  );

  const handleDelete = () => {
    if (window.confirm('Voulez-vous vraiment retirer ce produit du catalogue ?')) {
      deleteProduct(product.id);
      navigate('/catalogue');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link to="/catalogue" className="inline-flex items-center text-gray-400 hover:text-black transition-colors font-bold text-xs uppercase tracking-widest">
        <span className="mr-2">←</span> Retour au catalogue
      </Link>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-200 flex flex-col md:flex-row ">
        {/* Partie Gauche : Image du produit */}
        <div className="md:w-[50%] bg-white flex items-center justify-center p-2  border-r border-gray-100">
          {product.image ? (
            <div className="relative w-full object-cover aspect-square flex items-center justify-center bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-gray-100 p-10">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain transition-transform duration-700 hover:scale-110" 
              />
            </div>
          ) : (
            <div className="aspect-square w-full flex items-center justify-center bg-gray-50 rounded-2xl text-8xl text-gray-200 border-2 border-dashed border-gray-100">📦</div>
          )}
        </div>
        
        {/* Partie Droite : Informations */}
        <div className="md:w-1/2 p-8 lg:p-14 flex flex-col">
          <div className="mb-8">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest">
              Category / {product.category}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">{product.name}</h1>
            <p className="text-3xl font-black text-orange-500 mt-2">{Math.floor(product.price).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} CFA</p>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Description du produit</h3>
            <p className="text-gray-700 leading-relaxed text-lg font-medium break-words whitespace-pre-wrap max-h-48 overflow-y-auto pr-2 custom-scrollbar">
              {product.description || "Aucune description disponible pour ce produit."}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-semibold">État des stocks</span>
              <span className={`px-4 py-2 rounded-xl font-black ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {product.stock} unités disponibles
              </span>
            </div>

            
          </div>
          <div className="flex w-full gap-4 pt-8">
                <Link 
                to={`/modifier/${product.id}`}
                className="flex-1 bg-black text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-all text-center block shadow-lg"
                >
                Modifier
                </Link>

            <button
                onClick={handleDelete}
                className="flex-1 cursor-pointer bg-red-50 text-red-600 py-4 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all text-center block border border-red-100 shadow-sm"
            >
                Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;