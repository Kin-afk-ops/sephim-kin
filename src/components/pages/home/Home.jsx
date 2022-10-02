import "./home.scss";
import MovieLists from "../../movieLists/MovieLists";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../loading/Loading";

const Home = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let mounted = true;
    const fetchMovie = async () => {
      const res = await axios.get(
        "https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1"
      );
      if (mounted) {
        setMovies(res.data);
      }
    };
    fetchMovie();
    return () => (mounted = false);
  }, []);

  return (
    <div className="home">
      {movies.length === 0 ? <Loading /> : <MovieLists movies={movies} />}
    </div>
  );
};

export default Home;
