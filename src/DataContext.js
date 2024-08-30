// DataContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create a context
const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  // Define your state and methods
  const [data1, setData1] = useState(() => localStorage.getItem('data1') || null);
  const [data2, setData2] = useState(() => localStorage.getItem('data2') || null);
  const [activeItem, setActiveItem] = useState(() => parseInt(localStorage.getItem('activeItem'), 10) || 1);


  // Store data in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('data1', data1);
  }, [data1]);

  useEffect(() => {
    localStorage.setItem('data2', data2);
  }, [data2]);

  useEffect(() => {
    localStorage.setItem('activeItem', activeItem);
  }, [activeItem]);


  // Make the data and any functions you want available to consuming components
  return (
    <DataContext.Provider value={{ data1, setData1, data2, setData2, activeItem, setActiveItem }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
