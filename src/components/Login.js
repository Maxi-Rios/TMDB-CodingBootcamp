import React, { useContext } from "react";
import useInput from "../hooks/Useimput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contex/Authenticate";

const Login = () => {
  const state = useContext(AuthContext);
  const email = useInput();
  const password = useInput();
  const navegate = useNavigate();

  const handlerSumit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:1337/api/users/login", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        state.toggleAuth(res.data.name);
        localStorage.setItem("name", JSON.stringify(res.data));
      })
      .then(() => navegate("/"))
      .catch(() =>
        alert(
          "Mensajes de error: Contraseña y/o nombre de cuenta incorrecto \n MAMERTE "
        )
      );
  };
  return (
    <form onSubmit={handlerSumit}>
      <div class="vh-100 gradient-custom">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                class="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div class="card-body p-5 text-center">
                  <div class="mb-md-5 mt-md-4 pb-5">
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        {...email}
                        type="email"
                        id="typeEmailX"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input
                        {...password}
                        type="password"
                        id="typePasswordX"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      class="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
