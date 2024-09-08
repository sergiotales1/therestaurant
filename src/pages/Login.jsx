import React, { useState } from "react";
import styled from "styled-components";

import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import logo from "../assets/black-logo.png";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { entrarComoVisitante } from "../js/utils";

const LoginWrapper = styled.section`
  height: 100vh;

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

  .btn-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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
    cursor: pointer;
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
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [passwordShow, setPasswordShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePwVisibility = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <LoginWrapper>
      <div className="content">
        <img src={logo} alt="logo" className="logo" />
        <Form action="/login" method="post">
          <div className="input-container">
            <IoMail />
            <input required type="email" name="email" placeholder="Email " />
          </div>
          <div className="input-container">
            <RiLockPasswordFill />
            <input
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
          {navigation.state === "submitting" || loading ? (
            <CircularProgress color="success" />
          ) : (
            <div className="btn-container">
              <button
                className="btn"
                onClick={async () => {
                  setLoading(true);

                  await entrarComoVisitante();
                  setLoading(false);
                  navigate("/dashboard");
                }}
                type="button"
              >
                Entrar como visitante
              </button>
              <button className="btn" type="submit">
                Entrar
              </button>
            </div>
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
