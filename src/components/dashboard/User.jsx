import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  filterReservasByTime,
  getDashboardDates,
  getDateFormat,
  getTablesTaken,
} from "../../js/utils";
import { tables } from "../../js/data";
import background from "../../assets/Group-7.png";
import { Link } from "react-router-dom";

const UserWrapper = styled.section`
  padding: 8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  .title {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 0rem 0 2rem 0;
  }

  .today-subtitle {
    background-color: white;
    padding: 0.7rem;
    text-align: center;
    border-radius: 15px;
    border: 2px solid #ededed;
  }

  .tables-dashboard {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem 0.1rem;
    width: 100%;
    .single-table {
      background-image: url(${background});
      background-size: cover;
      width: 80%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .table-circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .table-taken .table-circle {
    background-color: #fbdadb;
    color: #f16c6e;
  }

  .table-available .table-circle {
    background-color: #adebb3;
    color: #39784d;
  }

  .title-legenda {
    padding: 0 1rem;
    align-self: flex-start;
  }

  .legenda {
    align-self: flex-start;
    margin: 0 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 1rem;
  }

  .available-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    .available-div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #39784d;
    }
  }
  .unavailable-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    .unavailable-div {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #f16c6e;
    }
  }

  .dates-container {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.3rem 0.7rem;
    margin: 2rem 0;

    .single-date {
      padding: 0.4rem 0.3rem;
      width: 100%;
      background-color: white;
      cursor: pointer;
      border: 1px solid #39784d;
      outline: transparent;
      border-radius: 25px;
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

  @media (min-width: 800px) {
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .title {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
      margin: 2rem 0 1rem 0;
    }

    .today-subtitle {
      background-color: white;
      padding: 1rem;
      text-align: center;
      font-size: 1.3rem;
      border-radius: 15px;
      border: 3px solid #ededed;
    }

    .tables-dashboard {
      margin-top: 1rem;
      display: grid;
      place-items: center;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem 2rem;
      .single-table {
        background-image: url(${background});
        background-size: cover;
        width: 150px;
        height: 192px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .table-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.7rem;
      font-weight: bold;
    }

    .table-taken .table-circle {
      background-color: #fbdadb;
      color: #f16c6e;
    }

    .table-available .table-circle {
      background-color: #adebb3;
      color: #39784d;
    }

    .title-legenda {
      margin-top: 0.5rem;
      font-size: 1.5rem;
      padding: 0 1rem;
      align-self: flex-start;
    }

    .legenda {
      align-self: flex-start;
      margin: 0 1rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      gap: 2rem;
    }

    .available-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      font-size: 1rem;
      .available-div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #39784d;
      }
    }
    .unavailable-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.9rem;
      font-size: 1rem;
      .unavailable-div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #f16c6e;
      }
    }

    .dates-container {
      display: grid;
      place-items: center;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
      margin: 2rem 0;

      .single-date {
        padding: 1rem 3rem;
        width: 100%;
        background-color: white;
        font-size: 1.4rem;
        cursor: pointer;
        border: 2px solid #39784d;
        outline: transparent;
        border-radius: 25px;
      }
    }
    .btn {
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      padding: 0.9rem;
      margin-top: 3rem;
      border-radius: 10px;
      align-self: center;
      border: 2px solid var(--secondary-green);
      font-size: 1.4rem;
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
  const [date, setDate] = useState(new Date());
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
  } = getDashboardDates({ reservas, date });

  const [dateFormat, setDateFormat] = useState(initialDateFormat);
  const [validReservas, setValidReservas] = useState(initialValidReservas);
  const [tablesTaken, setTablesTaken] = useState(InitialTablesTaken);

  console.log(date);
  function handleClick(e) {
    const date = new Date(e.target.dataset.date);
    setDate(date);
    setDateFormat(getDateFormat(date));
    setValidReservas(filterReservasByTime(date, reservas));
    // NOTE: Okay this is ugly and we need to adjust later
    setTablesTaken(getTablesTaken(filterReservasByTime(date, reservas)));
  }

  return (
    <UserWrapper>
      <h1 className="title">Confira nossas reservas do momento</h1>
      <h3 className="today-subtitle">{dateFormat}</h3>
      <div className="tables-dashboard">
        {tables.map((table) => {
          if (tablesTaken.includes(table)) {
            return (
              <div
                key={table}
                className={`single-table table--${table} table-taken`}
              >
                <div className="table-circle">
                  <p>{table}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div
                key={table}
                className={`single-table table--${table} table-available`}
              >
                <div className="table-circle">{table}</div>
              </div>
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
        {dateFormat === initialDateFormat ? (
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
      <Link to={"/reserva"} className="btn-link">
        <button className="btn">Reservar</button>
      </Link>
    </UserWrapper>
  );
}

export default User;
