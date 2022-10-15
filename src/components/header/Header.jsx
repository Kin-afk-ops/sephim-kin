import "./header.scss";
import "./responsive.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      window.location.replace(`/lists/search/${query.toLowerCase()}`);
    }
  };

  const handleClick = () => {
    window.location.replace(`/lists/search/${query.toLowerCase()}`);
  };

  return (
    <div className={isScrolled ? "header scroll" : "header"}>
      <Link to="/" className="headerLogo link">
        <img src={logo} alt="" />
      </Link>
      <div className="headerInput">
        <label for="headerSearchCheckbox" className="headerSearchCheckboxLogo">
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>

        <input
          style={{ display: "none" }}
          type="checkbox"
          id="headerSearchCheckbox"
          className="headerSearchCheckbox"
        />

        <label for="headerSearchCheckbox" className="overlay"></label>
        <input
          type="text"
          placeholder="Nhập tên bộ phim bạn muốn tìm kiếm!"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button className="headerButton" onClick={handleClick}>
        Tìm kiếm
      </button>
    </div>
  );
};

export default Header;
