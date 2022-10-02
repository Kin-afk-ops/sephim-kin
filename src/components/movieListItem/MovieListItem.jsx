import "./movieListItem.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieListItem = (movie) => {
  const [isMovie, setIsMovie] = useState(false);
  const singleMovie = movie.movie;

  const urlImg = "https://img.ophim.cc/uploads/movies/";
  const slug = singleMovie?.slug;

  return (
    <Link to={`/watch/${slug}/1`} className="movieListItem link">
      <div className="movieListItemPoster">
        <img
          src={
            singleMovie?.poster_url
              ? urlImg + singleMovie?.poster_url
              : urlImg + singleMovie?.thumb_url
          }
          alt=""
        />
        {isMovie && <div>30/30</div>}
      </div>

      <div className="movieListItemName">{singleMovie?.name}</div>
    </Link>
  );
};

export default MovieListItem;
