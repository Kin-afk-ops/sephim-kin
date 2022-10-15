import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./update.scss";
import { Link, useLocation } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [slug, setSlug] = useState("");
  const [categories, setCategories] = useState("");
  const [country, setCountry] = useState("");
  const location = useLocation();
  const nameRef = useRef({});
  const originRef = useRef({});
  const slugRef = useRef({});
  const cateRef = useRef({});
  const countryRef = useRef({});

  const path = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`/movie/${path}`);
      nameRef.current.value = res.data.name;
      originRef.current.value = res.data.origin_name;
      slugRef.current.value = res.data.slug;
      cateRef.current.value = res.data.categories;
      countryRef.current.value = res.data.country;
      setName(res.data.name);
      setOrigin(res.data.origin_name);
      setSlug(res.data.slug);
      setCategories(res.data.categories.toString());
      setCountry(res.data.country.toString());
    };

    fetchMovie();
  }, [path]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const arrayCate = categories.toLowerCase().split(", ");
    console.log(arrayCate[0]);
    const arrayCountry = country.toLowerCase().split(", ");
    console.log(arrayCountry);

    try {
      const res = await axios.put(`/movie/${path}`, {
        name,
        origin_name: origin,
        slug,
        categories: arrayCate,
        country: arrayCountry,
      });
      window.location.replace("/admin");
    } catch (err) {}
  };

  return (
    <div className="admin">
      <div className="adminAdd">
        <form className="adminForm" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            ref={nameRef}
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <label>Origin name</label>
          <input
            ref={originRef}
            type="text"
            onChange={(e) => setOrigin(e.target.value)}
          />

          <label>slug:</label>
          <input
            ref={slugRef}
            type="text"
            onChange={(e) => setSlug(e.target.value)}
          />

          <label>Categories</label>
          <input
            ref={cateRef}
            type="text"
            onChange={(e) => setCategories(e.target.value)}
          />

          <label>Country</label>
          <input
            ref={countryRef}
            type="text"
            onChange={(e) => setCountry(e.target.value)}
          />

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
