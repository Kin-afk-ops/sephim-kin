import "./app.scss";
import Header from "./components/header/Header";
import Home from "./components/pages/home/Home";
import SingleMovie from "./components/pages/singleMovie/SingleMovie";
import Footer from "./components/footer/Footer";
import Categories from "./components/categories/Categories";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Lists from "./components/pages/lists/Lists";
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Categories />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/watch/:slug/:ep">
            <SingleMovie />
          </Route>
          <Route path="/lists">
            <Lists />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
