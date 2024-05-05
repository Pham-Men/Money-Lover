import { Routes, Route, useNavigate } from "react-router-dom";
import Master from "../layouts/Master/Master";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import MyWallets from "../pages/MyWallets/MyWallets";
import LogOut from "../pages/LogOut/LogOut";
import Categories from "../pages/Categories/Categories";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import Transactions from "../pages/Transactions/Transactions";
import { useDispatch, useSelector } from 'react-redux';
import { selectorAuth } from "../selector";
import { useEffect } from "react";
import { setUserByLocalStorage } from "../redux/slices/authSlice";

function Router() {

  
  const dispatch = useDispatch();
  
  if (localStorage.getItem('userAuth')) {
    dispatch(setUserByLocalStorage(JSON.parse(localStorage.getItem('userAuth'))))
  }
  const userAuth = useSelector(selectorAuth);
  const naviagte = useNavigate()
  
  useEffect(() => {
      if(!userAuth.uid) {
          naviagte("/auth")
      }
  }, [])

  return (
    <>
      <Routes path={"/"} element={<Master />}>
        <Route index element={<Home />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/auth"} element={<LogIn />} />
        <Route path={"/my-wallets"} element={<MyWallets />} />
        <Route path={"/logout"} element={<LogOut />} />
        <Route path={"/categories"} element={<Categories />} />
        <Route path={"/change-password"} element={<ChangePassword />} />
        <Route path={'/transactions'} element={<Transactions/>}/>
      </Routes>
    </>
  );
}

export default Router;
