import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/Search.scss";
import { useParams } from "react-router-dom";

const Search = () => {
  const { pelis } = useParams();
  let add = "Add fav";
  let key = "e9ffcce562635a23124ca8069487f842";
  const [search, setSearch] = useState([]); //Buscar

  const handlerFav = (peli) => {
    const userStorage = JSON.parse(localStorage.getItem("name")).id;
    axios.put("http://localhost:1337/api/favorites", {
      title: peli.title,
      path: peli.backdrop_path,
      movieId: peli.id,
      overview: peli.overview,
      userId: userStorage,
    });
  };

  const handlerDelete = (peli, i) => {
    const userStorage = JSON.parse(localStorage.getItem("name")).id;
    axios.delete("http://localhost:1337/api/favorites/delete", {
      data: {
        title: peli.title,
        path: peli.backdrop_path,
        movieId: peli.id,
        overview: peli.overview,
        userId: userStorage,
      },
    });
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=es&query=${pelis}`
      )
      .then((res) => res.data)
      .then((search) => setSearch(search.results));
  }, []);

  return (
    <div>
      <div className="content">
        {search.map((peli, i) => {
          return (
            <div>
              <div className="card">
                <img
                  alt="..."
                  src={
                    !peli.backdrop_path
                      ? `https://image.tmdb.org/t/p/w780${peli.poster_path}`
                      : `https://image.tmdb.org/t/p/w780${peli.backdrop_path}`
                  }
                ></img>
                <div className="card__inner">
                  <h4>
                    <strong>{peli.title}</strong>
                  </h4>
                  <p>{peli.overview}</p>
                </div>
              </div>
              <div className="contentBtn">
                <button
                  className="btn"
                  onClick={() => {
                    handlerFav(peli);
                  }}
                >
                  {add}
                </button>

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
      </div>
    </div>
  );
};

export default Search;
