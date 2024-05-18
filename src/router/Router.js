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
import { selectorAuth, selectorTransactions, selectorWallets } from "../selector";
import { useEffect } from "react";
import { setUserByLocalStorage } from "../redux/slices/authSlice";
import WalletService from "../services/wallet.service";
import { setWalletsToRedux } from "../redux/slices/walletsSlice";
import { setRevenues, setSpendings } from "../redux/slices/transactionsSlice";

function Router() {
  const dispatch = useDispatch();

  if (localStorage.getItem('userAuth')) {
    dispatch(setUserByLocalStorage(JSON.parse(localStorage.getItem('userAuth'))))
  }
  const userAuth = useSelector(selectorAuth);
  const naviagte = useNavigate()

  useEffect(() => {
    if (!userAuth) {
      naviagte("/auth")
    }

    WalletService.getWallets()
      .then(response => {
        // console.log(response)
        const wallets = response.data.documents.filter(item => (
          item.fields.uid.arrayValue.values.some(i => (i.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid))
        ))
        // console.log(wallets)
        dispatch(setWalletsToRedux(wallets))
      })
      .catch(error => {
        console.error(error);
      });

    WalletService.getTransactions()
      .then(res => {
        WalletService.getTransactions()
          .then(res => {
            // console.log(res.data.documents)
            const listTransaction = res.data.documents
            const listSpending = listTransaction.filter(transaction => (
              transaction.fields.typeof.stringValue === "spending" &&
              transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
            ))
            // console.log(listSpending)
            dispatch(setSpendings(listSpending))

            const listRevenue = listTransaction.filter(transaction => (
              transaction.fields.typeof.stringValue === "revenue" &&
              transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
            ))
            dispatch(setRevenues(listRevenue))
          })
      })
    
  }, [])

  // const walletsByRedux = useSelector(selectorWallets);
  // if (!walletsByRedux.dataWallets.length > 0) {
  //   WalletService.getWallets()
  //     .then(response => {
  //       // console.log(response)
  //       const wallets = response.data.documents.filter(item => (
  //         item.fields.uid.arrayValue.values.some(i => (i.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid))
  //       ))
  //       // console.log(wallets)
  //       dispatch(setWalletsToRedux(wallets))
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }

  // if (transactionsByRedux.listSpending.length <= 0) {
  //   WalletService.getTransactions()
  //     .then(res => {
  //       WalletService.getTransactions()
  //         .then(res => {
  //           // console.log(res.data.documents)
  //           const listTransaction = res.data.documents
  //           const listSpending = listTransaction.filter(transaction => (
  //             transaction.fields.typeof.stringValue === "spending" &&
  //             transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
  //           ))
  //           // console.log(listSpending)
  //           dispatch(setSpendings(listSpending))
  //         })
  //     })
  // }

  // if (transactionsByRedux.listRevenue.length <= 0) {
  //   WalletService.getTransactions()
  //     .then(res => {
  //       WalletService.getTransactions()
  //         .then(res => {
  //           const listTransaction = res.data.documents
  //           const listRevenue = listTransaction.filter(transaction => (
  //             transaction.fields.typeof.stringValue === "revenue" &&
  //             transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
  //           ))
  //           dispatch(setRevenues(listRevenue))
  //         })
  //     })
  // }


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
        <Route path={'/transactions'} element={<Transactions />} />
      </Routes>
    </>
  );
}

export default Router;
