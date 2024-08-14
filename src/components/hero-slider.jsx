import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const SliderWrapper = styled.div`
  .slider-container {
    background: url("/hero-assets/hero-frame.png");
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
      background: url("/hero-assets/hero-frame.png");
      background-size: contain;

      width: 250px;
      height: 200px;
    }

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
`;

export function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    // autoplay: true,
    // autoplaySpeed: 3000,
  };
  return (
    <SliderWrapper>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src="/hero-assets/hero-image1.png"></img>
          </div>
          <div>
            <img src="/hero-assets/hero-image2.png"></img>
          </div>
          <div>
            <img src="/hero-assets/hero-image3.png"></img>
          </div>
        </Slider>
      </div>
    </SliderWrapper>
  );
}

export default SimpleSlider;
