import "./movieListItem.scss";
import "./responsive.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MovieListItem = ({ movie }) => {
  const singleMovie = movie;

  const slug = singleMovie?.slug;
  const urlImg = `https://img.ophim.cc/uploads/movies/${slug}-thumb.jpg`;

  return (
    <Link to={`/watch/${slug}/1`} className="movieListItem link">
      <div className="movieListItemPoster">
        <img src={urlImg} alt="" />
      </div>

      <div className="movieListItemName">
        <span>{singleMovie?.name}</span>
      </div>
    </Link>
  );
};

export default MovieListItem;
