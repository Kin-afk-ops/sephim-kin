import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Lists from "./pages/lists/Lists";
import "./app.scss";
import Admin from "./pages/admin/Admin";
import Update from "./pages/update/Update";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/watch/:slug/:ep">
            <SingleMovie />
          </Route>
          <Route path="/lists/:type/:slug">
            <Lists />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/update/:id">
            <Update />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
