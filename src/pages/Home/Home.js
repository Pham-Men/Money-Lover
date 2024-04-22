import React from "react";


import "./index.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

export default function Dashboard() {


  return (
    <div className="Home">
      {/* // <!----------------------navbar------------------------> */}
      <Header />
      {/* // <!----------------------sidebar------------------------> */}
      <Sidebar />
    </div>
  );
}
