'use client'
import { useState, useEffect } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WorkImages } from "@/app/interfaces/Work/Work";

const Carousel = ({ images }: { images: WorkImages[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const workImgSrc = process.env.NEXT_PUBLIC_WORK_IMG_PATH || "";

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const handleNext = () => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating || images.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleDotClick = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl group">
      {/* Main Image */}
      <div className="relative w-full h-full">
        <div
          className={`absolute w-full h-full transition-transform duration-500 ease-out ${
            isAnimating ? 'transform scale-95 opacity-90' : 'scale-100'
          }`}
        >
          <Image
            src={workImgSrc + images[currentIndex].path}
            alt={`carousel-image-${currentIndex}`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </Button>
        </>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-4'
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-white/60 transition-all duration-1000 ease-linear"
            style={{
              width: '100%',
              transform: `scaleX(${isAnimating ? 0 : 1})`,
              transformOrigin: 'left',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Carousel;