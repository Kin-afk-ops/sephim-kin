import MovieListItem from "../../movieListItem/MovieListItem";
import axios from "axios";
import "./lists.scss";
import { useEffect, useState } from "react";
import Pagination from "../../pagination/Pagination";
import Loading from "../../loading/Loading";

const Lists = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(
        `https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=${pagination.page}`
      );

      setMovies(res.data.items);
      console.log(res.data);
      setPagination({
        page: res.data.pagination.currentPage,
        totalPage: res.data.pagination.totalPages,
      });
      setStatus(res.data.status);
    };
    fetchMovie();
  }, [pagination.page]);

  const onPageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
    setStatus(false);
  };

  return (
    <div className="lists">
      {!status ? (
        <Loading />
      ) : (
        <div className="movieListItems">
          {movies.map((movie, index) => (
            <MovieListItem movie={movie} key={index} />
          ))}
        </div>
      )}

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </div>
  );
};

export default Lists;
