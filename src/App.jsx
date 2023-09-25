import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/cart/Layout";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import { AuthProvider } from "./components/context/authentication";
import Brands from "./components/brands/Brands";
import Categories from "./components/categories/Categories";
import Features from "./components/features/Features";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      { path: "features", element: <Features /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
export default App;
