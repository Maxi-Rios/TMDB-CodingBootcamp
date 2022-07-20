import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserSearch = () => {
  
  const [perfil, setPerfil] = useState([]);

  const {usuarios}  = useParams();

 

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("name")).id;
    
    axios
      .get(`http://localhost:1337/api/users/${usuarios}/${userStorage}`)
      .then((user) => setPerfil(user.data))
      .catch((err) => console.log(err));
  },[]);
  return (
    <div>
      <h1 className="titulosFav">Favoritos del usuario {usuarios}</h1>
      <form className="content">
        {perfil.map((peli, i) => {
          return (
            <>
              <div class="card">
                <img
                  alt="..."
                  className="img"
                  src={
                    !peli.backdrop_path
                      ? `https://image.tmdb.org/t/p/w780${peli.path}`
                      : `https://image.tmdb.org/t/p/w780${peli.backdrop_path}`
                  }
                ></img>
                <div class="content">
                  <p>
                    <strong>{peli.title}</strong>
                  </p>
                  <p>{peli.overview}</p>
                </div>
              </div>
            </>
          );
        })}
      </form>
    </div>
  );
};

export default UserSearch;
