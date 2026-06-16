import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from './ProductContext';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  
  const product = products.find(p => p.id.toString() === id);

  if (!product) return <div className="text-center py-10">Produit introuvable...</div>;

  return (
    <div className="space-y-8">
      <Link to="/catalogue" className="text-orange-500 font-black text-lg hover:text-black hover:underline transition inline-block">← Retour au catalogue</Link>
      
      <div className="bg-white rounded-2xl shadow-xl border-4 border-orange-500 overflow-hidden">
        {/* Header avec image */}
        <div className="bg-black border-b-4 border-orange-500 flex flex-col md:flex-row">
            {product.image && (
                <div className="flex-shrink-0 flex items-center justify-center p-2 bg-zinc-900">
                <img src={product.image} alt={product.name} className="max-h-64 max-w-xs w-auto h-auto object-contain rounded-xl" />
                </div>
            )}
          <div className="p-10 flex flex-col justify-center">
            <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-black uppercase tracking-wider inline-block self-start">
              {product.category}
            </span>
            <h1 className="text-6xl font-black text-white mt-6">{product.name}</h1>
          </div>
        </div>
        
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 border-r-4 border-orange-500 pr-8">
            <h3 className="text-2xl font-black text-black">Description</h3>
            <p className="text-lg text-gray-700 leading-relaxed font-medium">{product.description}</p>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl space-y-6 border-2 border-orange-500">
            <div className="flex justify-between items-center border-b-2 border-orange-500 pb-4">
              <span className="text-xl font-black text-black">Prix</span>
              <span className="text-3xl font-black text-orange-500">{product.price} CFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xl font-black text-black">Stock</span>
              <span className={`text-2xl font-black ${product.stock < 10 ? 'text-red-500' : 'text-green-500'}`}>{product.stock} unités</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;