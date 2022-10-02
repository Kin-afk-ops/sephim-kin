import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import MovieListItem from "../movieListItem/MovieListItem";
import "./movieLists.scss";

const MovieLists = ({ movies }) => {
  if (Array.isArray(movies.items))
    movies = movies.items.filter((movie, index) => index < 12);

  return (
    <div className="movieList">
      <div className="movieListTitle">
        <h3>Phim mới cập nhật</h3>
        <Link to="/lists" className="link linkList">
          Xem tất cả
        </Link>
      </div>

      <div className="movieListItems">
        {movies.map((movie, index) => (
          <MovieListItem movie={movie} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MovieLists;
