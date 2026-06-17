import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  
  const product = products.find(p => p.id.toString() === id);

  if (!product) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Produit introuvable...</h2>
      <Link to="/catalogue" className="text-orange-500 hover:underline mt-4 inline-block">Retour au catalogue</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link to="/catalogue" className="inline-flex items-center text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-widest">
        <span className="mr-2">←</span> Retour au catalogue
      </Link>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200 flex flex-col md:flex-row min-h-[550px]">
        {/* Partie Gauche : Image du produit */}
        <div className="md:w-1/2 bg-white flex items-center justify-center p-12 border-r border-gray-100">
          {product.image ? (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden shadow-inner border border-gray-100">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[400px] w-auto object-contain transition-transform duration-500 hover:scale-110" 
              />
            </div>
          ) : (
            <div className="text-9xl text-gray-200">📦</div>
          )}
        </div>
        
        {/* Partie Droite : Informations */}
        <div className="md:w-1/2 p-10 flex flex-col">
          <div className="mb-8">
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">{product.name}</h1>
            <p className="text-3xl font-black text-orange-500 mt-2">{product.price.toLocaleString()} €</p>
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Description du produit</h3>
            <p className="text-gray-700 leading-relaxed text-lg font-medium break-words whitespace-pre-wrap">
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
            
            <Link 
              to={`/modifier/${product.id}`}
              className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-orange-500 transition-all text-center block shadow-lg"
            >
              Modifier la référence
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;