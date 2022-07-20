import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import AuthContextProvider from "../contex/Authenticate";
import Register from "./Register";
import Search from "./Search";
import Login from "./Login";
import Slider from "./Slider";
import Perfiluser from "./Perfiluser";
import "../index.css";
import UserSearch from "./UserSearch";
const App = () => {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path="/busqueda/:usuarios" element={<UserSearch/>}/>
        <Route path="/" element={<Slider />} />
        <Route path="/search/:pelis" element={<Search />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfiluser" element={<Perfiluser />} />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
