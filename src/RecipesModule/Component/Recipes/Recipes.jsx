import { useForm } from "react-hook-form";
import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/Group 48102127.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import Photo7 from "../../../assets/images/download.png";
import Photo from "../../../assets/images/nodata.png";

export default function Recipes() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getNameValue = (input) => {
    setSearch(input.target.value);
    getRecipesList(1, input.target.value);
  };
  const [pagesArray, setPagesArray] = useState([]);
  const onSubmit = (data) => {
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("price", +data["price"]);
    addFormData.append("description", data["description"]);
    addFormData.append("tagId", data["tagId"]);
    addFormData.append("categoriesIds", data["categoriesIds"]);
    addFormData.append("recipeImage", data["recipeImage"][0]);

    axios
      .post("https://upskilling-egypt.com/api/v1/Recipe/", addFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
           "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
       
        handleClose();
        getRecipesList();
        toast.success("Add Successfully");
      })
      .catch((error) => {
        toast(error?.response?.data?.message || "error");
      });
  };

  const deleteCategory = () => {
    axios
      .delete(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getRecipesList();
        toast.success("Delete Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateCategory = (data) => {
    const upDateFormData = new FormData();
    upDateFormData.append("name", data["name"]);
    upDateFormData.append("price", +data["price"]);
    upDateFormData.append("description", data["description"]);
    upDateFormData.append("tagId", data["tagId"]);
    upDateFormData.append("categoriesIds", data["categoriesIds"]);
    upDateFormData.append("recipeImage", data["recipeImage"][0]);
    
    axios
      .put(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, upDateFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getRecipesList();
        toast.success("Up date Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const [show, setShow] = useState(false);
  const handleClose = () => setModalState("close");
  // const handleShow = () => setShow(true);

  const [recipeList, setRecipeList] = useState([]);
  const [modalState, setModalState] = useState("close");
  const [itemId, setItemId] = useState(0);
  const [tagList, setTagList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [search, setSearch] = useState("");
  const showAddModal = () => {
    getAllTag();
    getCategoriesList();
    setValue("name", null);
    setModalState("modal-one");
  };
  const showDeleteModal = (id) => {
    setItemId(id);
    setModalState("modal-two");
  };
  const showUpdateModal = (recipeItem) => {
    getAllTag();
    getCategoriesList();
    setItemId(recipeItem.id);
    console.log(recipeItem);
    setValue("name", recipeItem.name);
    setValue("price", recipeItem.price);
    setValue("description", recipeItem.description);
    setValue("categoriesIds", recipeItem.category[0].id);
    setValue("tagId", recipeItem.tag.id);
    setValue("recipeImage", recipeItem.recipeImage);
    setModalState("modal-three");
  };
  const getAllTag = () => {
    axios
      .get("https://upskilling-egypt.com/api/v1/tag/", {
        headers: {
          Authorization: `Bearer${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log({ tagList: response.data });

        setTagList(response?.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRecipesList = (pageNu, name) => {
    axios
      .get("https://upskilling-egypt.com/api/v1/Recipe/", {
        headers: {
          Authorization: `Bearer${localStorage.getItem("adminToken")}`,
        },
        params: {
          pageSize: 5,
          pageNumber: pageNu,
          name: name,
        },
      })
      .then((response) => {
        setPagesArray(
          Array(response.data.totalNumberOfPages)
            .fill()
            .map((_, i) => i + 1)
        );
        console.log(response);
        setRecipeList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCategoriesList = () => {
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
        setCategoriesList(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getRecipesList();
  }, []);

  return (
    <>
      <Modal show={modalState == "modal-one"} onHide={handleClose}>
        <Modal.Body className="mod1">
          <form
            className="row g-3 needs-validation  "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4 className="text-success"> Add New Item</h4>
            <div className="col-md-12 form-group">
              <input
                type="text"
                className="form-control border-success"
                id="validationCustom01"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="w-75 text-danger">name is required</span>
              )}
              <div className="valid-feedback">Looks good!!</div>
            </div>
            <div className="col-md-12">
              <select
                className="form-select border-success"
                placeholder="Category"
                {...register("categoriesIds", { required: true })}
                aria-label="select example"
              >
                {categoriesList?.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {" "}
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback border-success">
                Example invalid select feedback
              </div>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                className="form-control border-success"
                id="validationCustom02"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price && errors.price.type === "required" && (
                <span className="w-75 text-danger">price is required</span>
              )}

              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-12 form-group">
              <select
                {...register("tagId", { required: true })}
                className="form-select border-success"
                placeholder="tagId"
              >
                {tagList?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}{" "}
                  </option>
                ))}
              </select>
              {errors.tagId && errors.tagId.type === "required" && (
                <span className="w-75 text-danger">tagId is required</span>
              )}

              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>

            <textarea
              className="form-control border-success  "
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <span className="w-75 text-danger">Description is required</span>
            )}

            <div className="mb-3">
              <input
                type="file"
                className="form-control border-success"
                aria-label="file example"
                {...register("recipeImage", { required: true })}
              />
              {errors.recipeImage &&
                errors.recipeImage.type === "required" && (
                  <span className="w-75 text-danger">
                    recipeImage is required
                  </span>
                )}
              <div className="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-3  ">
                <button
                  onClick={handleClose}
                  className="btn btn-danger w-100 my-2 "
                >
                  Cancel
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-success w-100 my-2">Add</button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={modalState == "modal-two"} onHide={handleClose}>
        <Modal.Body className="mod ">
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(deleteCategory)}
          >
            <div className="text-center ">
              <img src={Photo7} alt="nodata" />
              <h4 className="text-danger"> Delete This Category ?</h4>
              <p className="text-danger">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </div>
            <div className="text-end">
              <button
                onClick={deleteCategory}
                className="btn btn-outline-danger  my-4"
              >
                Delete this item
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={modalState == "modal-three"} onHide={handleClose}>
        <Modal.Body className="mod1">
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(UpdateCategory)}
          >
            <h4 className="text-success py-3"> Up date Item</h4>
            <div className="col-md-12 form-group ">
              <input
                type="text"
                className="form-control mb-3 border-success"
                id="validationCustom01"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name && errors.name.type === "required" && (
                <span className="w-75 text-danger">name is required</span>
              )}
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-12">
              <select
                className="form-select mb-3 border-success"
                placeholder="Category"
                {...register("categoriesIds", { required: true })}
                aria-label="select example"
              >
                {categoriesList?.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {" "}
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                className="form-control mb-3 border-success"
                id="validationCustom02"
                placeholder="Price"
                {...register("price", { required: true })}
              />
              {errors.price && errors.price.type === "required" && (
                <span className="w-75 text-danger">price is required</span>
              )}

              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-12 form-group">
              <select
                {...register("tagId", { required: true })}
                className="form-select mb-3 border-success"
                placeholder="tagId"
              >
                {tagList?.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}{" "}
                  </option>
                ))}
              </select>
              {errors.tagId && errors.tagId.type === "required" && (
                <span className="w-75 text-danger">tagId is required</span>
              )}

              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>

            <textarea
              className="form-control mb-3 border-success"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Description"
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && errors.description.type === "required" && (
              <span className="w-75 text-danger">Description is required</span>
            )}

            <div className="mb-3">
              <input
                type="file"
                className="form-control mb-3 border-success"
                aria-label="file example"
                {...register("recipeImage", { required: true })}
              />
              {errors.recipeImage && errors.recipeImage.type === "required" && (
                <span className="w-75 text-danger">
                  recipeImage is required
                </span>
              )}
              <div className="invalid-feedback">
                Example invalid form file feedback
              </div>
            </div>

            <button className="btn btn-success w-100 my-4">Up date</button>
          </form>
        </Modal.Body>
      </Modal>

        <Header>
        <div className="header-content  mx-2 text-white  ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10 mt-4 ps-5  ">
              <div className="mx-3">
                <h3>Recipes Items</h3>
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

      <div className=" mx-3 py-4  px-3 ">
        <div className=" row align-items-center  ">
          <div className="col-md-9 text-success">
            <h4>Recipe Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-3 text-end pb-4 px-5  ">
            <button onClick={showAddModal} className="btn btn-success ">
              Add New Item{" "}
            </button>
          </div>
          <input
            onChange={getNameValue}
            className="form-control my-4 border-success "
            type="text"
            placeholder="search by recipe name"
          />
          {recipeList.length > 0 ? (
            <table className="table mx-3  table-hover   text-center container-fluid ">
              <thead className="table-warning">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {recipeList.map((recipe, index) => (
                  <tr key={recipe.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{recipe.name}</td>
                    <td className="">
                      <div className="image   m-auto ">
                        {recipe.imagePath ? (
                          <img
                            className="w-100 img-fluid"
                            src={
                              `https://upskilling-egypt.com/` + recipe.imagePath
                            }
                            alt=""
                          />
                        ) : (
                          <div>
                            <img
                              className="w-50"
                              src={Photo}
                              alt="image error"
                            />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>
                      <i
                        onClick={() => showUpdateModal(recipe)}
                        className="fa fa-edit fs-4 me-2 text-success"
                      ></i>
                      <i
                        onClick={() => showDeleteModal(recipe.id)}
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
          <div className="d-flex justify-content-center my-5">
            <nav aria-label="...">
              <ul className="pagination pagination-sm">
                {pagesArray.map((pageNu) => (
                  <li
                    key={pageNu}
                    onClick={() => getRecipesList(pageNu, search)}
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
        </div>
      </div>
    </>
  );
}
