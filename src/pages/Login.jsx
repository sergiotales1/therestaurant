import React, { useState } from "react";
import styled from "styled-components";

import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import logo from "../assets/black-logo.png";
import { Form, Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const LoginWrapper = styled.section`
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
    grid-template-columns: auto 1fr 10px;
    background-color: white;
    border: 2px solid lightgrey;
    padding: 0.5rem 0.6rem;
    place-items: center;
    gap: 0.4rem;
    font-size: 1.2rem;
    width: 300px;
    input {
      width: 100%;
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
    border: none;
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

  .btn-pw {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
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
      gap: 1rem;
      margin-top: 2rem;
    }

    .input-container {
      display: grid;
      grid-template-columns: auto 1fr 30px;
      background-color: white;
      border: 2px solid lightgrey;
      padding: 0.8rem;
      gap: 0.4rem;
      font-size: 1.6rem;
      width: 400px;
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

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [passwordShow, setPasswordShow] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsSubmitting(false);
  };

  const handlePwVisibility = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <LoginWrapper>
      <div className="content">
        <img src={logo} alt="logo" className="logo" />
        <Form onSubmit={handleSubmit} action="/login" method="post">
          <div className="input-container">
            <IoMail />
            <input
              required
              defaultValue={"john@gmail.com"}
              type="email"
              name="email"
              placeholder="Email "
            />
          </div>
          <div className="input-container">
            <RiLockPasswordFill />
            <input
              defaultValue={123123}
              required
              minLength={6}
              type={passwordShow ? "text" : "password"}
              name="password"
              placeholder="Senha"
            />
            <button
              className="btn-pw"
              type="button"
              onClick={handlePwVisibility}
            >
              {passwordShow ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {isSubmitting ? (
            <CircularProgress color="success" />
          ) : (
            <button className="btn" disabled={isSubmitting} type="submit">
              Entrar
            </button>
          )}
        </Form>
        <div className="under-form-text">
          <p>Não tem conta?</p>

          <p>
            <Link
              style={{
                textDecoration: "none",
                color: `var(--secondary-green)`,
              }}
              to={"/signup"}
            >
              Criar conta agora
            </Link>
          </p>
        </div>
      </div>
    </LoginWrapper>
  );
}

export default Login;
