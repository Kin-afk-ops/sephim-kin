import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./video.scss";
import "./responsive.scss";

const Video = (props) => {
  const location = useLocation();
  const { movie, name, episode_current } = props;
  const infoMovie = movie.episodes;
  const slug = location.pathname.split("/")[3];
  let dataArray = [];
  const [serverMovie, setServerMovie] = useState(infoMovie[0].server_name);

  let urlMovie = "";
  let fileName = "";
  const severName = [];

  infoMovie?.forEach((i) => {
    severName.push(i.server_name);
  });

  infoMovie?.forEach((infoData) => {
    if (infoData.server_name === serverMovie) {
      dataArray = infoData.server_data;
    }
  });

  if (dataArray.length !== 0) {
    dataArray.forEach((data) => {
      if (data.slug === slug || data.slug === "full") {
        urlMovie = data.link_embed;
        fileName = data.filename;
      }
    });
  }

  const handleClick = () => {
    if (window.screen.width <= 480) {
      window.scrollTo({
        top: 1000,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 850,
        behavior: "smooth",
      });
    }

    console.log(window);
  };

  // window.onscroll = () => {
  //   console.log(window.pageYOffset);
  // };

  return (
    <div className="video">
      <h3>{fileName}</h3>
      <div className="container">
        <iframe
          className="responsive-iframe"
          style={{ border: "none" }}
          allowFullScreen={true}
          width="720"
          height="480"
          src={urlMovie}
          loading="lazy"
        ></iframe>
      </div>
      <div className="videoServer">
        {severName.map((s, index) => (
          <button
            className={s === serverMovie ? "active" : " "}
            onClick={() => setServerMovie(s)}
            key={index}
          >
            {s}
          </button>
        ))}
      </div>
      {episode_current !== "Full" && (
        <>
          <span>Hãy chọn tập phim để xem phim nhé!</span>
          <div className="singleMovieEp">
            {dataArray.length !== 0 &&
              dataArray.map((d, index) => (
                <Link
                  className={d.slug === slug ? "link ep epActive" : "link ep"}
                  to={`/watch/${name}/${d.slug}`}
                  key={index}
                  onClick={handleClick}
                >
                  {d.name}
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
