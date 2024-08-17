import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mainImg from "../assets/sobre-rsc/main-img.png";
import miniImg from "../assets/sobre-rsc/mini-restaurant.png";
import groupImg from "../assets/sobre-rsc/image-group.png";

const SobreWrapper = styled.section`
  padding: 8rem 2vw 3rem 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .subtitle {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 0rem 0 1.5rem 0;
    display: inline;
  }
  .sobre-content {
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

  .sobre-text {
    display: flex;
    flex-direction: column;
    background-color: var(--secondary-green);
    color: var(--primary-bg-white);
    padding: 1rem;
    transform: translateX(200px);
    opacity: 0;
    transition: all 0.7s ease-in-out;
    .subtitle {
      align-self: center;
      border: 3px solid var(--primary-bg-white);
      padding: 0.4rem;
      font-weight: 600;
      color: var(--primary-bg-white);
      font-size: 1rem;
      border-radius: 25px;
      margin: 0rem 0 1.5rem 0;
      display: inline;
    }
  }

  .title {
    font-style: italic;
    padding: 0;
    margin: 0.3rem 0 1.5rem 0;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .text {
    margin-bottom: 1.5rem;
  }

  .absolute-img {
    display: none;
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

    .subtitle {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
    }

    .sobre-content {
      display: grid;
      grid-template-columns: 600px 700px;
      place-items: center;
      gap: 0;
      padding-right: 5rem;
    }

    .sobre-text {
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      padding: 2rem;
      box-shadow: -4px 8px 10px rgba(0, 0, 0, 0.5);
      z-index: 1;
    }

    .title {
      padding: 0;
      margin: 0.3rem 0 1.5rem 0;
      letter-spacing: 1px;
      font-size: 3rem;
    }
    .text {
      font-size: 1.4rem;
    }

    .content-1 {
      position: relative;
    }

    .absolute-img {
      position: absolute;
      display: flex;
      justify-content: flex-end;

      width: 200px;
      top: 0;
      right: 0;
      transform: translateX(200px);
      opacity: 0;
      transition: all 0.7s ease-in-out;
    }
    .img-container {
      margin-top: 2rem;

      width: 100%;
      margin-right: -200px;
      img {
        max-height: 700px;
        width: 100%;
      }
    }

    .content-2 {
      grid-template-columns: 700px 600px;
      padding-right: 0;
      padding-left: 7rem;
      .sobre-text {
        width: 100%;
        height: 100%;
        max-height: 400px;
        grid-column: 1;
        grid-row: 1;
        text-align: end;
        display: flex;
        flex-direction: column;
        transform: translateX(-200px);
        opacity: 0;
        padding: 4rem;
        .subtitle {
          align-self: center;
          border: 3px solid var(--primary-bg-white);
          padding: 0.4rem;
          font-weight: 600;
          color: var(--primary-bg-white);
          font-size: 1.3rem;
          border-radius: 25px;
          margin: -2rem 0 1rem 0;
          display: inline;
        }
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

  .content-1 .absolute-img.show-img,
  .content-2 .img-container.show-img,
  .content-2 .sobre-text.show-text {
    transform: translateX(0px);
    opacity: 1;
  }
`;

function Sobre() {
  const [content1InView, setContent1InView] = useState(false);
  const [content2InView, setContent2InView] = useState(false);
  const content1ImgRef = useRef(null);
  const content1TextRef = useRef(null);
  const content2ImgRef = useRef(null);
  const content2TextRef = useRef(null);
  const content1MiniRef = useRef(null);

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

    if (content2ImgRef.current) {
      imgObserver2.observe(content2ImgRef.current);
    }

    return () => {
      if (content1ImgRef.current) {
        imgObserver1.unobserve(content1ImgRef.current);
      }
      if (content2ImgRef.current) {
        imgObserver2.unobserve(content2ImgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (content1InView) {
      content1ImgRef.current.classList.add("show-img");
      content1TextRef.current.classList.add("show-text");
      content1MiniRef.current.classList.add("show-img");
    }
    if (content2InView) {
      content2ImgRef.current.classList.add("show-img");
      content2TextRef.current.classList.add("show-text");
    }
  }, [content1InView, content2InView]);
  return (
    <SobreWrapper>
      <h3 className="subtitle">Sobre nós</h3>
      <div className="sobre-content content-1">
        <div className="absolute-img" ref={content1MiniRef}>
          <img src={miniImg} alt="restaurant photo" />
        </div>
        <div className="img-container" ref={content1ImgRef}>
          <img src={mainImg} alt="restaurant photo" />
        </div>
        <div className="sobre-text" ref={content1TextRef}>
          <h1 className="title">The Restaurant -</h1>
          <p className="text">
            Desde 1979, o Restaurant tem sido um refúgio para os amantes da boa
            gastronomia. Com mais de 20 pratos em nosso cardápio, cada um criado
            com cuidado e tradição, oferecemos uma experiência culinária que
            celebra os sabores autênticos e as receitas que passaram de geração
            em geração. Nosso compromisso com a qualidade e a excelência nos
            tornou um dos destinos favoritos para aqueles que buscam refeições
            inesquecíveis em um ambiente acolhedor e familiar. Venha descobrir
            porque somos um ícone na arte de bem servir há décadas!
          </p>
        </div>
      </div>
      <div className="sobre-content content-2">
        <div className="img-container" ref={content2ImgRef}>
          <img src={groupImg} alt="restaurant photos" />
        </div>
        <div className="sobre-text" ref={content2TextRef}>
          <h3 className="subtitle">Onde Estamos</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d42010.60290131493!2d2.3119352327555567!3d48.84557255090852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e270915852f%3A0x868605f9dde4ff64!2sLe%20Calife!5e0!3m2!1sen!2sbr!4v1723928589276!5m2!1sen!2sbr"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </SobreWrapper>
  );
}

export default Sobre;
