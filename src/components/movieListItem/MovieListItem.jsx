import "./movieListItem.scss";
import "./responsive.scss";
import { Link } from "react-router-dom";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import tam from "../../assets/images/tam.jpg";

const MovieListItem = ({ movie }) => {
  const slug = movie?.slug;

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Link
      to={`/watch/${slug}/1`}
      className="movieListItem link"
      onClick={handleClick}
    >
      <div className="movieListItemPoster">
        <LazyLoadImage
          src={`https://img.ophim9.cc/uploads/movies/${slug}-thumb.jpg`}
          alt=""
          effect="blur"
          threshold="100"
          placeholderSrc={tam}
        />
      </div>

      <div className="movieListItemName">
        <span>{movie?.name}</span>
      </div>
    </Link>
  );
};

export default MovieListItem;
