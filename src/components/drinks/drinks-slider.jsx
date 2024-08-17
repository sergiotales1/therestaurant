import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";

const SliderWrapper = styled.section`
  text-align: center;
  margin: 3rem 0 6rem 0;
  .subtitle {
    border: 3px solid var(--secondary-green);
    padding: 0.4rem;
    font-weight: 600;
    color: var(--secondary-green);
    font-size: 1rem;
    border-radius: 25px;
    margin: 0rem 0 2rem 0;
    display: inline;
  }

  .slider-container {
    width: 210px;
    height: auto;
    margin: 3rem auto;
  }
  div.slick-slide {
    width: 250px;
    height: auto;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    border-radius: 20px;
  }

  .slick-arrow.slick-next::before,
  .slick-arrow.slick-prev::before {
    color: black;
    font-size: 3rem;
  }
  .slick-arrow.slick-prev::before {
    position: relative;
    right: 30px;
  }
  .slick-dots li button:before {
    content: "-";
    font-size: 4.5rem;
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
  .name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-top: 1rem;
  }
  @media (min-width: 800px) {
    text-align: center;
    margin: 6rem 0 8rem 0;

    .subtitle {
      border: 3px solid var(--secondary-green);
      padding: 0.8rem;
      font-weight: 600;
      color: var(--secondary-green);
      font-size: 1.3rem;
      border-radius: 25px;
      margin: 2rem 0 3rem 0;
    }

    .slider-container {
      width: 1210px;
      height: auto;
      margin: 0 auto;
      padding-bottom: 1rem;
    }
    div.slick-slide {
      width: 250px;
      height: auto;
      padding: 0 2rem;
      margin-top: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      border-radius: 20px;
    }

    .slick-arrow.slick-next::before,
    .slick-arrow.slick-prev::before {
      color: black;
      font-size: 4rem;
    }
    .slick-arrow.slick-prev::before {
      position: relative;
      right: 40px;
    }
    .slick-dots li button:before {
      display: none;
      content: "-";
    }
    .btn {
      background-color: var(--secondary-green);
      color: var(--primary-bg-white);
      margin-top: 1rem;
      padding: 0.9rem;
      border-radius: 10px;
      align-self: center;
      border: 2px solid var(--secondary-green);
      font-size: 1.4rem;
      transition: all 0.3s ease-in-out;
    }
    .name {
      font-size: 1.4rem;
    }
  }
`;

function Responsive({ drinks }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <SliderWrapper>
      <h3 className="subtitle">Top Drinks</h3>
      <div className="slider-container">
        <Slider {...settings}>
          {drinks.map((drink) => {
            return (
              <div className="drink-img-container" key={drink.id}>
                <img src={drink.img} alt={drink.name} className="drink-img" />
                <p className="name">{drink.name}</p>
              </div>
            );
          })}
        </Slider>
      </div>
      <Link to={"/reserva"}>
        <button className="btn">Reserva</button>
      </Link>
    </SliderWrapper>
  );
}

export default Responsive;
