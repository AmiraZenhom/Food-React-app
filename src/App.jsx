import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MasterLayout from "./SharedModule/Component/MasterLayout/MasterLayout";
import NotFound from "./SharedModule/Component/NotFound/NotFound";
import Home from "./HomeModule/Component/Home/Home";
import UserList from "./UserModule/Component/UserList/UserList";
import Categories from "./CategoriesModule/Component/Categories/Categories";
import Recipes from "./RecipesModule/Component/Recipes/Recipes";
import AuthLayout from "./SharedModule/Component/AuthLayout/AuthLayout";
import Login from "./AuthModule/component/Login/Login";
import ForgetPass from "./AuthModule/component/ForgetPass/ForgetPass";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./SharedModule/Component/ProtectedRoute/ProtectedRoute";
import RequestPass from "./AuthModule/component/RequestPass/RequestPass";
import ResetPassword from "./AuthModule/component/ResetPassword/ResetPassword";
import Header from "./SharedModule/Component/Header/Header";
import Register from "./AuthModule/component/Register/Register";

useState;
function App() {
  const [adminData, setAdminData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  let saveAdminData = () => {
    let encodedToken = localStorage.getItem("adminToken");
    try {
      let decodedToken = jwtDecode(encodedToken);
      setAdminData(decodedToken);
    } catch (error) {
      setAdminData(null);
    }
  };
  const routes = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: "true", element: <Home /> },
        { path: "/dashboard/user", element: <UserList /> },
        { path: "/dashboard/categories", element: <Categories /> },
        { path: "/dashboard/Recipes", element: <Recipes /> }
      ],
    },

    {
      path: "/",
      element: <AuthLayout adminData={adminData} />,
      errorElement: <NotFound />,
      children: [
        { index: "true", element: <Login saveAdminData={saveAdminData} /> },
        { path: "/login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "/forgetPass", element: <ForgetPass /> },
        { path: "/requestPass", element: <RequestPass /> },
        { path: "/resetPassword", element: <ResetPassword /> },
        {
          path: "/register",
          element: <Register  />,
        },
        { path: "/header", element: <Header /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
