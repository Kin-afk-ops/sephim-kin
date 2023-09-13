import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import "./responsive.scss";
import axiosInstance from "../../config";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axiosInstance.get("/categories");

      setCategories(res.data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    const getCountry = async () => {
      const res = await axiosInstance.get("/country");

      setCountry(res.data);
    };

    getCountry();
  }, []);

  return (
    <div className="navbar">
      <label htmlFor="buttonCheck" className="phoneButton">
        <i className="fa-solid fa-bars"></i>
      </label>

      <input
        type="checkbox"
        style={{ display: "none" }}
        id="buttonCheck"
        className="buttonCheckbox"
      />
      <label htmlFor="buttonCheck" className="overlay"></label>
      <div className="navbarList">
        <label htmlFor="buttonCheck" className="navbarListCloseIcon">
          <i className="fa-regular fa-circle-xmark"></i>
        </label>
        <div className="navbarItems">
          <div>
            <span>
              <i className="fa-solid fa-bars"></i>
              Thể loại
            </span>
          </div>
          <ul>
            {categories.length !== 0 &&
              categories.map((c, index) => (
                <li key={index}>
                  <Link
                    className="link"
                    to={`/lists/categories/${c.name.toLowerCase()}?page=1`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="navbarItems">
          <div>
            <span>
              <i className="fa-sharp fa-solid fa-globe"></i>
              Quốc gia
            </span>
          </div>
          <ul>
            {country.length !== 0 &&
              country.map((c, index) => (
                <li key={index}>
                  <Link
                    className="link navbarItemsChild"
                    to={`/lists/country/${c.name.toLowerCase()}?page=1`}
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
            to={`/lists/categories/animeMovie?page=1`}
          >
            Anime chiếu rạp
          </Link>
        </div>

        <div className="navbarItems">
          <Link
            className="link navbarItemsLink"
            to={`/lists/categories/animeSeries?page=1`}
          >
            Anime series
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
