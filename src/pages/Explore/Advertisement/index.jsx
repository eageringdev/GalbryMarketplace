import React from "react";
import "./index.scss";

// import carousel
import { Carousel } from "react-responsive-carousel";

const imagePath = [
  window.origin + "/advertisement/carousel/image_0.png",
  window.origin + "/advertisement/carousel/image_1.png",
  window.origin + "/advertisement/carousel/image_2.png",
];

const Advertisement = () => {
  return (
    <div className="explore_advertisement">
      <Carousel
        autoPlay={true}
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        showArrows={false}
      >
        {imagePath.map((path) => (
          <div key={"carouseImage_" + path} className="carousel_item m-0">
            <div className="carousel_item_description col-12 col-md-8 d-flex">
              <div className="col-2"></div>
              <div className="col-10">
                <div className="title">
                  {"Lorem ipsum dolor sit amet\n consectetur"}
                </div>
                <div className="description">Ut enim ad minim veniam</div>
              </div>
            </div>
            <div className="col d-none d-md-block h-100 pt-3 pb-3">
              <img
                className="h-100 advertisement_image"
                alt="advertisement_image"
                src={path}
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Advertisement;
