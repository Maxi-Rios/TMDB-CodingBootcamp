import axios from "axios";
import React, { useEffect, useState } from "react";
import '../style/Search.scss'
const Perfiluser = () => {
  const [favoritos, setFavoritos] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem("name")).id;

  const handlerDelete = (peli, i) => {
    axios.delete("http://localhost:1337/api/favorites/delete", {
      data: {
        title: peli.title,
        path: peli.path,
        movieId: peli.movieId,
        overview: peli.overview,
        userId: userStorage,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/favorites/${userStorage}`)
      .then((res) => setFavoritos(res.data));
  }, []);

  return (
    <>
    <h1 className="titulosFav">Mis Favoritos</h1>
      <form className="content">
        {favoritos.map((peli, i) => {
          return (
            <div>
              <div className="card">
                <div key={i}>
                  <img src={`https://image.tmdb.org/t/p/w780${peli.path}`} />
                  <div className="card__inner">
                    <p>{peli.title}</p>
                    <p>{peli.overview}</p>
                  </div>
                </div>
              </div>
              <div className="contentBtn">
                <button
                  className="btn"
                  onClick={() => {
                    handlerDelete(peli, i);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </form>
    </>
  );
};

export default Perfiluser;
