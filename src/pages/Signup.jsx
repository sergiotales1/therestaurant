import React from "react";
import styled from "styled-components";

import { FaBirthdayCake } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";

import logo from "../assets/black-logo.png";
import { Link } from "react-router-dom";

const SignupWrapper = styled.section`
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.3rem;
    margin-top: 1.3rem;
  }

  .input-container {
    display: grid;
    grid-template-columns: auto 1fr;
    background-color: white;
    border: 2px solid lightgrey;
    padding: 0.5rem 0.6rem;
    place-items: center;
    gap: 0.4rem;
    font-size: 1.2rem;
    input {
      border: none;
      outline: none;
    }

    input::placeholder {
      color: darkgray;
    }
  }
  .btn {
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 0.8rem;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    border: 2px solid var(--secondary-green);
  }
  .btn:hover {
    background-color: transparent;
    color: var(--secondary-green);
    border: 2px solid var(--secondary-green);
  }

  .under-form-text {
    margin-top: 1.3rem;
    align-self: flex-end;
    text-align: end;

    p:first-of-type {
      font-weight: bold;
      color: black;
      font-size: 1.2rem;
    }
    p {
      font-weight: bold;
      color: var(--secondary-green);
      font-size: 0.9rem;
      cursor: pointer;
    }
  }

  @media (min-width: 800px) {
    padding: 8rem 0 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-top: 2rem;
    }

    .input-container {
      display: grid;
      grid-template-columns: auto 1fr;
      background-color: white;
      border: 2px solid lightgrey;
      padding: 0.8rem;
      gap: 0.4rem;
      font-size: 1.6rem;
      input {
        border: none;
      }

      input::placeholder {
        color: darkgray;
      }
    }
    .btn {
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      padding: 0.8rem;
      font-size: 1.5rem;
      font-weight: bold;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn:hover {
      background-color: transparent;
      color: var(--secondary-green);
      border: 2px solid var(--secondary-green);
    }

    .under-form-text {
      margin-top: 2rem;
      align-self: flex-end;
      text-align: end;

      p:first-of-type {
        font-weight: bold;
        color: black;
        font-size: 1.7rem;
      }
      p {
        font-weight: bold;
        color: var(--secondary-green);
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
`;

function Signup() {
  return (
    <SignupWrapper>
      <div className="content">
        <img src={logo} alt="logo" className="logo" />
        <form action="">
          <div className="input-container">
            <IoMail />
            <input type="text" name="email" placeholder="Email " />
          </div>
          <div className="input-container">
            <FaUser />
            <input type="text" name="name" placeholder="Nome" />
          </div>
          <div className="input-container">
            <FaBirthdayCake />
            <input
              type="text"
              name="bdayMonth"
              placeholder="Mes de aniversário"
            />
          </div>
          <div className="input-container">
            <RiLockPasswordFill />
            <input type="text" name="password" placeholder="Senha" />
          </div>
          <button className="btn" type="submit">
            Criar Conta
          </button>
        </form>
        <div className="under-form-text">
          <p>Já possui conta?</p>

          <p>
            <Link
              style={{
                textDecoration: "none",
                color: `var(--secondary-green)`,
              }}
              to={"/login"}
            >
              Ir para o login
            </Link>
          </p>
        </div>
      </div>
    </SignupWrapper>
  );
}

export default Signup;
