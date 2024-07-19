import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import "./styles/main.css";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./components/protectedRoute";
import CartProvider from "./context/cart/CartProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/Login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
