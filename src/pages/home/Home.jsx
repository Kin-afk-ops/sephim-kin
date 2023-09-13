import "./home.scss";
import "./responsive.scss";
import MovieLists from "../../components/movieLists/MovieLists";

import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import axiosInstance from "../../config";

const Home = () => {
  const [movies, setMovies] = useState({});
  const [movie, setMovie] = useState({});
  const [anime, setAnime] = useState({});
  const [hero, setHero] = useState({});
  const [series, setSeries] = useState({});

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  useEffect(() => {
    let mounted = true;
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/movie");
      if (mounted) {
        setMovies({
          data: res.data,
          name: "Phim mới cập nhật",
          path: "all/all",
        });
      }
    };

    const fetchMovie = async () => {
      const res = await axiosInstance.get("/movie/categories?q=movie");
      setMovie({
        data: res.data,
        name: "Phim điện ảnh",
        path: "categories/movie",
      });
    };

    const fetchAnime = async () => {
      const res = await axiosInstance.get("/movie/categories?q=anime");
      setAnime({
        data: res.data,
        name: "Anime",
        path: "categories/anime",
      });
    };

    const fetchHero = async () => {
      const res = await axiosInstance.get("/movie/categories?q=hero");
      setHero({
        data: res.data,
        name: "Phim Siêu anh hùng",
        path: "categories/hero",
      });
    };

    const fetchSeries = async () => {
      const res = await axiosInstance.get("/movie/categories?q=series");
      setSeries({
        data: res.data,
        name: "Series / Phim bộ",
        path: "categories/series",
      });
    };
    fetchMovies();
    fetchMovie();
    fetchAnime();
    fetchHero();
    fetchSeries();
    return () => (mounted = false);
  }, []);

  const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === "{}";
  };

  return (
    <div className="home">
      {isEmptyObject(movie) &&
      isEmptyObject(movie) &&
      isEmptyObject(series) &&
      isEmptyObject(anime) &&
      isEmptyObject(hero) ? (
        <Loading />
      ) : (
        <>
          <MovieLists movies={movies} />
          <MovieLists movies={movie} />
          <MovieLists movies={series} />
          <MovieLists movies={anime} />
          <MovieLists movies={hero} />
        </>
      )}
    </div>
  );
};

export default Home;
