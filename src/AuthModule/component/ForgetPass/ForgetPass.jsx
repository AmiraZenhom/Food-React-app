//import React from 'react'
import { useForm } from "react-hook-form";
import Logo from "../../../assets/images/1.png";
import axios from "axios";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function ForgetPass({handelclose}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState:{ errors },} = useForm();

    const onSubmit=(data)=>{
      console.log(data);
      axios.put( 'https://upskilling-egypt.com/api/v1/Users/ChangePassword',data,
     {headers:{ Authorization:`Bearer ${localStorage.getItem("adminToken")}`,},}
      )
     
      .then((Response)=>{
        console.log(Response);
        handelclose();
        navigate("/login")
       
     //   setTimeout(toast("Wow Login !"), 2000) ;
     // localStorage.setItem("adminToken",Response.data.token) 
     // saveAdminData() 
     //   navigate("/dashboard")
       ;})
     .catch((error)=>{toast(error?.response?.data?.message || "error");});
    }

  return (
    <>
 <div className="row bg-overLay vh-100 justify-content-center align-items-center  ">
          <div className="col-md-6 ">
            <div className=" bg-white p-2">
              <div className="logo text-center">
                <img className="w-25" src={Logo} alt="logo " />
              </div>
              <form className=" w-75  m-auto  " onSubmit={handleSubmit(onSubmit)}>
                <h2>Change Your Password</h2>
                <p className="text-muted">Enter your details below</p>

                <div className="form-group ">
                  <input
                    type="password"
                    className="form-control my-4"
                    placeholder="oldPassword"
                    {...register("oldPassword",{required:true})}
                  />
                  {errors.oldPassword&&errors.oldPassword.type==="required"&& <span className="w-75 text-danger">email is required</span>} 
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-2"
                    placeholder="newPassword"
                    {...register("newPassword",{required:true})}
                  />
                  {errors.newPassword&&errors.newPassword.type==="required"&& <span className="w-75 text-danger">password is required</span>} 
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-2"
                    placeholder="confirmNewPassword"
                    {...register("confirmNewPassword",{required:true})}
                  />
                  {errors.confirmNewPassword&&errors.confirmNewPassword.type==="required"&& <span className="w-75 text-danger">password is required</span>} 
                </div>
               
                <button className="btn btn-success w-100 my-4">Change Password</button>
              </form>
            </div>
          </div>
        </div>

    </>
  )
}
