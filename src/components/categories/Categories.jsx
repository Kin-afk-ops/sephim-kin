import { Link } from "react-router-dom";
import "./categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <ul className="categoriesUl">
        <li className="categoriesItem">
          <Link to="/" className="link">
            TV Series
          </Link>
        </li>
        <li className="categoriesItem">
          <Link to="/" className="link">
            Movie
          </Link>
        </li>
        <li className="categoriesItem">
          <Link to="/" className="link">
            Show
          </Link>
        </li>
        <li className="categoriesItem">
          <Link to="/" className="link">
            Toy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
