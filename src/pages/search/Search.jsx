import React from "react";
import "./search.scss";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MovieListItem from "../../components/movieListItem/MovieListItem";
import Lists from "../lists/Lists";
import axiosInstance from "../../config";

const Search = React.memo(() => {
  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const query = removeAccents(location.pathname.split("/")[2].toLowerCase());
  useEffect(() => {
    const getMovie = async () => {
      const res = await axiosInstance.get("/movie");
      setMovies(res.data);
    };
    getMovie();
  }, []);

  return (
    <div className="search">
      <div>
        <Lists />
      </div>
    </div>
  );
});

export default Search;
