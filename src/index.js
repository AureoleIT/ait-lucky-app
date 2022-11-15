import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Index from "pages";
import LogIn from 'views/auth/Login';
import Register from "views/auth/Register";
import AuthProvider from './context/AuthContext';
import Login from "pages/auth/login";
import EventDetail from "pages/_eventdetail";
import EventRewardRegister from "pages/_registergift";
import EventRegister from "pages/_joinevent";

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
  <BrowserRouter>
    <Switch>
      <Route path="/auth/login" exact component={Login} />
      <Route path="/auth/register" exact component={Register} />
      <Route path="/" exact component={Index} />
      <Route path="/_registergift" exact component={EventRewardRegister} />
      <Route path="/_joinevent" exact component={EventRegister} />
      <Route path="/_eventdetail" exact component={EventDetail} />
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  // <AuthProvider>
  //   <Routes>  
  //     <Route path='auth/login' element={<LogIn />} />
  //     <Route path='auth/register' element={<Register />} />
  //   </Routes>
  // </AuthProvider>,
  document.getElementById("root")
);
