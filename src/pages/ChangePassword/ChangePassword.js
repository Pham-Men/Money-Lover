import React, {useState, useEffect} from 'react';
import { auth } from '../../config';
import { updatePassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import styles from "./ChangePassword.module.scss";

const ChangePassword = () => {
  


  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


   const handleChangePassword = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const providerData = currentUser.providerData;
      if (providerData[0].providerId === 'google.com'){
        alert("bạn đang đăng nhập bằng google không thể đổi mật khẩu");
      }
      else {
        if ( newPassword && newPassword === confirmPassword){
          updatePassword(currentUser,newPassword)
          .then(() => {
            alert('đổi mật khẩu thành công');
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi đổi mật khẩu:", error);
          });
        }
        else {
          alert('mật khẩu không trùng khớp');
        }
      }
    }
     
   };

   const navigate = useNavigate();
   const toHome = () => {
    navigate('/')
   }


    return (
      <>
        <section className={"nav-bar z-2 fixed-top " + styles["header"]}>
          <nav className="position-relative mx-3 navbar navbar-expand-lg">
            <div className="me-3 ms-2 container-fluid">
              <div className=" align-items-center me-3 ms-5 d-flex justify-content-between">
                <a className={"mx-0 navbar-brand "  } onClick={toHome}>
                  <KeyboardArrowLeftIcon  className={styles["button"]}/>
                </a>
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
              <div className=" hover d-flex gap-4 mr-4"></div>
            </div>
          </nav>
        </section>
        <section className="sign-up mt-5">
          <div className="container mt-5 d-flex justify-content-around align-items-center">
            <div className="d-flex flex-column  justify-content-between align-items-center mt-5">
              <h1 className="text-center">Change password</h1>
              <div className="mt-5 w-50">
                <div className="row">
                  <div className=" my-3 col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className=" my-3 col-md-12">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className=" my-3 col-md-12">
                    <a
                      onClick={handleChangePassword}
                      className="btn w-100 btn-block bg-success"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );

}

export default ChangePassword;
