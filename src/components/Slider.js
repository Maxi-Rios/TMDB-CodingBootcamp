import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style/Slider.scss";
const Slider = () => {
  let key = "e9ffcce562635a23124ca8069487f842";
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=${key}`)
      .then((res) => res.data)
      .then((data) => setMovie(data.results));
  }, []);

  return (
    <div className="slider">
      <ul>
        {movie.map((peli, i) => {
          return (
            <>
              <li key={i}>
                {/* <p>{peli.title}</p> */}
                <img
                  src={`https://image.tmdb.org/t/p/w1280${peli.backdrop_path}`}
                  alt="imagen"
                ></img>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Slider;
