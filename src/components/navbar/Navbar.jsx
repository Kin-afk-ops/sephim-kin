import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import "./responsive.scss";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");

      setCategories(res.data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getCountry = async () => {
      const res = await axios.get("/country");

      setCountry(res.data);
    };

    getCountry();
  }, []);

  return (
    <div className="navbar">
      <label for="buttonCheck" className="phoneButton">
        <i className="fa-solid fa-bars"></i>
      </label>

      <input
        type="checkbox"
        style={{ display: "none" }}
        id="buttonCheck"
        className="buttonCheckbox"
      />
      <label for="buttonCheck" className="overlay"></label>
      <div className="navbarList">
        <div className="navbarItems">
          <div>
            <i className="fa-solid fa-bars"></i>
            Thể loại
          </div>
          <ul>
            {categories.length !== 0 &&
              categories.map((c, index) => (
                <li key={index}>
                  <Link
                    className="link"
                    to={`/lists/categories/${c.name.toLowerCase()}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="navbarItems">
          <div>
            <i className="fa-sharp fa-solid fa-globe"></i>
            Quốc gia
          </div>
          <ul>
            {country.length !== 0 &&
              country.map((c, index) => (
                <li key={index}>
                  <Link
                    className="link navbarItemsChild"
                    to={`/lists/country/${c.name.toLowerCase()}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="navbarItems">
          <Link
            className="link navbarItemsLink"
            to={`/lists/categories/animeMovie`}
          >
            Anime chiếu rạp
          </Link>
        </div>

        <div className="navbarItems">
          <Link
            className="link navbarItemsLink"
            to={`/lists/categories/animeSeries`}
          >
            Anime series
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
