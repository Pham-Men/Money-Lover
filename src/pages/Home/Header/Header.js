import React, { useState, useEffect } from "react";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";


import { useDispatch } from "react-redux";
import { toggleSidebar } from '../../../redux/slices/sidebarSlice';

const Header = () => {
    const [showTag, setShowTag] = useState(true);

    useEffect(() => {
      const handleResize = () => {

        if (window.innerWidth < 768) {

          setShowTag(false);
        } else {
          setShowTag(true);
        }
      };

      window.addEventListener("resize", handleResize);


      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const dispatch = useDispatch();

    const ToggleSidebarHandler = () => {
        dispatch(toggleSidebar());
        
    }
    return (
      <div>
        <section className="nav-bar z-2 fixed-top bg-white">
          <nav className="position-relative mx-3 navbar navbar-expand-lg bg-white">
            
              <button
                className="position-fixed me-3 d-md-none top-24px left-5px"
                onClick={ToggleSidebarHandler}
              >
                <MenuOutlinedIcon />
              </button>
              <div className="me-3 ms-2 container-fluid">
                <div className=" align-items-center me-3 ms-5 d-flex justify-content-between">
                  <a className="mx-0 navbar-brand" href="#">
                    <img
                      width="40"
                      className="img-fluid"
                      src={"img/logoHome.png"}
                    />
                  </a>
                  <div className="mx-0 dropdown show d-flex dropdown flex-column jutify-content-between">
                    <span className=" p-0 small-text text-secondary ">
                      Total
                      <ArrowDropDownIcon />
                    </span>
                    <span className=" p-0 font-bold small-text ">0đ</span>
                  </div>
                </div>
                <button
                  className="navbar-toggler border border-0"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fa-solid fa-bars text-white"></i>
                </button>
                <div className=" hover d-flex gap-4 mr-4">
                  <a className="nav-link active" href="index.html">
                    <CalendarMonthIcon />
                  </a>

                  <a className="nav-link" href="sign-up.html">
                    <RemoveRedEyeIcon />
                  </a>

                  <a className="nav-link" href="DOCUMENTS.html">
                    <SearchIcon />
                  </a>
                </div>
              
            </div>
          </nav>
        </section>
      </div>
    );
}

export default Header;
