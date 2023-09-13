import { Link } from "react-router-dom";
import MovieListItem from "../movieListItem/MovieListItem";
import "./movieLists.scss";
import "./responsive.scss";

const MovieLists = ({ movies }) => {
  let { data } = movies;

  if (Array.isArray(data)) data = data.filter((movie, index) => index < 12);

  return (
    <div className="movieList">
      <div className="movieListTitle">
        <h3>{movies.name}</h3>
        <Link to={`lists/${movies.path}?page=1`} className="link linkList">
          Xem tất cả
        </Link>
      </div>

      <div className="movieListItems">
        {typeof data !== "undefined" &&
          data?.map((movie, index) => (
            <MovieListItem movie={movie} key={index} />
          ))}
      </div>
    </div>
  );
};

export default MovieLists;
