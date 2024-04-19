import React from 'react';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import styles from './sidebar.module.scss';

import { useState } from 'react';

const Sidebar = () => {
    const [activeButton, setActiveButton] = useState(2);
    const handleClick = (index) => {
      setActiveButton(index);
    };
    
    return (
      <section className="content">
        <div className="container">
          <div
            styles={{ height: "100vh" }}
            className={"row " + styles["row-grid"]}
          >
            <div className="col-3">
              {/* <!----------------------navbar------------------------> */}
              <div
                style={{ width: "80px" }}
                className="p-0 bg-white background-sidebar sidebar z-3 d-flex flex-column align-items-center position-fixed border-right border  top-0 start-0 bottom-0"
              >
                <span className="sidebar-item w-100">
                  <button
                    class=" btn"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#sidebar2"
                  >
                    <MenuOutlinedIcon />
                  </button>
                </span>
                <span className="text-success sidebar-item w-100">
                  <AccountBalanceWalletOutlinedIcon />
                </span>
                <span className="sidebar-item w-100">
                  <LocalGroceryStoreOutlinedIcon />
                </span>
                <span className="sidebar-item w-100">
                  <HelpOutlineOutlinedIcon />
                </span>
              </div>
            </div>
            <div className={"mt-5 col-8"}>
              <div
                className={
                  styles["content"] +
                  " mt-5 d-flex flex-column  justify-content-center align-items-center mt-5"
                }
              >
                <div className={styles["dataWarning"]}>
                  Currently, website is in readonly mode. You can only view your
                  data.
                </div>
                <div className={styles["transaction"] + " mt-4"}>
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      className={
                        `${activeButton === 1 ? styles["active"] : " "}` +
                        " px-4 py-2"
                      }
                      onClick={() => handleClick(1)}
                    >
                      LAST MONTH
                    </button>
                    <button
                      className={
                        `${activeButton === 2 ? styles["active"] : " "}` +
                        " px-4 py-2"
                      }
                      onClick={() => handleClick(2)}
                    >
                      THIS MONTH
                    </button>
                    <button
                      className={
                        `${activeButton === 3 ? styles["active"] : " "}` +
                        " px-4 py-2"
                      }
                      onClick={() => handleClick(3)}
                    >
                      FUTURE
                    </button>
                  </div>
                  <div className={styles["transaction-empty"] + ' d-flex flex-column align-items-center '}>
                      <span className={styles["smile-icon"]}>:-)</span>
                      <span className={styles['note']}>No transactions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -----offcanvas---- */}
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
            <div className={styles["grid-offcanvas"] + " w-100"}>
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
              <div
                className={
                  styles["grid-item"] +
                  " font-bold border-bottom d-flex justify-content-between py-3 align-items-center "
                }
              >
                <span>My wallets</span>
                <span>
                  <ArrowForwardIosOutlinedIcon />{" "}
                </span>
              </div>
            </div>
            <div className={styles["grid-offcanvas"] + " w-100"}>
              <div className={styles[""] + " py-3"}>
                <CategoryOutlinedIcon />
              </div>
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
            </div>
          </div>
        </div>
      </section>
    );
}

export default Sidebar;
