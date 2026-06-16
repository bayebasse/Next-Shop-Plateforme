import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <tr className="hover:bg-orange-50 transition-colors border-b border-gray-200">
    <td className="px-6 py-4 whitespace-nowrap font-bold text-lg text-black">{product.name}</td>
    <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-700">{product.category}</td>
    <td className="px-6 py-4 whitespace-nowrap text-orange-500 font-black text-lg">{product.price} €</td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-3 py-2 text-sm font-bold rounded-full ${product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
        {product.stock}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <Link to={`/produit/${product.id}`} className="text-orange-500 hover:text-black font-black text-base transition hover:underline">Voir</Link>
    </td>
  </tr>
);

export default ProductCard;