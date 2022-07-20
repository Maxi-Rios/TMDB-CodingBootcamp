import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/Authenticate";
import axios from "axios";
import useInput from "../hooks/Useimput";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const pelis = useInput();
  const usuarios = useInput();
  const navegate = useNavigate();
  const { toggleAuth, isAuthenticated, name } = useContext(AuthContext);

  const handlerPeliculas = () => {
    navegate(`/search/${pelis.value}`);
  };
  const handlerUsuarios = () => {
    navegate(`/busqueda/${usuarios.value}`);
  };

  const logOut = () => {
    toggleAuth();
    axios
      .post("http://localhost:1337/api/users/logout")
      .then(() => {
        localStorage.removeItem("name");
      })
      .then(() => navegate("/login"));
  };

  return (
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark p-md-3 sticky-top ">
      <div class="container">
        <a class="navbar-brand" href="/">
          Movies Maxs
        </a>
        <form onSubmit={handlerPeliculas} className="buscar">
          <div class="wrap">
            <div class="search">
              <input
                {...pelis}
                type="text"
                class="searchTerm"
                placeholder="Buscate una para el mate"
              />
              <button type="submit" class="searchButton">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={handlerUsuarios} className="buscar">
          <div class="usuarios">
            <div class="search">
              <input
                {...usuarios}
                type="text"
                class="searchTerm"
                placeholder="Stalkeate una people"
              />
              <button type="submit" class="searchButton">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="mx-auto"></div>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link text-white" href="/">
                Home
              </a>
            </li>
            {!isAuthenticated ? (
              <>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/register">
                    Register
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/login">
                    Login
                  </a>
                </li>
              </>
            ) : (
              <>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/perfiluser">
                    {name}
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/login" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
