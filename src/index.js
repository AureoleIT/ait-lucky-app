import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import LogIn from 'views/auth/Login';
import Register from "views/auth/Register";
import AuthProvider from './context/AuthContext';

ReactDOM.render( 
  // <BrowserRouter>
  //   <Switch>
  //     {/* add routes with layouts */}
  //     <Route path="/admin" component={Admin} />
  //     <Route path="/auth" component={Auth} />
  //     {/* add routes without layouts */}
  //     <Route path="/landing" exact component={Landing} />
  //     <Route path="/profile" exact component={Profile} />
  //     <Route path="/" exact component={Index} />
  //     {/* add redirect for first page */}
  //     <Redirect from="*" to="/" />
  //   </Switch>
  // </BrowserRouter>,
  <AuthProvider>
    <Routes>  
      <Route path='auth/login' element={<LogIn />} />
      <Route path='auth/register' element={<Register />} />
    </Routes>
  </AuthProvider>,
  document.getElementById("root")
);
