// import Swiper core and required modules
import { Navigation, A11y, Controller } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/controller";

import { useState } from "react";
import "./singleMovieSimilar.scss";
import MovieListItem from "../movieListItem/MovieListItem";

const SingleMovieSimilar = () => {
  const [controlledSwiper, setControlledSwiper] = useState(null);
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, A11y, Controller]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      controller={{ control: controlledSwiper }}
    >
      <SwiperSlide>
        <MovieListItem />
      </SwiperSlide>

      <SwiperSlide>
        <MovieListItem />
      </SwiperSlide>

      <SwiperSlide>
        <MovieListItem />
      </SwiperSlide>

      <SwiperSlide>
        <MovieListItem />
      </SwiperSlide>

      <SwiperSlide>
        <MovieListItem />
      </SwiperSlide>
    </Swiper>
  );
};

export default SingleMovieSimilar;
