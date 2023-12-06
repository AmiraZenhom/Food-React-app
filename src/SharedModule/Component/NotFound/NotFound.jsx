import Photo from "../../../assets/images/4 3.png"
import Photo3 from "../../../assets/images/Group 48101676.png"
import { Link } from "react-router-dom"
export default function NotFound() {
  return (
    <>
   
  
    
  <div className="container-fluid">
  <div className="w-75 mt-3 mx-4">
      <img className="w-25" src={Photo} alt="logo" />
    </div>
  <div className="row m-5 ">
   <div className="col-md-4 ">
     <div className="mt-5">
       <h2>Oops....</h2>
      <h5 className="info">Page not found</h5>
      <p className="mt-4">This Page doesn’t exist or was removed! <br /> We suggest you back to home.</p>
     
      <div className=" ">
            <Link to="/dashboard" >
              {" "}
              <button className="btn btn-success  w-50 text-center ">
              <i className="fa fa-arrow-left py-2 "></i> Back To Home {" "}
              </button>
            </Link>
          </div>
      </div>
     
    </div>
    <div className="col-md-8 p-relative ">
     <div>
    
      <div><img className="w-75" src={Photo3} alt="errorLogo" /></div>
     </div>
    </div>
   </div>
  </div>
   
    </>
  )
}
