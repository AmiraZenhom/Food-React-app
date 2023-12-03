import Header from '../../../SharedModule/Component/Header/Header'
import header from "../../../assets/images/Group 48102127.png";
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <>
    <Header >
                <div className='header-content  m-2 text-white '>
                  <div className="row px-4 py-2 g-0 align-Items-center  ">
                    <div className="col-sm-10  ">
                      <div className="mx-3">
                        <h3>Welcom Upskilling !</h3>
                        <p>This is a welcoming screen for the entry of the application , you can now see the options</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <img className='img-fluid' src={header} alt="" />
                    </div>
                  </div>
                </div>
                </Header>
    <div className=' mx-3 py-5  px-3 '> 
      <div className=" row align-items-center ">
        <div className="col-md-9">
          <h4>Fill the Recipes !</h4>
          <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
        </div>
        <div className="col-md-3 text-end  ">
         <Link to="/dashboard/Recipes"> <button className='btn btn-success '>Fill Recipes <i className='fa fa-arrow-right'></i> </button></Link>
        </div>
      </div>
    </div>
    
    </>
  )
}
