import React from "react";
import styled from "styled-components";
import SinglePlate from "../components/cardapio/SinglePlate";
import CardapioCarousel from "../components/cardapio/cardapio-slider.jsx";
import heroBg from "../assets/hero-assets/hero-bg.png";
import { useQuery } from "@tanstack/react-query";
import { mealsRqParams } from "../js/utils";

const CardapioWrapper = styled.section`
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

  .plates-container {
    padding: 0 2vw;
    margin-top: 2rem;
  }

  .single-meal {
    margin: 2rem 0;
  }

  .meal-desc {
    margin: 0.5rem 0 1rem 0;
  }

  .meal-price {
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

    .plates-container {
      padding: 0 2vw;
      margin-top: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem 7rem;
    }

    .single-meal {
      margin: 2rem 0;
      max-width: 500px;
    }

    .meal-title {
      font-size: 1.7rem;
    }

    .meal-desc {
      margin: 1.3rem 0 1.3rem 0;
      font-size: 1.3rem;
    }

    .meal-price {
      font-size: 1.7rem;
      font-weight: 500;
    }
  }
`;

function Cardapio() {
  const { data: meals } = useQuery(mealsRqParams());

  if (meals) {
    return (
      <>
        <CardapioWrapper>
          <div className="title-container">
            <h1 className="title">Cardápio</h1>
          </div>
          <div className="plates-container">
            {meals.map((meal) => {
              return <SinglePlate meal={meal} key={meal.id} />;
            })}
          </div>
        </CardapioWrapper>
        <section className="drinks-carousel">
          <CardapioCarousel meals={meals} />
        </section>
      </>
    );
  }
}

export default Cardapio;
