import React from "react";

import styled from "styled-components";
import mainImg from "../assets/reserva-rsc/reserva-img2.png";
import drinkImg1 from "../assets/reserva-rsc/reserva-img1.png";
import drinkImg2 from "../assets/reserva-rsc/reserva-img3.png";
import Form from "../components/Form";

// TODO: implement the handleForm function

const ReservaWrapper = styled.section`
  padding: 8rem 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .subtitle {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 0rem 0 1.5rem 0;
    display: inline;
  }

  .subtitle-text {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  .images-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
    }

    .img-2,
    .img-3 {
      display: none;
    }
  }

  .form-container {
    margin-top: 1.5rem;
  }

  @media (min-width: 800px) {
    padding: 6rem 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .subtitle {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
      margin: 2rem 0 1rem 0;
    }

    .subtitle-text {
      text-align: center;
      font-size: 1.7rem;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }

    .content {
      display: grid;
      grid-template-columns: 1fr 550px;
      place-items: center;
    }

    .images-container {
      display: grid;
      grid-template-columns: 200px 1fr;
      grid-template-rows: 250px 250px;
      gap: 1rem;

      img {
        width: 100%;
        height: 100%;
      }

      .img-1 {
        grid-column: 1 / 3;
      }

      .img-2,
      .img-3 {
        display: block;
      }
    }

    .form-container {
      margin-top: 1.5rem;
    }
  }
`;

function Reserva() {
  return (
    <ReservaWrapper>
      <h3 className="subtitle">Faça sua reserva</h3>
      <p className="subtitle-text">
        Preencha seus dados e entraremos em contato!
      </p>

      <div className="content">
        <div className="images-container">
          <img className="img-1" src={mainImg} alt="waiter taking notes" />
          <img className="img-2" src={drinkImg1} alt="drinks" />
          <img className="img-3" src={drinkImg2} alt="drinks" />
        </div>
        <div className="form-container">
          <Form />
        </div>
      </div>
    </ReservaWrapper>
  );
}
export default Reserva;
