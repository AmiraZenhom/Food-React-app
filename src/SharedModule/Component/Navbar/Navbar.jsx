import userPhoto from "../../../assets/images/Group 48102127.png";

export default function Navbar({ adminData }) {
  // console.log(adminData);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-nav rounded-2 info1  ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <div className="d-flex justify-content-end align-items-center">
                    <div className=" text-end me-2 ">
                      <img
                        className="w-25 rounded-pill "
                        src={userPhoto}
                        alt="user-img"
                      />
                    </div>
                    <p className="text-success text-uppercase mt-3   ">
                      {adminData?.userName}
                    </p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
