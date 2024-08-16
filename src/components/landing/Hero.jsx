import styled from "styled-components";
import SimpleSlider from "./hero-slider";
import { FaLongArrowAltRight } from "react-icons/fa";

const HeroWrapper = styled.section`
  width: 100vw;
  height: 100vh;

  background: url("/hero-assets/hero-bg.png");
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;

  .hero-content {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .hero-text {
    color: var(--primary-bg-white);
    padding: 1rem;
  }

  .hero-over-title {
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  .hero-title {
    padding: 0;
    margin: 0.3rem 0 1rem 0;
    font-weight: 500;
    font-size: 2.2rem;
    text-transform: uppercase;
  }

  .hero-under-title {
    padding-bottom: 1rem;
  }

  .hero-btn {
    color: var(--primary-bg-white);
    border: 2px solid var(--primary-bg-white);
    background-color: transparent;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    font-size: 1.5rem;
  }

  .hero-btn-icon {
    font-size: 2.5rem;
  }

  @media (min-width: 800px) {
    width: 100vw;
    height: 100vh;

    background: url("/hero-assets/hero-bg.png");
    background-size: cover;
    background-position: center;

    .hero-content {
      display: grid;
      place-items: center;
      grid-template-columns: 600px 1fr;
      margin-top: 4rem;
      max-width: 1500px;
      gap: 6rem;
    }

    .hero-text {
      grid-column: 1;
      grid-row: 1;
      color: var(--primary-bg-white);
      padding: 1rem;
    }

    .hero-over-title {
      text-transform: uppercase;
      font-size: 1.2rem;
    }

    .hero-title {
      padding: 0;
      margin: 0.6rem 0 2rem 0;
      font-weight: 500;
      font-size: 3.6rem;
      text-transform: uppercase;
    }

    .hero-under-title {
      padding-bottom: 2.4rem;
      font-size: 1.5rem;
    }

    .hero-btn {
      color: var(--primary-bg-white);
      border: 2px solid var(--primary-bg-white);
      cursor: pointer;
      background-color: transparent;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.5rem;
      transition: all 0.3s ease-in-out;
    }

    .hero-btn:hover {
      color: darkgray;
      border-color: darkgray;
    }

    .hero-btn-icon {
      font-size: 2.5rem;
    }
  }
`;
function Hero() {
  return (
    <HeroWrapper>
      <div className="hero-content">
        {/* NOTE: Slider being formatted using styled components as well! */}
        <SimpleSlider className="slider" />
        <div className="hero-text">
          <p className="hero-over-title">Sabores que encantam</p>
          <h1 className="hero-title">Prazer, somos o restaurant!</h1>
          <p className="hero-under-title">
            Venha descobrir sabores que contam histórias e deixe-se levar por
            uma verdadeira celebração culinária.
          </p>
          <button className="hero-btn">
            Ver menu <FaLongArrowAltRight className="hero-btn-icon" />
          </button>
        </div>
      </div>
    </HeroWrapper>
  );
}

export default Hero;
