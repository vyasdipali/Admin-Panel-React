// import React from "react";
// import ReactDOM from "react-dom/client";

// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
// import "./assets/css/demo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// import AdminLayout from "layouts/Admin.js";
// import Login from "components/Login/Login";


// const root = ReactDOM.createRoot(document.getElementById("root"));
// const token = sessionStorage.getItem('token');

// root.render(
//   <BrowserRouter>
//     <Switch>
//      <Route path="/Login" element={<Login />} />
//       {token ? (
//         <>
//           <Route path="/admin/*" element={<AdminLayout />} />
//           <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
//         </>
//       ) : (
//         <Route path="/" element={<Navigate to="/Login" replace />} />
//       )}
//     </Switch>
//   </BrowserRouter>
// );
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap-icons/font/bootstrap-icons.css';

import AdminLayout from "layouts/Admin.js";
import Login from "components/Login/Login";
import { AuthProvider } from "AuthProvider ";
import Loader from "components/Loader/Loader";
import SingUp from "components/SingUp/SingUp";


const root = ReactDOM.createRoot(document.getElementById("root"));
const token = sessionStorage.getItem('token');

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/SingUp" component={SingUp} />
      {token ? (
        <>
        <AuthProvider>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/admin/dashboard" />
          <Route path="/Loader" element={<Loader/>}/>
          </AuthProvider>
        </>
      ) : (
        <Redirect from="/" to="/Login" />
      )}
    </Switch>
  </BrowserRouter>
);
