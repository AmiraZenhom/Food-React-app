import { useEffect, useState } from "react";
import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/Group 48102127.png";
import axios from "axios";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import Photo from "../../../assets/images/nodata.png";
import Modal from "react-bootstrap/Modal";

export default function UserList() {
  const [usersList, setUsersList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [search, setSearch] = useState("");

  const handleClose = () => setModalState("close");
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };
  const getNameValue = (input) => {
    setSearch(input.target.value);
    getUsersList(1, input.target.value);
  };

  const [pagesArray, setPagesArray] = useState([]);

  const deleteUser = () => {
    alert(itemId);
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Users/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getUsersList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsersList = (pageNu, userName) => {
    axios
      .get("https://upskilling-egypt.com:443/api/v1/Users/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNu,
          userName: userName,
        },
      })
      .then((response) => {
        console.log(response);
        setPagesArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        setUsersList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <>
      <Modal show={modalState == "modal-two"} onHide={handleClose}>
        <Modal.Body>
          <form className=" w-75  m-auto  ">
            <div className="text-center">
              <img src={Photo} alt="nodata" />
              <h4> Delete This Category ?</h4>
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
            <div className="text-end">
              <button
                onClick={deleteUser}
                className="btn btn-outline-danger  my-4"
              >
                Delete this item
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Header>
        <div className="header-content  m-2 text-white ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10  ">
              <div className="mx-3">
                <h3>Users List</h3>
                <p>
                  You can now add your items that any user can order it from{" "}
                  <br /> the Application and you can edit
                </p>
              </div>
            </div>
            <div className="col-md-2">
              <img className="img-fluid headerImg" src={header} alt="logo" />
            </div>
          </div>
        </div>
      </Header>

      <div className=" mx-3 py-5  px-3 ">
        <div className=" row align-items-center ">
          <div className="col-md-9">
            <h4>User Table Details</h4>
            <p>You can check all details</p>
          </div>

          <input
            onChange={getNameValue}
            className="form-control my-4 me-3 border-success "
            type="text"
            placeholder="search by user name"
          />
          {usersList.length > 0 ? (
            <table className="table  table-hover table-bordered  text-center container-fluid">
              <thead className="table-info">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {usersList.map((User, index) => (
                  <tr key={User.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{User.userName}</td>
                    <td>
                      <div className="image  m-auto">
                        {User.imagePath ? (
                          <div>
                            <img
                              className="w-50 img-fluid"
                              src={
                                `https://upskilling-egypt.com/` + User.imagePath
                              }
                              alt=""
                            />
                          </div>
                        ) : (
                          <div>
                            {" "}
                            <img className="w-75" src={Photo} alt="no data" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{User.phoneNumber}</td>

                    <td>
                      {User.group.name == "SystemUser" ? (
                        <i
                          onClick={() => showDeleteModal(User.id)}
                          className="fa fa-trash fs-4 ms-2 text-danger"
                        ></i>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <NoData />
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center my-5">
        <nav aria-label="...">
          <ul className="pagination pagination-sm">
            {pagesArray.map((pageNu) => (
              <li
                key={pageNu}
                onClick={() => getUsersList(pageNu, search)}
                className="page-item"
              >
                <a className="page-link" href="#">
                  {pageNu}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
