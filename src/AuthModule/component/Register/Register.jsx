import Logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://upskilling-egypt.com/api/v1/Users/register", data)
      .then((Response) => {
        console.log(Response);
        toast(Response?.data?.data?.message || "good");

        // localStorage.setItem("adminToken", Response.data.token);
        // saveAdminData();
        navigate("/");
      })
      .catch((error) => {
        toast(error?.response?.data?.message || "error");
      });
  };
  return (
    <>
      <div className="Auth-container  ">
        <div className="row bg-overLay vh-100 justify-content-center align-items-center  ">
          <div className="col-md-8 ">
            <div className=" bg-white p-2">
              <div className="logo text-center">
                <img className="w-25" src={Logo} alt="logo " />
              </div>
              <form
                className=" w-75  m-auto  "
                onSubmit={handleSubmit(onSubmit)}
              >
                <h2 className="text-success">Register</h2>
                <p className="text-muted ">
                  Welcome Back! Please enter your details
                </p>

                <div className="row">
                <div className="form-group col-md-6  mb-3 position-relative ">
                    <i className="fa-solid fa-user position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="text"
                      className="form-control input-group-text "
                      placeholder="User Name"
                      {...register("userName", { required: true })}
                    />
                    {errors.userName && errors.userName.type === "required" && (
                      <span className="w-75 text-danger">
                        userName is required
                      </span>
                    )}
                  </div>
                

                  <div className="form-group col-md-6 mb-3 position-relative ">
                    <i className="fa fa-envelope-open position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="email"
                      className="form-control input-group-text "
                      placeholder="Enter Your E-mail"
                      {...register("email", { required: true })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="w-75 text-danger">
                        email is required
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6  mb-3 position-relative ">
                    <i className="fa-solid fa-earth-americas position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="text"
                      className="form-control input-group-text "
                      placeholder="Country"
                      {...register("country", { required: true })}
                    />
                    {errors.country && errors.country.type === "required" && (
                      <span className="w-75 text-danger">
                        Country is required
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6  mb-3 position-relative ">
                    <i className="fa-solid fa-mobile-screen-button position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="number"
                      className="form-control input-group-text "
                      placeholder="Phone Number"
                      {...register("phoneNumber", { required: true })}
                    />
                    {errors.phoneNumber &&
                      errors.phoneNumber.type === "required" && (
                        <span className="w-75 text-danger">
                          Phone Number is required
                        </span>
                      )}
                  </div>
                  <div className="form-group col-md-6  mb-3 position-relative ">
                    <i className="fa-solid fa-key  position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="password"
                      className="form-control input-group-text "
                      placeholder="Password"
                      {...register("password", { required: true })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="w-75 text-danger">
                        password is required
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-6  mb-3 position-relative ">
                    <i className="fa-solid fa-key  position-absolute mt-2 ms-1 text-success"></i>
                    <input
                      type="password"
                      className="form-control input-group-text"
                      placeholder="confirm-Password"
                      {...register("confirmPassword", { required: true })}
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <span className="w-75 text-danger">
                          confirm-Password is required
                        </span>
                      )}
                  </div>
                </div>
                <div className="my-2 text-end">
                  <Link to="/">
                    <p>login now</p>
                  </Link>
                </div>
                <button className="btn btn-success w-100 mb-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
