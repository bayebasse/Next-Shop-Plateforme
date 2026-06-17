import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import StatCard from './StatCard';

const Dashboard = () => {
  const { products } = useContext(ProductContext);
  
  const totalProducts = products.length;
  const stockValue = products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0);
  const lowStock = products.filter(p => p.stock < 10).length;

  return (
    <div className="space-y-8">
      <div className="border-b-4 border-orange-500 pb-4">
        <h1 className="text-5xl font-black text-black">Tableau de Bord</h1>
        <p className="text-lg text-gray-600 mt-2 font-medium">Suivi de vos statistiques commerciales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Références" value={totalProducts} color="border-orange-500" />
        <StatCard title="Valeur du Stock" value={`${stockValue.toLocaleString()} CFA`} color="border-green-500" />
        <StatCard title="Alertes Stock" value={lowStock} color="border-red-500" />
      </div>
    </div>
  );
};

export default Dashboard;