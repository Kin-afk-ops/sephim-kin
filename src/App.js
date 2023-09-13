import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import SingleMovie from "./pages/singleMovie/SingleMovie";
import Lists from "./pages/lists/Lists";
import "./app.scss";
import Navbar from "./components/navbar/Navbar";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Helmet } from "react-helmet";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDWtPbDyHspOS3jRb1Qpl1XgabcLyTgks",
  authDomain: "sephim2022-dfc6e.firebaseapp.com",
  projectId: "sephim2022-dfc6e",
  storageBucket: "sephim2022-dfc6e.appspot.com",
  messagingSenderId: "925823901192",
  appId: "1:925823901192:web:a9ed772fd78a34dd883bbd",
  measurementId: "G-7LTDBDM3YH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function App() {
  return (
    <Router>
      <div className="app">
        <Helmet>
          <meta
            name="description"
            content="Xem phim online với chất lượng HD, 4K tại sePhim. Xem phim hành động HD. Xem phim Anime vietsub. Xem phim bộ TVB"
          />
          <title>Xem phim HD vietsub, lồng tiếng tại sePhim</title>
        </Helmet>

        <Header />
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/watch/:slug/:id">
            <SingleMovie />
          </Route>
          <Route path="/lists/:type/:slug">
            <Lists />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
