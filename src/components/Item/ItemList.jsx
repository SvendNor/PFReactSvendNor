import React from "react";
import Item from "./Item";

const ItemList = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {items.map((item) => (
      <Item key={item.id} item={item} />
    ))}
  </div>
);

export default ItemList;
