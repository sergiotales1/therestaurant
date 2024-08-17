import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import heroFrame from "../../assets/hero-assets/hero-frame.png";
import heroImg1 from "../../assets/hero-assets/hero-image1.png";
import heroImg2 from "../../assets/hero-assets/hero-image2.png";
import heroImg3 from "../../assets/hero-assets/hero-image3.png";

const SliderWrapper = styled.div`
  .slider-container {
    background: url(${heroFrame});
    background-size: contain;

    width: 250px;
    height: 200px;
    div.slick-slide {
      width: 250px;
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 200px;
    }

    .slick-dots {
      bottom: 20px;
    }
    .slick-dots li button:before {
      content: "-";
      color: white;
      font-size: 4.5rem;
    }

    .slick-arrow.slick-next::before,
    .slick-arrow.slick-prev::before {
      display: none;
    }
  }

  @media (min-width: 800px) {
    .slider-container {
      background: url(${heroFrame});
      background-size: cover;

      width: 660px;
      height: 530px;
      padding: 0 50px;
      div.slick-slide {
        width: 650px;
        height: 530px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      img {
        width: 500px;
      }

      .slick-dots {
        bottom: 50px;
      }
      .slick-dots li button:before {
        content: "-";
        color: white;
        font-size: 4.5rem;
      }

      .slick-arrow.slick-next::before,
      .slick-arrow.slick-prev::before {
        display: none;
      }
    }
  }
`;

export function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,

    autoplay: true,
    autoplaySpeed: 4500,
  };
  return (
    <SliderWrapper>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={heroImg1}></img>
          </div>
          <div>
            <img src={heroImg2}></img>
          </div>
          <div>
            <img src={heroImg3}></img>
          </div>
        </Slider>
      </div>
    </SliderWrapper>
  );
}

export default SimpleSlider;
