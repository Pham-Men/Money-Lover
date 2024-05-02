import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";


import styles from "./sidebar.module.scss";

import { useState } from "react";

import { useSelector } from "react-redux";
import Offcanvas from "./Offcanvas";
import { unstable_ClassNameGenerator } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(2);
  const handleClick = (index) => {
    setActiveButton(index);
  };
  const isOpen = useSelector((state) => state.sidebar.isOpen);

  const toTransactions = () => {
    navigate('/transactions')
  }

  return (
    <section className=" content ">
      <div className=" container">
        <div
          styles={{ height: "100vh" }}
          className={"row " + styles["row-grid"]}
        >
          <div className="col-3">
            {/* <!----------------------navbar------------------------> */}
            <div
              style={{ width: "80px" }}
              className={
                "p-0 bg-white h-100 sidebar z-3 d-flex flex-column align-items-center position-fixed border-right border top-0 start-0 bottom-0 text-center " +
                `${isOpen ? "d-block" : "d-none"}` +
                " d-md-block"
              }
            >
              <span
                className={styles["sidebar-item"] + " py-3 d-block w-100 p-3"}
              >
                <button
                  className=" btn"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#sidebar2"
                >
                  <MenuOutlinedIcon />
                </button>
              </span>
              <span
                onClick={toTransactions}
                className={
                  styles["sidebar-item-menu"] +
                  " text-success border-bottom mt-3 py-5 gap-2 border-success d-block flex-column d-flex align-items-center sidebar-item w-100"
                }
              >
                <AccountBalanceWalletOutlinedIcon />
                <small>Transactions</small>
              </span>
              <span
                className={
                  styles["sidebar-item"] +
                  " py-5 gap-2 d-block flex-column d-flex align-items-center sidebar-item w-100"
                }
              >
                <LocalGroceryStoreOutlinedIcon />
                <small>Store</small>
              </span>
              <span
                className={
                  styles["sidebar-item"] +
                  " py-5 d-block flex-column d-flex align-items-center gap-2 sidebar-item w-100"
                }
              >
                <HelpOutlineOutlinedIcon />
                <small>Help</small>
              </span>
            </div>
          </div>
          <div className={styles["contentHome"] + " mt-5 col-8 "}>
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
                      " px-4 py-2 text-secondary " 
                    }
                    onClick={() => handleClick(1)}
                  >
                    LAST MONTH
                  </button>
                  <button
                    className={
                      `${activeButton === 2 ? styles["active"] : " "}` +
                      " px-4 py-2 text-secondary " 
                    }
                    onClick={() => handleClick(2)}
                  >
                    THIS MONTH
                  </button>
                  <button
                    className={
                      `${activeButton === 3 ? styles["active"] : " "}` +
                      " px-4 py-2 text-secondary " 
                    }
                    onClick={() => handleClick(3)}
                  >
                    FUTURE
                  </button>
                </div>
                <div
                  className={
                    styles["transaction-empty"] +
                    " d-flex flex-column align-items-center "
                  }
                >
                  <span className={styles["smile-icon"]}>:-)</span>
                  <span className={styles["note"]}>No transactions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas />
    </section>
  );
};

export default Sidebar;
