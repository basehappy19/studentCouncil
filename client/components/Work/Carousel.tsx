import Slider from "react-slick";
import Image from "next/image";
import { FC } from "react";
import { CarouselProps } from "@/app/interfaces/Props/Carousel";

const Carousel: FC<CarouselProps> = ({ workImgSrc, images }) => {
  let settings = {
    dots: true,
    infinite: images.length !== 1,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div className="carousel-item" key={index}>
          <Image
          className="w-full h-full max-h-[500px] object-cover object-center rounded-lg"
            width={1200}
            height={600}
            src={workImgSrc + image}
            alt={`carousel-image-${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
