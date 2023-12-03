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
  const handleClose = () => setModalState("close");
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };

  const deleteUser = () => {
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

  const getUsersList = () => {
    axios
      .get(
        'https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
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
                <h3>Welcom Uouo</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
            <div className="col-md-2">
              <img className="img-fluid" src={header} alt="" />
            </div>
          </div>
        </div>
      </Header>

      <div className=" mx-3 py-5  px-3 ">
        <div className=" row align-items-center ">
          <div className="col-md-9">
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-3 text-end "></div>

          {usersList.length > 0 ? (
            <table className="table">
              <thead>
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
                      <div className="image">
                        {User.imagePath ? (
                         <div >
                           <img
                         className="w-50 img-fluid"
                         src={
                           `https://upskilling-egypt.com/` + User.imagePath
                         }
                         alt=""
                       /></div>
                        ) : (
                         <div> <img className="w-75" src={Photo} alt="no data" /></div>
                        )}
                      </div>
                    </td>
                    <td>{User.PhoneNumber}</td>

                    <td>
                      <i
                        onClick={() => showDeleteModal(User.id)}
                        className="fa fa-trash fs-4 ms-2 text-danger"
                      ></i>
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
    </>
  );
}
