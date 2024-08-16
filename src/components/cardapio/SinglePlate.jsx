import React from "react";

function SingleDrink({ meal }) {
  return (
    <div className="single-meal" key={meal.id}>
      {" "}
      <h3 className="meal-title">{meal.name}</h3>
      <p className="meal-desc">{meal.desc}</p>
      <p className="meal-price">R${meal.price}.00</p>
    </div>
  );
}

export default SingleDrink;
