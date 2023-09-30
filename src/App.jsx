import { RouterProvider, createHashRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import NotFound from "./components/NotFound/NotFound";
import Register from "./components/register/Register";
import Products from "./components/products/Products";
import { AuthProvider } from "./components/context/authentication";
import Brands from "./components/brands/Brands";
import Categories from "./components/categories/Categories";
import Profile from "./components/profile/Profile";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/productDetails/ProductDetails";
import Cart from "./components/Cart/Cart";
import CartContextProvider from "./components/context/cartContext";
import { Toaster } from "react-hot-toast";
import WishContextProvider from "./components/context/wishListContext";
import Wishlist from "./components/Wishlist/Wishlist";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";

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
      { path: "products/category/:cId", element: <Products /> },
      { path: "products/brands/:bId", element: <Products /> },
      { path: "productDetails/:id", element: <ProductDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "brands", element: <Brands /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <WishContextProvider>
        <CartContextProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </CartContextProvider>
      </WishContextProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
export default App;
