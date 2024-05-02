import React, {useEffect} from "react";

import {auth} from "../../config"

import "./index.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import { useNavigate} from "react-router-dom";

export default function Dashboard() {
  
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      
      if (!isAuthenticated) {
        navigate("/auth");
      }
    }
  }, [navigate]);

    useEffect(() => {
      if (!isAuthenticated) {
      localStorage.setItem("isAuthenticated", "true");}
    }, []);
 


  return (
    <>
      <div className="Home">
        {/* // <!----------------------navbar------------------------> */}
        <Header />
        {/* // <!----------------------sidebar------------------------> */}
        <Sidebar />
      </div>
    </>
  );
}
