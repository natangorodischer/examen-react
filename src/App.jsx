import { Route, Routes, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import CartPage from "./pages/Cart";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFound from "./pages/NotFound";
import PizzaPage from "./pages/Pizza";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";

const App = () => {
  const { token } = useUser(); 

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pizzas">
            <Route path=":id" element={<PizzaPage />} />
          </Route> 
          <Route path="/cart" element={<CartPage />} />
          
          
          <Route 
            path="/profile" 
            element={token ? <ProfilePage /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/login" 
            element={token ? <Navigate to="/" /> : <LoginPage />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/" /> : <RegisterPage />} 
          />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;