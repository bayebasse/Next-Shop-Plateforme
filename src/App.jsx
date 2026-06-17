import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ProductProvider } from './ProductContext';
import Dashboard from './Dashboard';
import Catalogue from './Catalogue';
import AddProduct from './AddProduct';
import ProductDetail from './ProductDetail';
import EditProduct from './EditProduct';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <nav className="w-64 bg-black text-white p-6 space-y-8 border-r border-zinc-800">
            <div className="text-2xl font-bold tracking-tighter text-orange-500">Next-Shop</div>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-900 hover:text-orange-500 transition">
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/catalogue" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-900 hover:text-orange-500 transition">
                  <span>Catalogue</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1 p-8">
            <div className="max-w-5xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/ajouter" element={<AddProduct />} />
                <Route path="/produit/:id" element={<ProductDetail />} />
                <Route path="/modifier/:id" element={<EditProduct />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
