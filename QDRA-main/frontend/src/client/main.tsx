import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';


import { createBrowserRouter, createRoutesFromElements, Route, BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import Layout from "./Layout";
import Home from "../components/Home";
import BodySection from "../components/BodySection";
import { link } from "fs";
import { Link } from "react-router-dom";
import Mission from "../components/Mission";
import Upgrade from "../components/Upgrade";
import Referral from "../components/Referral";
import Roadmap from "../components/Roadmap";
import AuthCallback from "../components/AuthCallback";
import Login from "../components/Login";
import Register from "../components/Register";
const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<BodySection/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path="login" element= {<Login/>}/>
      <Route path="register" element= {<Register/>}/>

      <Route path="mission" element={<Mission/>}/>
      <Route path="upgrade" element={<Upgrade/>} />
      <Route path="referral" element={<Referral/>}/>
      <Route path="roadmap" element={<Roadmap/>}/>
      <Route path="/auth/callback" element={<AuthCallback/>} />
      
      
      
    </Route> 
  )
)



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  
     <RouterProvider router={router}/>
 
 
   
  </React.StrictMode>,
);
