import React from 'react';

const StatCard = ({ title, value, color }) => (
  <div className={`p-8 rounded-2xl shadow-lg bg-white border-l-8 ${color} hover:shadow-xl transition-shadow`}>
    <h3 className="text-gray-600 text-xs font-bold uppercase tracking-widest">{title}</h3>
    <p className="text-4xl font-black mt-3 text-black">{value}</p>
  </div>
);

export default StatCard;