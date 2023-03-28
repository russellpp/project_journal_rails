import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OptionSlider = (props) => {
  const { view, setView } = props;
  const options = ["Today", "Tasks", "Categories", "Category", "Calendar"];

  const handleOptionClick = (index) => {
    setView(options[index]);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      handleOptionClick(next);
    },
    prevArrow: <ArrowButton direction="left">{"<"}</ArrowButton>,
    nextArrow: <ArrowButton direction="right">{">"}</ArrowButton>,
  };

  return (
    <SliderContainer>
      <h3>Selected option: {view}</h3>
      <Slider {...sliderSettings}>
        {options.map((option, index) => (
          <div key={index}>
            <button>{option}</button>
          </div>
        ))}
      </Slider>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  width: 700px;
  margin: 0 auto;
  overflow-x: visible;

  .slick-slide {
    margin: 0 20px;
  }

  .slick-center {
    transform: scale(1.2);
  }

  .slick-dots li button:before {
    font-size: 12px;
    color: #fff;
    opacity: 0.5;
  }

  .slick-dots li.slick-active button:before {
    opacity: 1;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }

  &::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    border-style: solid;
    border-width: 0 2px 2px 0;
    transform: ${(props) =>
      props.direction === "left" ? "rotate(135deg)" : "rotate(-45deg)"};
    margin: auto;
  }
`;

export default OptionSlider;
