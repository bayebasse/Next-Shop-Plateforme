import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-300 transition-all p-5 flex flex-col gap-3">
    <div className="flex justify-between items-start">
      <h2 className="font-black text-lg text-black leading-tight">{product.name}</h2>
      <span className="text-orange-500 font-black text-xl">{product.price} CFA</span>
    </div>
    <span className="text-sm font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1 self-start">
      {product.category}
    </span>
    <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
      <span className={`px-3 py-1 text-sm font-bold rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        Stock : {product.stock}
      </span>
      <Link to={`/produit/${product.id}`} className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-black transition">
        Voir →
      </Link>
    </div>
  </div>
);

export default ProductCard;