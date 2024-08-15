import React from "react";
import styled from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-green);
  padding: 2rem 2vw 0 2vw;
  gap: 1rem;
  color: white;

  .address {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .icon {
      font-size: 2.5rem;
    }
    display: flex;
    font-size: 1rem;
  }

  .schedule {
    h4 {
      font-size: 1.2rem;
    }
  }

  .socials {
    font-size: 3rem;
    cursor: pointer;
  }

  @media (min-width: 800px) {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(4, 1fr);
    background-color: var(--primary-green);
    padding: 3rem 2vw;
    gap: 6rem;
    color: white;

    .address {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .icon {
        font-size: 3.5rem;
      }
      display: flex;
      font-size: 1rem;
    }

    .schedule {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h4 {
        font-size: 1.2rem;
      }
    }

    .socials {
      font-size: 3.5rem;
      cursor: pointer;
    }
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="address">
        <IoLocationSharp className="icon" />
        <p>Rua das Flores, 123 - Bairro Centro, São Paulo, SP</p>
      </div>
      <div className="schedule">
        <h4>Funcionamento:</h4>
        <p>Segunda a Sexta: 12h00 às 22h00</p>
        <p>Sábado e Domingo: 12h00 às 23h00</p>
        <br />
      </div>
      <div className="socials">
        <FaWhatsapp />
        <FaInstagram />
      </div>
    </FooterWrapper>
  );
}

export default Footer;
