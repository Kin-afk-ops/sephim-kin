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
  const [statusServer, setStatusServer] = useState(false);

  let urlMovie = "";
  let fileName = "";
  const severName = [];

  infoMovie.map((i) => {
    severName.push(i.server_name);
  });

  infoMovie.map((infoData) => {
    if (infoData.server_name === serverMovie) {
      dataArray = infoData.server_data;
    }
  });

  if (dataArray.length !== 0) {
    dataArray.map((data) => {
      if (data.slug === slug || data.slug === "full") {
        urlMovie = data.link_embed;
        fileName = data.filename;
      }
    });
  }

  return (
    <div className="video">
      <h3>{fileName}</h3>
      <div className="container">
        <iframe
          className="responsive-iframe"
          allowFullScreen
          style={{ border: "none" }}
          width="720"
          height="480"
          src={urlMovie}
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
