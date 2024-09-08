import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorWrapper = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .btn {
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 0.7rem;
    margin-top: 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .btn:hover {
    color: lightgray;
  }

  @media (min-width: 800px) {
    .btn {
      text-decoration: none;
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      margin-top: 2rem;
      padding: 0.9rem;
      border-radius: 10px;
      align-self: center;
      border: 2px solid var(--secondary-green);
      font-size: 1.3rem;
      transition: all 0.3s ease-in-out;
    }
  }
`;

const Error = () => {
  return (
    <ErrorWrapper>
      <h1>Ocorreu um ERRO!</h1>

      <Link to={"/"} className="btn">
        Voltar para casa
      </Link>
    </ErrorWrapper>
  );
};

export default Error;
