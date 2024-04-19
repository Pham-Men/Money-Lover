import { Routes, Route } from "react-router-dom";
import Master from "../layouts/Master/Master";
import Dashboard from "../pages/Home/Dashboard";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogIn/LogIn";
import MyWallets from "../pages/MyWallets/MyWallets";
import LogOut from "../pages/LogOut/LogOut";

function Router () {
    return (
        <>
            <Routes path={'/'} element={<Master/>}>
                <Route index element={<Dashboard/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/auth'} element={<LogIn/>}/>
                <Route path={'/my-wallets'} element={<MyWallets/>}/>
                <Route path={'/logout'} element={<LogOut/>}/>
            </Routes>
        </>
    )
}

export default Router;