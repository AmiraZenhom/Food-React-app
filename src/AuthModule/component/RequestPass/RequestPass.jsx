import Logo from "../../../assets/images/1.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RequestPass() {
    const navigate = useNavigate();
    const {
        register,
      handleSubmit,
      formState:{ errors },} = useForm();
      const onSubmit=(data)=>{
        axios.post('http://upskilling-egypt.com:3002/api/v1/Users/Reset/Request',data)
        .then((Response)=>{
            console.log(Response)
         setTimeout(toast("go to Reset !"), 2000) ;
       // localStorage.setItem("adminToken",Response.data.token) ;
       // saveAdminData() 
         navigate("/resetPassword")
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
                <h2>Request Reset Password</h2>
                <p className="text-muted">Please Enter Your Email And Check Your Inbox</p>
                <div className="form-group ">
                  <input
                    type="email"
                    className="form-control my-4"
                    placeholder=" Email"
                    {...register("email",{required:true})}
                  />
                  {errors.email&&errors.email.type==="required"&& <span className="w-75 text-danger">email is required</span>} 
                </div>
               
                <button className="btn btn-success w-100 my-4">Send</button>
              </form>
            </div>
          </div>
        </div>
     
    </>
  )
}
