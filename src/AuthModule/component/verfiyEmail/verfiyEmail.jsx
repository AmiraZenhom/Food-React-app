import {  useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import logo from '../../../assets/images/4 3.png'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerfiyEmail() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm();

    const [isLoding , setIsLoding] =useState(false)


    const onSubmit = (data)=>{
        // console.log(data);
        setIsLoding(true)
        axios.put( `https://upskilling-egypt.com/api/v1/Users/verify `, data )
            .then((response)=> {
            // console.log(response);
            navigate("/login")
            toast.success("Verfiy Successfully")
        })
        .catch((error)=> { 
            toast.error(error?.response?.data?.message || 'Any fallback error message');
            setIsLoding(false)
        })
    };

    return (
        <>
            <div className="Auth-container">

                <div className="overLay d-flex justify-content-center align-items-center vh-100 ">
                    <div className="caption  bg-success ">
                        <div className='imageLogo text-center'>
                            <img className='w-50' src= {logo} alt="" />
                        </div>

                    <form className='form w-75 m-auto mt-4 ' onSubmit={handleSubmit(onSubmit)}>
                        <h2>Verfiy Email</h2>
                        <p>Welcome Back! Please enter your details</p>

    {/********** for input email ***********/}
                        <div className='form-group position-relative mt-4'>
                            <i className="fa-regular icon fa-envelope position-absolute mt-2 ms-3"></i>
                            <input className='form-control ps-5' 
                                placeholder= 'Enter your E-mail' 
                                type="email" 
                                {...register("email" , {
                                required: true,
                                pattern : /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                            })}
                            />

                            {errors.email && errors.email.type === "required" && (
                            <span className='text-danger mt-4'>Email is required</span>
                                )}

                            {errors.email && errors.email.type === "pattern" && (
                            <span className='text-danger mt-4'>invaild email</span>
                            )}
                        </div>

    {/********** for input email ********** */}
                        <div className='form-group mt-4 position-relative'>
                            <i className="fa icon fa-lock position-absolute mt-2 ms-3"></i>
                            <input className='form-control ps-5' 
                                    placeholder='Enter Code' 
                                    type="string" 
                                    {...register("code" , {
                                        required : true
                                    })}
                            />
                            

                            {errors.code && errors.code.type === "required" && (
                            <span className='text-danger mt-4'>Code is required</span>
                          
                            )}
                            </div>
                        
                        <div className='form-group mt-4'>
                            <button className='btn btn-dark mt-3 mb-5 w-100 text-white'> Verfiy
                                {/* {isLoding == true ? <i className="fa-solid fa-spinner fa-spin"></i> : "Verfiy"} */}
                            </button>
                        </div>
                        
                    </form>
                </div>    
                        
                </div>
            </div>
        </>
    )
}