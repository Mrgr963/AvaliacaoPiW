import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

import { Link, Outlet } from "react-router-dom";

import NavBar from "./NavBar/NavBar";

const Home = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
};

export default Home;

