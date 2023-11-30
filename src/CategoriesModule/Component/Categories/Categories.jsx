import axios from "axios";
import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/Group 48102127.png";
import { useEffect, useState } from "react";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Photo from "../../../assets/images/nodata.png"

export default function Categories() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post ( 'https://upskilling-egypt.com/api/v1/Category/',data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
    .then((response) => {
      console.log(response);
      setTimeout(toast("Add Success"), 2000);
      handleClose();
      getCategoriesList();
    })
      .catch((error) => {
        toast(error?.response?.data?.message || "error");
      });}
    
const deleteCategory =()=>{
  axios.delete(`https://upskilling-egypt.com/api/v1/Category/${itemId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },}) 
    .then((response) => {
      console.log(response);
      handleClose();
      getCategoriesList();
    })
    .catch((error) => {
      console.log(error);
    });
   
}

const UpdateCategory =(data)=>{
  axios.put(`https://upskilling-egypt.com/api/v1/Category/${itemId}`,data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    },}) 
    .then((response) => {
      console.log(response);
      handleClose();
      getCategoriesList();
    })
    .catch((error) => {
      console.log(error);
    });
   
}
  // const [show, setShow] = useState(false);
   const handleClose = () =>setModalState("close") ;
  // const handleShow = () => setShow(true);
  
 
  const [categoriesList, setCategoriesList] = useState([]);
  const [modalState,setModalState]=useState("close");
const [itemId,setItemId] = useState(0);
  const showAddModal=()=>{
    setValue("name",null) 
    setModalState("modal-one")
  };
  const showDeleteModal=(id)=>{
    setItemId(id)
    setModalState("modal-two")
  };
  const showUpdateModal=(categoryItem)=>{
    setItemId(categoryItem.id)
    setValue("name",categoryItem.name) 
    setModalState("modal-three")
  };
  const getCategoriesList=()=>{
    axios
    .get(
      "https://upskilling-egypt.com/api/v1/Category/?pageSize=10&pageNumber=1",
      {
        headers: {
          Authorization: `Bearer${localStorage.getItem("adminToken")}`,
        },
      }
    )
    .then((response) => {
      
      setCategoriesList(response.data.data);
    
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
   getCategoriesList();
  }, []);

  return (
    <>
    <Modal show={modalState=="modal-one"} onHide={handleClose}>
       
       <Modal.Body>
        <form className=" w-75  m-auto  " onSubmit={handleSubmit(onSubmit)}>
              <h4> Add Category</h4>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control my-4"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="w-75 text-danger">name is required</span>
                )}
              </div>
              <button className="btn btn-success w-100 my-4">
                Add
              </button>
            </form>
       </Modal.Body>
      
     </Modal>

     <Modal show={modalState=="modal-two"} onHide={handleClose}>
       
       <Modal.Body>
        <form className=" w-75  m-auto  " onSubmit={handleSubmit(deleteCategory)}>
         <div className="text-center">
         <img src={Photo} alt="nodata" />
              <h4> Delete This Category ?</h4>
              <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
            
         </div>
            <div className="text-end">
                <button onClick={deleteCategory} className="btn btn-outline-danger  my-4">
              Delete this item
              </button></div>
            </form>
       </Modal.Body>
      
     </Modal>

     <Modal show={modalState=="modal-three"} onHide={handleClose}>
       
       <Modal.Body>
        <form className=" w-75  m-auto  " onSubmit={handleSubmit(UpdateCategory)}>
              <h4> Update Category</h4>
              <div className="form-group ">
                <input
                  type="text"
                  className="form-control my-4"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="w-75 text-danger">name is required</span>
                )}
              </div>
              <button  className="btn btn-success w-100 my-4">
                Up date
              </button>
            </form>
       </Modal.Body>
      
     </Modal>


      <Header>
        <div className="header-content  m-2 text-white  ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10  ">
              <div className="mx-3">
                <h3>Categories Item</h3>
                <p>
                  You can now add your items that any user can order it from the
                  Application and you can edit
                </p>
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
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-3 text-end ">
            <button  onClick={showAddModal} className="btn btn-success">Add New Category </button>
          </div>

         {categoriesList.length > 0? <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
                
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
               
                  <tr key={category.id}>
                    <th scope="row">{category.id}</th>
                    <td>{category.name}</td>
                    <td>
                      <i onClick={()=>showUpdateModal(category)} className="fa fa-edit fs-4 me-2 text-primary"></i>
                      <i onClick={()=>showDeleteModal(category.id)} className="fa fa-trash fs-4 ms-2 text-danger"></i>
                    </td>
                    
                  </tr>
               
              ))}
            </tbody>
          </table>:<NoData/>}
        </div>
      </div>
    </>
  );
} 