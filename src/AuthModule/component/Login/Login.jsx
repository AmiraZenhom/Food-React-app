//eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PreLoader from "../../../SharedModule/Component/PreLoader/PreLoader";

// eslint-disable-next-line react/prop-types
export default function Login({ saveAdminData }) {
  const [showLoading, setShowLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    setShowLoading(true);
    axios
      .post("https://upskilling-egypt.com/api/v1/Users/Login", data)
      .then((Response) => {
        setTimeout(toast("Wow Login !"), 2000);
        localStorage.setItem("adminToken", Response.data.token);
        saveAdminData();
        setShowLoading(false);
        navigate("/dashboard");
      })
      .catch((error) => {
       
        toast(error?.response?.data?.message || "error");
        setIsLoading(false);
        setShowLoading(false);
      });
  };
  
  return  (
    <>
      <div className="Auth-container container-fluid ">
        <div className="row bg-overLay vh-100 justify-content-center align-items-center  ">
          <div className="col-md-6 ">
            <div className=" bg-white p-2">
              <div className="logo text-center">
                <img className="w-25" src={Logo} alt="logo " />
              </div>
              <form
                className=" w-75  m-auto  "
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2>Log In</h2>
                <p className="text-muted">
                  Welcome Back! Please enter your details
                </p>

                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control my-4"
                    placeholder="Enter Your E-mail"
                    {...register("email", { required: true })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <span className="w-75 text-danger">email is required</span>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-2"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && errors.password.type === "required" && (
                    <span className="w-75 text-danger">
                      password is required
                    </span>
                  )}
                </div>
                <div className="my-2 d-flex justify-content-between">
                  <Link to="/register">
                    <p>Register Now?</p>
                  </Link>
                  <Link to="/requestPass">
                    <p>Forgot Password?</p>
                  </Link>
                </div>
                <button
                  
                    className={
                      "btn btn-success w-100 mb-5" + (isLoading ? " disabled" : " ")
                    }
                  >
                    {isLoading == true ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      "Login"
                    )}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
