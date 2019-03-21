import React from "react";
import Slider from "react-slick";
import slide1 from "../../../Resources/images/featured/slide1.jpg";
import slide2 from "../../../Resources/images/featured/slide2.png";
import slide3 from "../../../Resources/images/featured/slide3.png";
import slide4 from "../../../Resources/images/featured/slide4.png";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    arrows: false
  };

  return (
    <div
      className="featured_container"
      style={{
        background: "gray",
        overflow: "hidden"
      }}
    >
      <Slider {...settings}>
        <div>
          <div
            className="featured_image"
            style={{
              background: `url(${slide3})`,
              height: `${window.innerHeight}px`
            }}
          >
            <div className="featured_action">
              <div className="tag">
                <div className="title">APPLE</div>
                <div className="low_title">Great Selection</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="featured_image"
            style={{
              background: `url(${slide2})`,
              height: `${window.innerHeight}px`
            }}
          >
            <div className="featured_action">
              <div className="tag">
                <div className="title">HTC</div>
                <div className="low_title">Great Selection</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="featured_image"
            style={{
              background: `url(${slide4})`,
              height: `${window.innerHeight}px`
            }}
          >
            <div className="featured_action">
              <div className="tag">
                <div className="title">HTC</div>
                <div className="low_title">Great Selection</div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
