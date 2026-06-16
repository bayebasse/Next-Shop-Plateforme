import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

const Catalogue = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b-4 border-orange-500 pb-4">
        <div>
          <h1 className="text-5xl font-black text-black">Catalogue Produits</h1>
          <p className="text-lg text-gray-600 mt-2 font-medium">Gestion de votre inventaire</p>
        </div>
        <Link to="/ajouter" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-black transition font-bold shadow-lg text-lg">
          + Ajouter
        </Link>
      </div>
      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Nom', 'Catégorie', 'Prix', 'Stock', ''].map(head => (
                <th key={head} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Catalogue;