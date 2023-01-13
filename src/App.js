// import logo from './logo.svg';
import {Route} from "react-router-dom";
import Result from "./pages/Result";
import LandingPage from "./pages/LandingPage";
import './App.css';
import MainHeader from "./pages/MainHeader";
import { useEffect } from "react";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div>
      <Route exact path="/result">
        <Result />
      </Route>
      {/* <MainHeader /> */}
      {/* <LandingPage /> */}
    </div>
  );
}

export default App;
