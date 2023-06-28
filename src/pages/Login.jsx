import React from "react";
import { Link } from "react-router-dom";
import '../App.css'
const Login = () => {
  return (
    <div className="container-xxl d-flex align-items-center justify-content-center">
      <div className="row mt-5">
        <div className="col-12 ">
          <div className="login-card">
            <h3 className="text-center mb-3">Sign In</h3>

            <form className="d-flex flex-column gap-30">
              <div className="email">
                <input
                  name="email"
                  placeholder="email"
                  type="email"
                  className="neumer-input"
                  required
                />
              </div>
              <div className="password">
                <input
                  name="password"
                  placeholder="password"
                  type="password"
                  className="neumer-input"
                  required
                />
              </div>

              <div>
                <div className="mt-3 d-flex align-items-center justify-content-center gap-15">
                  <button type="submit" className="submit-btn">
                    Sign In
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                Don't have account{" "}
                <Link className="mx-2 text-primary" to="/sign-up">
                  Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
