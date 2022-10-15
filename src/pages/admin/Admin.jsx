import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./admin.scss";
import Pagination from "../../components/pagination/Pagination";
import { Link, useLocation } from "react-router-dom";

const Admin = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [country, setCountry] = useState("");

  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const location = useLocation();
  const path = location.pathname.split("/")[3];
  const [currentPage, setCurrentPage] = useState([1]);
  const [addCate, setAddCate] = useState("");
  const [addCountry, setAddCountry] = useState("");
  const [moviesPerPage, setMoviesPerPage] = useState(24);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arrayCate = categories.toLowerCase().split(", ");
    const arrayCountry = country.toLowerCase().split(", ");
    console.log(arrayCountry);

    const newMovie = {
      name: name,
      origin_name: origin,
      slug: slug,
      categories: arrayCate,
      country: arrayCountry,
    };
    try {
      const res = await axios.post("/movie", newMovie);
      window.location.replace("/admin");
    } catch (err) {}
  };

  const handleSubmitCate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/categories", {
        name: addCate,
      });
      window.location.replace("/admin");
    } catch (err) {}
  };

  const handleSubmitCountry = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/country", {
        name: addCountry,
      });
      window.location.replace("/admin");
    } catch (err) {}
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get("/movie");
      setMovies(res.data);
    };

    fetchMovie();
  }, []);

  const handleDelete = async () => {
    if (typeof path !== "undefined") {
      try {
        await axios.delete(`/movie/${path}`);
        window.location.replace("/admin");
      } catch (err) {}
    }
  };

  const lastMovieIndex = currentPage * moviesPerPage;
  const firstMovieIndex = lastMovieIndex - moviesPerPage;
  let currentMovies = [];
  if (movies.length !== 0) {
    currentMovies = movies.slice(firstMovieIndex, lastMovieIndex);
  }

  return (
    <div className="admin">
      <div className="adminAdd">
        <form className="adminForm" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />

          <label>Origin Name</label>
          <input type="text" onChange={(e) => setOrigin(e.target.value)} />

          <label>Slug</label>
          <input type="text" onChange={(e) => setSlug(e.target.value)} />

          <label>Categories</label>
          <input type="text" onChange={(e) => setCategories(e.target.value)} />

          <label>Country</label>
          <input type="text" onChange={(e) => setCountry(e.target.value)} />
          <button type="submit">ADD</button>
        </form>
      </div>

      <div className="adminAdd" style={{ margin: "50px 0" }}>
        <form className="adminForm" onSubmit={handleSubmitCate}>
          <label>Add Category</label>
          <input type="text" onChange={(e) => setAddCate(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="adminAdd" style={{ margin: "50px 0" }}>
        <form className="adminForm" onSubmit={handleSubmitCountry}>
          <label>Add Country</label>
          <input type="text" onChange={(e) => setAddCountry(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="adminSearch">
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="adminMovie">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
            </tr>
          </thead>

          <tbody>
            {query === ""
              ? currentMovies.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie.name}</td>
                    <td>
                      {movie.slug}
                      <div>
                        <Link
                          to={`/update/${movie._id}`}
                          className="adminIcon link"
                        >
                          <i className="fa-solid fa-pen-to-square adminIcon"></i>
                        </Link>
                        <Link
                          to={`/admin/delete/${movie._id}`}
                          className="link adminIcon"
                        >
                          <i
                            className="fa-solid fa-trash"
                            onClick={handleDelete}
                          ></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              : currentMovies
                  .filter((asd) =>
                    removeAccents(asd.name)
                      .toLowerCase()
                      .includes(query.toLowerCase())
                  )
                  .map((movie, index) => (
                    <tr key={index}>
                      <td>{movie.name}</td>
                      <td>
                        {movie.slug}
                        <div>
                          <Link
                            to={`/update/${movie._id}`}
                            className="adminIcon link"
                          >
                            <i className="fa-solid fa-pen-to-square adminIcon"></i>
                          </Link>
                          <Link
                            to={`/admin/delete/${movie._id}`}
                            className="link adminIcon"
                          >
                            <i
                              className="fa-solid fa-trash"
                              onClick={handleDelete}
                            ></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
          </tbody>
        </table>

        <Pagination
          totalMovie={movies.length}
          moviesPerPage={moviesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Admin;
