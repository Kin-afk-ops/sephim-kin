import { Link, useLocation } from "react-router-dom";
import "./video.scss";

const Video = (props) => {
  const location = useLocation();
  const { movie, name } = props;
  console.log(movie);
  console.log(name);
  const infoMovie = movie.episodes;
  console.log(infoMovie);
  const slug = location.pathname.split("/")[3];
  const data = infoMovie[0].server_data;
  console.log(data);
  let urlMovie = "";
  const severMovie = [];

  infoMovie.map((i) => {
    severMovie.push(i.server_name);
  });

  data.map((d) => {
    if (d.slug === slug) {
      urlMovie = d.link_embed;
    }
  });

  console.log(urlMovie);

  return (
    <div className="video">
      <iframe
        allowFullScreen
        style={{ border: "none" }}
        width="720"
        height="480"
        src={urlMovie}
      ></iframe>

      <div className="videoServer">
        {severMovie.map((s, index) => (
          <div key={index}>{s}</div>
        ))}
      </div>
      <div className="singleMovieEp">
        {data.map((d, index) => (
          <Link className="link ep" to={`/watch/${name}/${d.slug}`}>
            {d.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Video;
