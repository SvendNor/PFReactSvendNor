import React from 'react';
import ItemDetailContainer from './ItemDetailContainer';

const items = [
  { id: 1, name: 'Producto 1', price: 100 },
  { id: 2, name: 'Producto 2', price: 200 },
  { id: 3, name: 'Producto 3', price: 300 },
];

const ItemList = () => {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="border p-4 rounded-md">
          <ItemDetailContainer item={item} />
        </li>
      ))}
    </ul>
  );
};

export default ItemList;