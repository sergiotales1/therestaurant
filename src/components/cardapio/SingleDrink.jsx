import React from "react";

function SingleDrink({ drink }) {
  return (
    <div className="single-drink" key={drink.id}>
      <h3 className="drink-title">{drink.name}</h3>
      <p className="drink-desc">{drink.desc}</p>
      <p className="drink-price">R${drink.price}.00</p>
    </div>
  );
}

export default SingleDrink;
