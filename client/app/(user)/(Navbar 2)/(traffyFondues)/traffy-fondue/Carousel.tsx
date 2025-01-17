'use client'
import Image from "next/image";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { ReportedImage } from "@/app/interfaces/TraffyFondue/Location";

const Carousel = ({ images }: { images: ReportedImage[] }) => {
  return (
    <Splide
      options={{
        keyboard: true,
        type: 'loop',
        autoplay: true,
      }}
      aria-label="My Favorite Images">
      {images.map((image, index) => (
        <SplideSlide key={image.id}>
          <div className="relative w-full h-64">
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_REPORT_PATH}${image.path}`}
              alt={image.path}
              className="w-full h-full object-cover  object-center"
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Carousel;