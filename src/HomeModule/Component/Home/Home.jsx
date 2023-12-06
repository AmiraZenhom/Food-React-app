import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/eating vegan food-rafiki.png";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Header>
        <div className="header-content  m-2 text-white ">
          <div className="row px-4  g-0 align-Items-center justify-content-center  ">
            <div className="col-sm-8 py-5 my-4 px-5  ">
              <div className="mx-3">
                <h3>Welcom Upskilling !</h3>
                <p>
                  This is a welcoming screen for the entry of the application , <br />
                  you can now see the options
                </p>
              </div>
            </div>
            <div className="col-md-4   ">
              <img className="img-fluid   w-75" src={header} alt="cook" />
            </div>
          </div>
        </div>
      </Header>
      <div className=" mx-3 py-5  px-3 ">
        <div className=" row align-items-center ">
          <div className="col-md-9 ps-5">
            <h4>Fill the Recipes !</h4>
            <p >
              you can now fill the meals easily using the table and form , <br /> click
              here and sill it with the table !
            </p>
          </div>
          <div className="col-md-3 text-end  pe-5 ">
            <Link to="/dashboard/Recipes">
              {" "}
              <button className="btn btn-success px-4 me-5  ">
                Fill Recipes <i className="fa fa-arrow-right"></i>{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
