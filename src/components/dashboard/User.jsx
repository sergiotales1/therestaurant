import React, { useState } from "react";
import styled from "styled-components";
import {
  filterReservasByTime,
  getDashboardDates,
  getDateFormat,
  getTablesTaken,
} from "../../js/utils";
import { tables } from "../../js/data";

const UserWrapper = styled.section`
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  .today-subtitle {
    background-color: lightgray;
    padding: 1rem;
    text-align: center;
  }

  .tables-dashboard {
    background-color: lightgray;
    padding: 1rem;
    margin: 1rem;
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    .single-table {
      width: 40px;
      height: 40px;
    }
  }

  .legenda {
    display: flex;
    align-items: center;
    margin: 1rem;
    justify-content: center;
    gap: 1rem;
  }

  .available-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    .available-div {
      width: 40px;
      height: 40px;
      background-color: yellow;
    }
  }
  .unavailable-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    .unavailable-div {
      width: 40px;
      height: 40px;
      background-color: red;
    }
  }

  .dates-container {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin: 2rem 0;

    .single-date {
      padding: 0.4rem 0.1rem;
      width: 100%;
      background-color: lightgrey;
      cursor: pointer;
      border: 1px solid black;
      outline: transparent;
    }
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

  .btn:hover {
    background-color: transparent;
    color: var(--secondary-green);
    border: 2px solid var(--secondary-green);
  }

  .table-taken {
    background-color: red;
  }
  .table-available {
    background-color: yellow;
  }

  @media (min-width: 800px) {
    padding: 8rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .title {
      font-size: 3rem;
    }
    .today-subtitle {
      font-size: 2rem;
      background-color: lightgray;
      padding: 1rem;
      text-align: center;
    }

    .tables-dashboard {
      background-color: lightgray;
      padding: 3rem;
      margin: 1rem;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(4, 1fr);
      gap: 3rem 3rem;
      .single-table {
        width: 70px;
        height: 70px;
      }
    }

    .legenda {
      display: flex;
      align-items: flex-start;
      margin: 1rem 0;
      justify-content: flex-start;
      gap: 3rem;
      width: 100%;
    }

    .title-legenda {
      align-self: flex-start;
      font-size: 2rem;
    }

    .available-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      font-size: 2rem;
      .available-div {
        width: 55px;
        height: 55px;
        background-color: yellow;
      }
    }
    .unavailable-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.7rem;
      font-size: 2rem;
      .unavailable-div {
        width: 55px;
        height: 55px;
        background-color: red;
      }
    }

    .dates-container {
      display: grid;
      place-items: center;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;
      margin: 2rem 0;

      .single-date {
        font-size: 1.5rem;
        padding: 0.8rem;
        background-color: lightgrey;
        cursor: pointer;
        border: 1px solid black;
        outline: transparent;
      }
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
    .btn:hover {
      background-color: transparent;
      color: var(--secondary-green);
      border: 2px solid var(--secondary-green);
    }
  }
`;

function User({ reservas }) {
  const {
    initialDate,
    initialDateFormat,
    initialValidReservas,
    InitialTablesTaken,
    oneHourLater,
    twoHoursLater,
    threeHoursLater,
    nextOneDayDate,
    nextTwoDaysDate,
    nextThreeDaysDate,
  } = getDashboardDates({ reservas });

  const [dateFormat, setDateFormat] = useState(initialDateFormat);
  const [validReservas, setValidReservas] = useState(initialValidReservas);
  const [tablesTaken, setTablesTaken] = useState(InitialTablesTaken);

  function handleClick(e) {
    const date = new Date(e.target.dataset.date);
    setDateFormat(getDateFormat(date));
    setValidReservas(filterReservasByTime(date, reservas));
    // NOTE: Okay this is ugly and we need to adjust later
    setTablesTaken(getTablesTaken(filterReservasByTime(date, reservas)));
  }

  return (
    <UserWrapper>
      <h1 className="title">Dashboard</h1>
      <h3 className="today-subtitle">{dateFormat}</h3>
      <div className="tables-dashboard">
        {tables.map((table) => {
          if (tablesTaken.includes(table)) {
            return (
              <div
                key={table}
                className={`single-table table--${table} table-taken`}
              ></div>
            );
          } else {
            return (
              <div
                key={table}
                className={`single-table table--${table} table-available`}
              ></div>
            );
          }
        })}
      </div>

      <h3 className="title-legenda">Legenda:</h3>
      <div className="legenda">
        <div className="available-container">
          <div className="available-div"></div>
          <p>Disponível</p>
        </div>
        <div className="unavailable-container">
          <div className="unavailable-div"></div>
          <p>Ocupado</p>
        </div>
      </div>
      <div className="dates-container">
        {initialDateFormat === dateFormat ? (
          <button
            data-date={oneHourLater}
            className="single-date"
            onClick={handleClick}
          >
            {getDateFormat(oneHourLater)}
          </button>
        ) : (
          <button
            data-date={initialDate}
            className="single-date"
            onClick={handleClick}
          >
            {getDateFormat(initialDate)}
          </button>
        )}
        <button
          data-date={twoHoursLater}
          className="single-date"
          onClick={handleClick}
        >
          {getDateFormat(twoHoursLater)}
        </button>
        <button
          data-date={threeHoursLater}
          className="single-date"
          onClick={handleClick}
        >
          {getDateFormat(threeHoursLater)}
        </button>
        <button
          data-date={nextOneDayDate}
          onClick={handleClick}
          className="single-date"
        >
          {getDateFormat(nextOneDayDate)}
        </button>
        <button
          data-date={nextTwoDaysDate}
          onClick={handleClick}
          className="single-date"
        >
          {getDateFormat(nextTwoDaysDate)}
        </button>
        <button
          data-date={nextThreeDaysDate}
          onClick={handleClick}
          className="single-date"
        >
          {getDateFormat(nextThreeDaysDate)}
        </button>
      </div>
      <button className="btn">Reservar</button>
    </UserWrapper>
  );
}

export default User;
