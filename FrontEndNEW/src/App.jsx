import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import UserList from "./pages/UserList";
import UserById from "./pages/UserById";
import UpdateUser from "./pages/UpdateUser";
import ViewUser from "./pages/ViewUser";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ChildRegister from "./pages/ChildRegister";
import ChildList from "./pages/ChildList";
import UpdateChild from "./pages/UpdateChild";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewChild from "./pages/ViewChild";
import AboutUs from "./homepage/AboutUs";
import Appointment from "./pages/Appointment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user-by-id" element={<UserById />} />
        <Route path="/childregister" element={<ChildRegister />} />
        <Route path="/update-user/:userId" element={<UpdateUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/child-list" element={<ChildList />} />
        <Route path="/update-child/:childId" element={<UpdateChild />} />
        <Route path="/view-child/:childId" element={<ViewChild />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
    </Router>
  );
}

export default App;
