import React from 'react';
import ItemList from './ItemList';

const ItemListContainer = ({ greeting }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{greeting}</h2>
      <ItemList />
    </div>
  );
};

export default ItemListContainer;