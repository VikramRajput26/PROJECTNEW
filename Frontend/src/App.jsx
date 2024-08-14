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
import ViewChild from "./pages/ViewChild";
import AboutUs from "./homepage/AboutUs";
import AppointmentList from "./newpage/AppointmentList";
import ViewApt from "./newpage/ViewApt";
import EditApt from "./newpage/EditApt";
import Appointment from "./pages/Appointment"; // Import Appointment component
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/appointment-list" element={<AppointmentList />} />

        {/* Protected Routes */}
        <Route
          path="/user-list"
          element={<PrivateRoute element={<UserList />} />}
        />
        <Route
          path="/user-by-id"
          element={<PrivateRoute element={<UserById />} />}
        />
        <Route
          path="/update-user/:userId"
          element={<PrivateRoute element={<UpdateUser />} />}
        />
        <Route
          path="/view-user/:id"
          element={<PrivateRoute element={<ViewUser />} />}
        />
        <Route
          path="/childregister"
          element={<PrivateRoute element={<ChildRegister />} />}
        />
        <Route
          path="/child-list"
          element={<PrivateRoute element={<ChildList />} />}
        />
        <Route
          path="/update-child/:childId"
          element={<PrivateRoute element={<UpdateChild />} />}
        />
        <Route
          path="/view-child/:childId"
          element={<PrivateRoute element={<ViewChild />} />}
        />
        <Route
          path="/appointments"
          element={<PrivateRoute element={<AppointmentList />} />}
        />
        <Route
          path="/appointments/:id"
          element={<PrivateRoute element={<ViewApt />} />}
        />
        <Route
          path="/appointments/edit/:id"
          element={<PrivateRoute element={<EditApt />} />}
        />
        <Route
          path="/appointmentregister"
          element={<PrivateRoute element={<Appointment />} />} // Route for Appointment
        />
      </Routes>
    </Router>
  );
}

export default App;
