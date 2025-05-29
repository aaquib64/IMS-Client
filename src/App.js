import React, { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";
import "./index.css";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddProducts from "./Components/AddProducts";
import ProductList from "./Components/ProductList";
import UpdateProduct from "./Components/UpdateProduct";
import WishList from "./Components/WishList";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<AddProducts />} />
        <Route path="/list" element={<ProductList />} />
        <Route path="/update/:_id" element={<UpdateProduct />} />
        <Route path="/wishlist" element={<WishList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
