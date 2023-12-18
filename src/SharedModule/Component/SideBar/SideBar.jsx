import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useState } from "react";
import Logo from "../../../assets/images/3.png";

import Modal from "react-bootstrap/Modal";
import ForgetPass from "../../../AuthModule/component/ForgetPass/ForgetPass";

export default function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();
  let logOut = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  let [isCollapsed, setIsCollapsed] = useState(true);
  let handelToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="mod1 info ">
          <ForgetPass handleClose={handleClose} />
        </Modal.Body>
      </Modal>

      <div className="sidebar-container ">
        <Sidebar collapsed={isCollapsed} className="  vh-100">
          <Menu>
            <MenuItem
              className="mt-5 mx-2"
              onClick={handelToggle}
              icon={<img src={Logo} className="photo " />}
              component={<Link to="/dashboard" />}
            ></MenuItem>
            <MenuItem
              className="mt-5"
              icon={<i className="fa fa-home " aria-hidden="true"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            <MenuItem
              icon={<i className="fa-solid fa-users" aria-hidden="true"></i>}
              component={<Link to="/dashboard/user" />}
            >
              {" "}
              Users
            </MenuItem>
            <MenuItem
              icon={
                <i className="fa-solid fa-table-columns" aria-hidden="true"></i>
              }
              component={<Link to="/dashboard/Recipes" />}
            >
              {" "}
              Recipes
            </MenuItem>
            <MenuItem
              icon={
                <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>
              }
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories
            </MenuItem>
            <MenuItem
              className="w-100"
              icon={
                <i
                  className="fa-solid fa-unlock-keyhole"
                  aria-hidden="true"
                ></i>
              }
              onClick={handleShow}
            >
              {" "}
              Change Password
            </MenuItem>
            <MenuItem
              icon={
                <i
                  className="fa-solid fa-right-from-bracket"
                  aria-hidden="true"
                ></i>
              }
              onClick={logOut}
            >
              {" "}
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  );
}
