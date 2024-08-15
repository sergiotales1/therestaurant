import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaLongArrowAltRight } from "react-icons/fa";

const Section2Wrapper = styled.section`
  width: 100vw;
  height: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .section2-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.7rem;
    margin-bottom: 2rem;
  }

  .subtitle {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 1rem 0;
  }

  .section2-text {
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 1rem;
    transform: translateX(200px);
    opacity: 0;
    transition: all 0.7s ease-in-out;
  }

  .title {
    padding: 0;
    margin: 0.3rem 0 1.5rem 0;
    letter-spacing: 1px;
  }
  .text {
    margin-bottom: 1.5rem;
  }
  .btn {
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

  .img-container {
    width: 300px;
    transform: translateX(-200px);
    opacity: 0;
    transition: all 0.7s ease-in-out;

    img {
      width: 100%;
    }
  }

  .show-img,
  .show-text {
    transform: translateX(0px);
    opacity: 1;
  }

  @media (min-width: 800px) {
    width: 100vw;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 6rem 0;

    .subtitle {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
    }

    .section2-content {
      display: grid;
      grid-template-columns: 600px 700px;
      place-items: center;
      gap: 0;
      margin-top: -6rem;
      padding-right: 5rem;
    }

    .section2-text {
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      padding: 2rem;
      box-shadow: -4px 8px 10px rgba(0, 0, 0, 0.5);
    }

    .title {
      padding: 0;
      margin: 0.3rem 0 1.5rem 0;
      letter-spacing: 1px;
      font-size: 3rem;
    }
    .text {
      font-size: 1.4rem;
      padding-left: 5rem;
    }
    .btn {
      color: var(--primary-bg-white);
      border: 2px solid var(--primary-bg-white);
      background-color: transparent;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 1.5rem;
      margin-left: 5rem;
    }

    .img-container {
      width: 100%;
      margin-top: 250px;
      margin-right: -200px;
      z-index: 1;

      img {
        width: 100%;
      }
    }

    .content-2 {
      grid-template-columns: 700px 600px;
      padding-right: 0;
      padding-left: 7rem;
      .section2-text {
        grid-column: 1;
        grid-row: 1;
        text-align: end;
        display: flex;
        flex-direction: column;
        transform: translateX(-200px);
        opacity: 0;
      }

      .text {
        font-size: 1.4rem;
        padding-left: 0rem;
        padding-right: 3rem;
      }

      .btn {
        margin-left: 0;
        margin-right: 3rem;
        align-self: end;
      }
      .img-container {
        grid-column: 2;
        margin-right: 0;
        margin-left: -160px;
        transform: translateX(200px);
        opacity: 0;
      }
    }
  }
  .content-2 .img-container.show-img,
  .content-2 .section2-text.show-text {
    transform: translateX(0px);
    opacity: 1;
  }
`;

function Section2() {
  const [content1InView, setContent1InView] = useState(false);
  const [content2InView, setContent2InView] = useState(false);
  const content1ImgRef = useRef(null);
  const content2ImgRef = useRef(null);
  const content1TextRef = useRef(null);
  const content2TextRef = useRef(null);

  useEffect(() => {
    function myIntersectionCb1([entry]) {
      if (entry.isIntersecting) {
        setContent1InView(true);
      }
    }

    let options = {
      root: null,
      threshold: 0.1,
    };

    const imgObserver1 = new IntersectionObserver(myIntersectionCb1, options);
    imgObserver1.observe(content1ImgRef.current);

    if (content1ImgRef.current) {
      imgObserver1.observe(content1ImgRef.current);
    }

    function myIntersectionCb2([entry]) {
      if (entry.isIntersecting) {
        setContent2InView(true);
      }
    }

    let options2 = {
      root: null,
      threshold: 0.1,
    };

    const imgObserver2 = new IntersectionObserver(myIntersectionCb2, options2);
    imgObserver2.observe(content2ImgRef.current);

    if (content2ImgRef.current) {
      imgObserver2.observe(content2ImgRef.current);
    }

    return () => {
      if (content1ImgRef.current) {
        imgObserver1.unobserve(content1ImgRef.current);
        if (content2ImgRef.current) {
        }
        imgObserver2.unobserve(content2ImgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (content1InView) {
      content1ImgRef.current.classList.add("show-img");
      content1TextRef.current.classList.add("show-text");
    }
    if (content2InView) {
      content2ImgRef.current.classList.add("show-img");
      content2TextRef.current.classList.add("show-text");
    }
  }, [content1InView, content2InView]);

  return (
    <Section2Wrapper>
      <h3 className="subtitle">Destaques</h3>
      <div className="section2-content content-1">
        <div className="img-container" ref={content1ImgRef}>
          <img src="/landing-rsc/lasanha.png" alt="lasanha photo" />
        </div>
        <div className="section2-text" ref={content1TextRef}>
          <h1 className="title">Lasanha Alla Bolognese</h1>
          <p className="text">
            Lasanha clássica feita com camadas de massa fresca, molho à
            bolonhesa rico e saboroso. Cada camada é cozida à perfeição,
            resultando em um prato que derrete na boca, trazendo o sabor
            autêntico da culinária italiana.
          </p>
          <button className="btn">
            Ver menu <FaLongArrowAltRight className="hero-btn-icon" />
          </button>
        </div>
      </div>
      <div className="section2-content content-2">
        <div className="img-container" ref={content2ImgRef}>
          <img src="/landing-rsc/peixe.png" alt="lasanha photo" />
        </div>
        <div className="section2-text" ref={content2TextRef}>
          <h1 className="title">Peixe Frito com Limão</h1>
          <p className="text">
            Filé de peixe branco empanado em uma crosta crocante e dourada,
            servido com fatias de limão fresco e uma seleção de ervas
            aromáticas. Um prato simples, mas elegante, que destaca a frescura e
            o sabor natural do peixe.
          </p>
          <button className="btn">
            Ver menu <FaLongArrowAltRight className="hero-btn-icon" />
          </button>
        </div>
      </div>
    </Section2Wrapper>
  );
}

export default Section2;
