import React, {useState} from 'react';
import styles from "./sidebar.module.scss";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import {Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth} from "../../../config";
import { useNavigate } from "react-router-dom";




const Offcanvas = ({}) => {

    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    const modal = document.querySelector(".modal-backdrop");   

    const SignOut = () => {
        
               auth
                 .signOut()
                 .then(() => {
                    
                   
                    navigate("/logout");
                    
                 })
                 .catch((error) => {
                   console.error("Đã xảy ra lỗi khi đăng xuất:", error);
                 });
          
    }

    const Test = () => {
        const user = auth.currentUser;
        console.log(user);
    }
    
    
    return (
      <>
        <div
          className={styles["offcanvas-sidebar"] + " offcanvas offcanvas-start"}
          id="sidebar2"
        >
          <div className="d-flex justify-content-center my-4 pt-4 pb-5 border-bottom align-items-center">
            <div className={styles["avartar"] + " position-relative"}>
              <span className={styles["avartarIntro"] + " position-absolute"}>
                basic account
              </span>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <div
              className={styles["grid-offcanvas"] + " btn p-0 w-100 "}
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <div className={styles[""] + " py-3 text-secondary"}>
                <PermIdentityOutlinedIcon />
              </div>

              <div
                className={
                  styles["grid-item"] +
                  " font-bold border-bottom d-flex justify-content-between py-3 align-items-center "
                }
              >
                <span>My Account</span>
                <span>
                  <ArrowForwardIosOutlinedIcon />{" "}
                </span>
              </div>
            </div>

            <div className={styles["grid-offcanvas"] + " w-100"}>
              <div className={styles[""] + " py-3 text-secondary"}>
                <AccountBalanceWalletOutlinedIcon />
              </div>
              <Link to="/my-wallets" className="text-decoration-none">
                <div
                  className={
                    styles["grid-item"] +
                    " font-bold border-bottom d-flex justify-content-between py-3 align-items-center "
                  }
                >
                  <span>My Wallets</span>

                  <span>
                    <ArrowForwardIosOutlinedIcon />{" "}
                  </span>
                </div>
              </Link>
            </div>
            <div className={styles["grid-offcanvas"] + " w-100"}>
              <div className={styles[""] + " py-3"}>
                <CategoryOutlinedIcon />
              </div>
              <Link to="/categories" className="text-decoration-none">
                <div
                  className={
                    styles["grid-item"] +
                    " font-bold border-bottom d-flex justify-content-between py-3 align-items-center "
                  }
                >
                  <span>Categories</span>
                  <span>
                    <ArrowForwardIosOutlinedIcon />{" "}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* modal */}
        <div className="modal " id="myModal" aria-hidden="false">
  
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn-close me-4"
                    data-bs-dismiss="modal"
                  ></button>
                  <h4 className="p-0 m-0">My Account</h4>
                </div>
                <div>
                  <button
                    onClick={SignOut}
                    className={"btn m-0 me-2 text-success " + styles["signout"]}
                    data-bs-dismiss="modal"
                  >
                    <h6>Sign Out</h6>
                  </button>
                </div>
              </div>

              <div className="modal-body">Modal body..</div>

              <div className="modal-footer">
                <button
                  onClick={Test}
                  type="button"
                  className="btn text-danger"
                  data-bs-dismiss="modal"
                >
                  Delete Account
                </button>
                <button
                  className="btn bg-success text-light"
                  onClick={() => {
            
                    navigate("/change-password");
                    window.location.reload();
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Offcanvas;
