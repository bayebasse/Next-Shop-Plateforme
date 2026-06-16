import React, { createContext, useState, useEffect } from 'react';
import { initialProducts } from './mockData';

/* eslint-disable react-refresh/only-export-components */
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('next-shop-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('next-shop-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    // Création d'un nouveau tableau avec le spread operator
    setProducts([...products, { ...newProduct, id: Date.now() }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};