import "./header.scss";
import "./responsive.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      window.location.replace(`/lists/search/${query.toLowerCase()}?page=1`);
    }
  };

  const handleClick = () => {
    window.location.replace(`/lists/search/${query.toLowerCase()}?page=1`);
  };

  return (
    <header id="header" className={isScrolled ? "header scroll" : "header"}>
      <Link to="/" className="headerLogo link">
        <img src={logo} alt="" />
      </Link>
      <div className="headerInput">
        <label
          htmlFor="headerSearchCheckbox"
          className="headerSearchCheckboxLogo"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>

        <input
          style={{ display: "none" }}
          type="checkbox"
          id="headerSearchCheckbox"
          className="headerSearchCheckbox"
        />

        <label htmlFor="headerSearchCheckbox" className="overlay"></label>
        <input
          type="text"
          placeholder="Nhập tên bộ phim bạn muốn tìm kiếm!"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          enterKeyHint="search"
        />
      </div>

      <button className="headerButton" onClick={handleClick}>
        Tìm kiếm
      </button>
    </header>
  );
};

export default Header;
