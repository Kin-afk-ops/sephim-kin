import "./header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="headerLogo link">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Ultraman_English_logo.png?20211216182019"
          alt=""
        />
      </Link>
      <div className="headerInput">
        <input type="text" placeholder="Nhập tên bộ phim bạn muốn tìm kiếm!" />
      </div>

      <button className="headerButton">Tìm kiếm</button>
    </div>
  );
};

export default Header;
