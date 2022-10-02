import SingleMovieSimilar from "../../singleMovieSimilar/SingleMovieSimilar";
import Loading from "../../loading/Loading";
import Video from "../../video/Video";
import "./singleMovie.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const SingleMovie = () => {
  const [movie, setMovie] = useState([]);
  const [category, setCategory] = useState([]);
  const [country, setCountry] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const getMovie = async () => {
      const res = await axios.get("https://ophim1.com/phim/" + path);
      setMovie(res.data);
      setCategory(res.data.movie.category);
      setCountry(res.data.movie.country);
    };

    getMovie();
  }, [path]);

  const infoMovie = movie.movie;
  const name = infoMovie?.slug;
  console.log(name);
  const cateMovie = [];
  const countryMovie = [];
  if (category) {
    category.map((c) => {
      const { name } = c;
      cateMovie.push(" " + name);
    });
  }

  if (countryMovie) {
    country.map((c) => {
      const { name } = c;
      countryMovie.push(" " + name);
    });
  }

  return (
    <div className="singleMovie">
      {!infoMovie ? (
        <Loading />
      ) : (
        <>
          <div className="singleMovieCard">
            <div className="singleMovieName">{infoMovie?.name}</div>
            <div className="singleMovieTop">
              <img
                src={
                  infoMovie?.poster_url
                    ? infoMovie?.poster_url
                    : infoMovie?.thumb_url
                }
                alt=""
              />
              <div className="singleMovieInfo">
                <div>
                  <div className="singleMovieInfoText">
                    <span>Trạng Thái: </span>
                    <span>{infoMovie?.episode_current}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Số tập: </span>
                    <span>{infoMovie?.episode_total}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Thời lượng: </span>
                    <span>{infoMovie?.time}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Năm phát hành: </span>
                    <span>{infoMovie?.year}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Chất lượng: </span>
                    <span>{infoMovie?.quality}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Ngôn ngữ: </span>
                    <span>{infoMovie?.lang}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Đạo diễn: </span>
                    <span>{infoMovie?.director.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Diễn viên: </span>
                    <span>{infoMovie?.actor.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Thể loại: </span>
                    <span>{cateMovie?.toString()}</span>
                  </div>
                  <hr />
                </div>

                <div>
                  <div className="singleMovieInfoText">
                    <span>Quốc gia: </span>
                    <span>{countryMovie?.toString()}</span>
                  </div>
                  <hr />
                </div>
              </div>
              <div
                className="singleMovieContent"
                dangerouslySetInnerHTML={{ __html: infoMovie?.content }}
              ></div>
            </div>
          </div>

          <div className="singleMovieVideo">
            <Video movie={movie} name={name} />
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;
