import Photo from "../../../assets/images/4 3.png"

import { Link } from "react-router-dom"
export default function NotFound() {
  return (
    <>
 
  <div className="container-fluid vh-100 nofound">
  <div className="w-75  mx-4   ">
      <img className="w-25" src={Photo} alt="logo" />
    </div>
 
   
     <div className="mt-5 mx-5 pt-5 ">
       <h2>Oops....</h2>
      <h5 className="info">Page not found</h5>
      <p className="mt-4">This Page doesn’t exist or was removed! <br /> We suggest you back to home.</p>
     
      <div className=" ">
            <Link to="/dashboard" >
              {" "}
              <button className="btn btn-success mt-2 w-25 text-center ">
              <i className="fa fa-arrow-left py-2  "></i> Back To Home {" "}
              </button>
            </Link>
          </div>
      </div>
     
    
   
    
    
    
    </div>
  
 

   
    </>
  )
}
