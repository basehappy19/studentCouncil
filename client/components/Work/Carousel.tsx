'use client'
import Image from "next/image";
import { WorkImages } from "@/app/interfaces/Work/Work";
import '@splidejs/react-splide/css';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Carousel = ({ images }: { images: WorkImages[] }) => {
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
              priority
              className="object-cover object-center"
              fill
              src={process.env.NEXT_PUBLIC_WORK_IMG_PATH + image.path}
              alt={`carousel-image-${index}`}
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Carousel;