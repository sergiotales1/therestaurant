import React from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import SingleDrink from "../components/drinks/SingleDrink";
import DrinksCarousel from "../components/drinks/drinks-slider.jsx";
import heroBg from "../assets/hero-assets/hero-bg.png";

const DrinksWrapper = styled.section`
  width: 100vw;
  height: auto;
  padding-top: 8rem;

  background: url(${heroBg});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--primary-bg-white);

  .title-container {
    text-align: center;

    .title {
      margin: 0;
      font-family: "Anton";
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.9rem;
    }

    .subtitle {
      font-family: "Anton";
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .drinks-container {
    padding: 0 2vw;
    margin-top: 2rem;
  }

  .single-drink {
    margin: 2rem 0;
  }

  .drink-desc {
    margin: 0.5rem 0 1rem 0;
  }

  .drink-price {
    font-size: 1.2rem;
    font-weight: 500;
  }

  @media (min-width: 800px) {
    width: 100vw;
    height: auto;
    padding: 8rem 0;

    background: url(${heroBg});
    background-size: cover;
    background-position: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--primary-bg-white);

    .title-container {
      text-align: center;

      .title {
        margin: 0;
        font-family: "Anton";
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 0.9rem;
        font-size: 4rem;
      }

      .subtitle {
        font-family: "Anton";
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 2rem;
      }
    }

    .drinks-container {
      padding: 0 2vw;
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem 7rem;
    }

    .single-drink {
      margin: 2rem 0;
      max-width: 500px;
    }

    .drink-title {
      font-size: 1.7rem;
    }

    .drink-desc {
      margin: 1.3rem 0 1.3rem 0;
      font-size: 1.3rem;
    }

    .drink-price {
      font-size: 1.7rem;
      font-weight: 500;
    }
  }
`;

function Drinks() {
  const { drinks } = useLoaderData();
  return (
    <>
      <DrinksWrapper>
        <div className="title-container">
          <h1 className="title">Drinks</h1>
          <h2 className="subtitle">Se beber não dirija!</h2>
        </div>
        <div className="drinks-container">
          {drinks.map((drink) => {
            return <SingleDrink drink={drink} key={drink.id} />;
          })}
        </div>
      </DrinksWrapper>
      <section className="drinks-carousel">
        <DrinksCarousel drinks={drinks} />
      </section>
    </>
  );
}

export default Drinks;
