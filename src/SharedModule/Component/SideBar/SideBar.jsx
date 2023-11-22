
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
      <button className="btn btn-danger" onClick={logOut}>
        Logout
      </button>
    </>
  );
}
