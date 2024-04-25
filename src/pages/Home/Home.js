import React, {useEffect} from "react";

import {auth} from "../../config"

import "./index.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  
  const navigate = useNavigate();
  useEffect(() => {
    const user = auth.currentUser;
    if (!user){
      navigate("/auth");
    }
  },[]);


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
