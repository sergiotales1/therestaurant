import React, { useRef, useState } from "react";
import { ReactDatePicker } from "../customHooks.jsx";

import styled from "styled-components";
import { Form, Link, useNavigation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

const FormWrapper = styled.div`
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  label {
    font-size: 1.3rem;
  }

  input {
    border-radius: 10px;
    width: 100%;
    padding: 0.4rem;
  }

  .btn-container {
    display: flex;
    flex-direction: column;
  }
  .btn {
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 0.7rem;
    margin-top: 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  .btn-ver-reservas {
    padding: 0.7rem;
    margin-top: 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    background-color: transparent;
    color: var(--secondary-green);
    border: 2px solid var(--secondary-green);
  }

  .btn-ver-reservas:hover {
    color: lightgray;
  }

  .btn:hover {
    color: lightgray;
  }

  .react-datepicker__time-container {
    width: 75px;
  }

  .react-datepicker__time-list-item {
    width: 75px;
  }

  @media (min-width: 800px) {
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0 1rem;
      max-width: 500px;
      text-align: center;
    }

    label {
      font-size: 1.5rem;
    }
    input {
      margin-top: 1rem;
      font-size: 1.2rem;
      padding: 0.2rem 1rem;
      border-radius: 10px;
      display: block;
      width: 400px;
    }

    .btn-container {
      display: flex;
      flex-direction: row;
      gap: 2rem;
    }

    .btn {
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

    .btn-ver-reservas {
      margin-top: 2rem;
      padding: 0.9rem;
      border-radius: 10px;
      align-self: center;
      border: 2px solid var(--secondary-green);
      font-size: 1.3rem;
      transition: all 0.3s ease-in-out;
    }

    div.react-datepicker {
    }

    .react-datepicker__time-container {
      font-size: 1rem;
      width: 85px;
    }

    .react-datepicker__time-list-item {
      width: 85px;
    }
  }
`;

function ReservaForm() {
  const navigation = useNavigation();

  const [startDate, setStartDate] = useState(new Date());
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const telRef = useRef(null);
  const bdayMonthRef = useRef(null);

  const { isLoggedIn } = useSelector((store) => store.navbar);

  const handleDataChange = (date) => {
    setStartDate(date);
  };

  return (
    <FormWrapper>
      <Form action="/reserva" method="post">
        <label className="name-label">
          Nome:
          <input
            ref={nameRef}
            // defaultValue={"john doe"}
            required
            type="text"
            name="name"
          />
        </label>
        <label className="tel-label">
          Número de celular (opcional):
          <input
            ref={telRef}
            // defaultValue={"99999-9999"}
            type="text"
            name="tel"
          />
        </label>
        <label className="email-label">
          Email:
          <input
            ref={emailRef}
            // defaultValue={"john@mail.com"}
            required
            type="email"
            name="email"
          />
        </label>
        <label className="bday-label">
          Mês de aniversário (opcional):
          <input
            ref={bdayMonthRef}
            // defaultValue={"December"}
            type="text"
            name="bday"
          />
        </label>
        <label className="date-label">
          Dia e hora da reserva:
          <ReactDatePicker
            startDate={startDate}
            onDateChange={handleDataChange}
            name="date"
          />
        </label>
        <label className="table-label">
          Mesa:
          <input
            type="number"
            defaultValue={1}
            name="table"
            required
            min={1}
            max={8}
          />
        </label>
        {navigation.state === "submitting" ? (
          <CircularProgress sx={{ mt: 2 }} color="success" />
        ) : (
          <div className="btn-container">
            <button className="btn" type="submit">
              Reservar
            </button>
            <Link to={isLoggedIn ? "/dashboard" : "/login"}>
              <button className=" btn-ver-reservas" type="submit">
                Ver reservas
              </button>
            </Link>
          </div>
        )}
      </Form>
    </FormWrapper>
  );
}

export default ReservaForm;
