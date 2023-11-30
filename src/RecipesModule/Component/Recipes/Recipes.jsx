import { useForm } from "react-hook-form";
import Header from "../../../SharedModule/Component/Header/Header";
import header from "../../../assets/images/Group 48102127.png";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import NoData from "../../../SharedModule/Component/NoData/NoData";
import Photo from "../../../assets/images/nodata.png";

export default function Recipes() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const addFormData = new FormData();
    addFormData.append("name", data["name"]);
    addFormData.append("Price", data["price"]);
    addFormData.append("description", data["description"]);
    addFormData.append("tagId", data["tagId"]);
    addFormData.append("categoriesIds", data["categoriesIds"]);
    addFormData.append("recipeImage", data["recipeImage"][0]);

    axios
      .post("https://upskilling-egypt.com/api/v1/Recipe/", addFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        setTimeout(toast("Add Success"), 2000);
        handleClose();
        getRecipesList();
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UpdateCategory = (data) => {
    axios
      .put(`https://upskilling-egypt.com/api/v1/Recipe/${itemId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
        getRecipesList();
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
    setItemId(recipeItem.id);
    setValue("name", recipeItem.name);
    setValue("price", recipeItem.price);
    setValue("description", recipeItem.description);
    setValue("categoriesIds", recipeItem.categoriesIds);
    setValue("tagId", recipeItem.tagId);
    setValue("additionalInfo", recipeItem.additionalInfo);
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
        console.log(response);
        setTagList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getRecipesList = () => {
    axios
      .get(
        "https://upskilling-egypt.com/api/v1/Recipe/?pageSize=10&pageNumber=1",
        {
          headers: {
            Authorization: `Bearer${localStorage.getItem("adminToken")}`,
          },
        }
      )
      .then((response) => {
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
        <Modal.Body>
          <form
            className="row g-3 needs-validation "
            onSubmit={handleSubmit(onSubmit)}
          >
            <h4> Add New Item</h4>
            <div className="col-md-12 form-group">
              <input
                type="text"
                className="form-control"
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
                className="form-select"
                placeholder="Category"
                {...register("categoriesIds", { required: true })}
                aria-label="select example"
              >
                {categoriesList?.map((cat) => {
                  <option key={cat.id} value={cat.id}>
                    {" "}
                    {cat.name}
                  </option>;
                })}
              </select>
              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                className="form-control"
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
                className="form-select"
                placeholder="tagId"
              >
                {tagList?.map((tag) => {
                  <option value={tag.id}>{tag.name} </option>;
                })}
              </select>
              {errors.tagId && errors.tagId.type === "required" && (
                <span className="w-75 text-danger">tagId is required</span>
              )}

              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>

            <textarea
              className="form-control "
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
                className="form-control"
                aria-label="file example"
                {...register("additionalInfo", { required: true })}
              />
              {errors.additionalInfo &&
                errors.additionalInfo.type === "required" && (
                  <span className="w-75 text-danger">
                    additionalInfo is required
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
        <Modal.Body>
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(deleteCategory)}
          >
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
        <Modal.Body>
          <form
            className=" w-75  m-auto  "
            onSubmit={handleSubmit(UpdateCategory)}
          >
            <h4> Update Item</h4>
            <div className="col-md-12 form-group">
              <input
                type="text"
                className="form-control"
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
                className="form-select"
                placeholder="Category"
                {...register("categoriesIds", { required: true })}
                aria-label="select example"
              >
                {categoriesList?.map((cat) => {
                  <option key={cat.id} value={cat.id}>
                    {" "}
                    {cat.name}
                  </option>;
                })}
              </select>
              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>
            <div className="col-md-12">
              <input
                type="number"
                className="form-control"
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
                className="form-select"
                placeholder="tagId"
              >
                {tagList?.map((tag) => {
                  <option value={tag.id}>{tag.name} </option>;
                })}
              </select>
              {errors.tagId && errors.tagId.type === "required" && (
                <span className="w-75 text-danger">tagId is required</span>
              )}

              <div className="invalid-feedback">
                Example invalid select feedback
              </div>
            </div>

            <textarea
              className="form-control "
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
                className="form-control"
                aria-label="file example"
                {...register("additionalInfo", { required: true })}
              />
              {errors.additionalInfo &&
                errors.additionalInfo.type === "required" && (
                  <span className="w-75 text-danger">
                    additionalInfo is required
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
        <div className="header-content  m-2 text-white ">
          <div className="row px-4 py-2 g-0 align-Items-center  ">
            <div className="col-sm-10  ">
              <div className="mx-3">
                <h3>Welcom Rere</h3>
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
          <div className="col-md-3 text-end ">
            <button onClick={showAddModal} className="btn btn-success">
              Add New Item{" "}
            </button>
          </div>

          {recipeList.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">RecipeName</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Description</th>
                  <th scope="col">Tag</th>
                  <th scope="col">category</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {recipeList.map((recipe) => (
                  <tr key={recipe.id}>
                    <th scope="row">{recipe.id}</th>
                    <td>{recipe.name}</td>
                    <td>
                      <div className="image">
                        <img
                          className="w-100 img-fluid"
                          src={
                            `https://upskilling-egypt.com/` + recipe.imagePath
                          }
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe?.category[0]?.name}</td>
                    <td>
                      <i
                        onClick={() => showUpdateModal(recipe)}
                        className="fa fa-edit fs-4 me-2 text-primary"
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
        </div>
      </div>
    </>
  );
}