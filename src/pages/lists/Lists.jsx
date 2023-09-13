import MovieListItem from "../../components/movieListItem/MovieListItem";
import "./lists.scss";
import "./responsive.scss";
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Pagination";
import Loading from "../../components/loading/Loading";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../config";
import { Helmet } from "react-helmet";

const Lists = () => {
  const [movies, setMovies] = useState([]);
  const [originName, setOriginName] = useState([]);
  const [name, setName] = useState([]);
  const [title, setTitle] = useState("");
  const moviesPerPage = 24;
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get("page");

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const type = location.pathname.split("/")[2];
  const path = location.pathname.split("/")[3];

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axiosInstance.get(`/movie/${type}?q=${path}`);

      setMovies(res.data);
    };

    const fetchAnimeMovie = async () => {
      const res = await axiosInstance.get(`/movie/${type}?q=anime`);

      setMovies(res.data.filter((asd) => asd.categories.includes("movie")));
    };

    const fetchAnimeSeries = async () => {
      const res = await axiosInstance.get(`/movie/${type}?q=anime`);

      setMovies(res.data.filter((asd) => asd.categories.includes("series")));
    };

    const fetchAllMovie = async () => {
      const res = await axiosInstance.get("/movie");

      setMovies(res.data);
    };

    const fetchSearchMovie = async () => {
      const res = await axiosInstance.get(`/movie`);

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
      setTitle("Tất cả phim");
    } else if (type === "search") {
      fetchSearchMovie();
      setTitle(`Kết quả tìm kiếm cho:  "${path.toUpperCase()}"`);
    } else {
      fetchMovie();
      setTitle(`Danh sách cho phim: "${path.toUpperCase()}"`);
    }

    if (path === "animeMovie") {
      fetchAnimeMovie();
      setTitle("Danh sách Anime chiếu rạp");
    }

    if (path === "animeSeries") {
      fetchAnimeSeries();
      setTitle("Danh sách series Anime");
    }
  }, [path, type]);

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  const currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);

  return (
    <div className="lists">
      <Helmet>
        <title>Danh sách phim {title}</title>
        <meta name="description" content={`xem phim ${title}`} />
      </Helmet>

      <h1>{title}</h1>

      {currentMovies.length === 0 ? (
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
        type={type}
        path={path}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Lists;
