import MovieListItem from "../../components/movieListItem/MovieListItem";
import axios from "axios";
import "./lists.scss";
import "./responsive.scss";
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import { useLocation } from "react-router-dom";

const Lists = () => {
  const [movies, setMovies] = useState([]);
  const [originName, setOriginName] = useState([]);
  const [name, setName] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage, setMoviesPerPage] = useState(24);
  const location = useLocation();

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const type = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[3];

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`/movie/${type}?q=${path}`);

      setMovies(res.data);
    };

    const fetchAnimeMovie = async () => {
      const res = await axios.get(`/movie/${type}?q=anime`);

      setMovies(res.data.filter((asd) => asd.categories.includes("movie")));
    };

    const fetchAnimeSeries = async () => {
      const res = await axios.get(`/movie/${type}?q=anime`);

      setMovies(res.data.filter((asd) => asd.categories.includes("series")));
    };

    const fetchAllMovie = async () => {
      const res = await axios.get("/movie");

      setMovies(res.data);
    };

    const fetchSearchMovie = async () => {
      const res = await axios.get(`/movie`);

      const keys = ["name", "origin_name"];

      setMovies(
        res.data.filter((item) =>
          keys.some((key) =>
            removeAccents(item[key].toLowerCase()).includes(removeAccents(path))
          )
        )
      );
    };

    if (type === "all") {
      fetchAllMovie();
    } else if (type === "search") {
      fetchSearchMovie();
    } else {
      fetchMovie();
    }

    if (path === "animeMovie") {
      fetchAnimeMovie();
    }

    if (path === "animeSeries") {
      fetchAnimeSeries();
    }
  }, [path, type]);

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <div className="lists">
      {movies.length === 0 ? (
        <Loading movies={movies} />
      ) : (
        <div className="movieListItems">
          {currentMovies.map((movie, index) => (
            <MovieListItem movie={movie} key={index} />
          ))}
        </div>
      )}

      <Pagination
        totalMovie={movies.length}
        moviesPerPage={moviesPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Lists;
