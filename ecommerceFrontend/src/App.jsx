import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Order from "./pages/Order";
import Header from "./pages/header";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import Footer from "./pages/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<Details />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;   
