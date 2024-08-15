import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Section1Wrapper = styled.section`
  width: 100vw;
  height: 85vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .subtitle {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 0rem 0 2rem 0;
  }

  .section1-img-container {
    display: none;
  }

  .section1-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .section1-text {
    padding: 0 1rem;
  }

  .section1-over-title {
    font-style: italic;
    font-size: 1.2rem;
  }

  .section1-title {
    text-transform: uppercase;
    font-family: "Anton";
    padding: 0;
    margin: 0.3rem 0 1.5rem 0;
    letter-spacing: 1px;

    span {
      text-decoration: underline;
      text-decoration-color: var(--secondary-green);
      transition: all 0.7s ease-in-out;
      font-family: "Anton";
      color: var(--secondary-green);
    }
  }

  .section1-under-title {
    font-weight: 500;
    font-size: 1.2rem;
  }

  .icons-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2rem;

    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      font-size: 1.2rem;
      place-items: center;
      text-transform: capitalize;
    }

    p:first-of-type {
      grid-column: 2;
      font-size: 2.3rem;
    }

    img {
      width: 50px;
      grid-row: 1 / 3;
    }

    .desde-number {
      img {
        width: 65px;
      }

      p:first-of-type {
        width: 80px;
      }
    }
  }

  .section1-btn {
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 0.7rem;
    margin-top: 2rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }

  @media (min-width: 800px) {
    width: 100vw;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .subtitle {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
      margin: 2rem 0 3rem 0;
    }

    .section1-content {
      padding: 0 2vw;
      display: grid;
      place-items: center;
      grid-template-columns: 500px 600px;
      gap: 3rem;
    }

    .section1-img-container {
      display: flex;
      align-items: center;
      justify-content: center;

      transform: translateY(200px);
      opacity: 0;
      transition: all 0.7s ease-in-out;
      img {
        width: 100%;
      }
    }

    .section1-text {
      padding: 0 1rem;
      display: flex;
      flex-direction: column;
    }

    .section1-over-title {
      font-style: italic;
      font-size: 1.7rem;
    }

    .section1-title {
      text-transform: uppercase;
      font-size: 4rem;
      font-family: "Anton";
      padding: 0;
      margin: 0.5rem 0 2.8rem 0;
      letter-spacing: 1px;

      span {
        text-decoration-color: transparent;
        font-family: "Anton";
        color: var(--secondary-green);
      }
    }

    .section1-under-title {
      font-weight: 500;
      font-size: 1.5rem;
    }

    .icons-section {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 3rem;

      div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        font-size: 1.5rem;
        place-items: center;
        text-transform: capitalize;
        gap: 0 1rem;
      }

      p:first-of-type {
        grid-column: 2;
        font-size: 2.3rem;
      }

      img {
        width: 70px;
        grid-row: 1 / 3;
      }

      .desde-number {
        img {
          width: 85px;
        }

        p:first-of-type {
          width: 80px;
        }
      }
    }

    .section1-btn {
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

    .section1-btn:hover {
      background-color: transparent;
      color: var(--secondary-green);
      border: 2px solid var(--secondary-green);
    }

    .show-img {
      transform: translateY(0);
      opacity: 1;
    }

    span.put-underline {
      text-decoration-color: var(--secondary-green);
    }
  }
`;

function Section1() {
  const [plates, setPlates] = useState(0);
  const [years, setYears] = useState(0);
  const [inView, setInView] = useState(false);
  const [imgInView, setImgInView] = useState(false);
  const numberRef = useRef(null);
  const imgRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    //NOTE: plates - time observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.1 }, // Adjust the threshold as needed
    );

    function myIntersectionCb([entry]) {
      if (entry.isIntersecting) {
        setImgInView(true);
      }
    }

    let options = {
      root: null,
      threshold: 0.1,
    };

    const imgObserver = new IntersectionObserver(myIntersectionCb, options);
    imgObserver.observe(imgRef.current);

    if (numberRef.current) {
      observer.observe(numberRef.current);
    }

    return () => {
      if (numberRef.current) {
        observer.unobserve(numberRef.current);
        imgObserver.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (imgInView) {
      imgRef.current.classList.add("show-img");
      spanRef.current.classList.add("put-underline");
    }
  }, [imgInView]);

  useEffect(() => {
    if (inView && plates < 20) {
      const timer = setTimeout(() => {
        setPlates((prevNumber) => prevNumber + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!inView && plates > 0) {
      setPlates(0); // Reset number if the component leaves the viewport
    }
  }, [inView, plates]);
  useEffect(() => {
    if (inView && years < 1979) {
      const timer = setTimeout(() => {
        setYears((prevNumber) => {
          if (prevNumber === 1950) return prevNumber + 29;
          return prevNumber + 30;
        });
      }, 40);
      return () => clearTimeout(timer);
    } else if (!inView && years > 0) {
      setYears(0); // Reset number if the component leaves the viewport
    }
  }, [inView, years]);
  return (
    <Section1Wrapper>
      <h3 className="subtitle">Venha Conhecer</h3>
      <div className="section1-content">
        <div ref={imgRef} className="section1-img-container">
          <img
            src="/landing-rsc/section1-img.png"
            alt="woman opening a restaurant"
          />
        </div>
        <div className="section1-text">
          <p className="section1-over-title">The Restaurant</p>
          <h1 className="section1-title">
            Sabores que contam <span ref={spanRef}>histórias</span>
          </h1>
          <p className="section1-under-title">
            No nosso restaurante, cada prato é uma jornada pelos sabores
            autênticos e inesquecíveis que trazem à tona memórias e emoções.
          </p>

          <div className="icons-section">
            <div className="pratos-number">
              <img
                src="/landing-rsc/section1-utensils.png"
                alt="utensils icon"
              />
              <p ref={numberRef}>{plates}</p>
              <p>pratos</p>
            </div>
            <div className="desde-number">
              <img src="/landing-rsc/section1-clock.png" alt="clock icon" />
              <p>{years}</p>
              <p>desde</p>
            </div>
          </div>

          <button className="section1-btn">Saiba Mais</button>
        </div>
      </div>
    </Section1Wrapper>
  );
}

export default Section1;
