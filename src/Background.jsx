import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";

// Import Swiper styles
import "swiper/css";

export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 60000, disableOnInteraction: false }}
        style={{ width: "100%", height: "100%" }}>
        <SwiperSlide>
          <img
            src="src/Image/heavy-rain-4864257_1920.jpg"
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="src/Image/nature-6821966_1920.jpg"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="src/Image/sea-9714469_1920.jpg"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="src/Image/slide1.jpg"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="src/Image/slide1.jpg"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
