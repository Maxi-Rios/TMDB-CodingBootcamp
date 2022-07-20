import axios from "axios";
import React from "react";
import useInput from "../hooks/Useimput";
import { useNavigate } from "react-router";
const Register = () => {
  const name = useInput();
  const email = useInput();
  const password = useInput();
  const navigate = useNavigate();
  const handlerSumit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:1337/api/users/register", {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    navigate("/login");
  };
  console.log(name.value, email.value, password.value);
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
                    <h2 class="fw-bold mb-2 text-uppercase">Sign up</h2>
                    <p class="text-white-50 mb-5">
                      Please enter your user, login and password!
                    </p>

                    <div class="form-outline form-white mb-4">
                      <input
                        {...name}
                        type="text"
                        class="form-control form-control-lg"
                      />
                      <label class="form-label" for="typeEmailX">
                        Name
                      </label>
                    </div>

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

                    <p class="small mb-5 pb-lg-2">
                      <a class="text-white-50">Forgot password?</a>
                    </p>

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

export default Register;
