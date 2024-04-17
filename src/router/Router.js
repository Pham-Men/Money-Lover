import { Routes, Route } from "react-router-dom";
import Master from "../layouts/Master/Master";
import Home from "../pages/Home/Home";
import Regester from "../pages/Regester/Regester";

function Router () {
    return (
        <>
            <Routes path={'/'} element={<Master/>}>
                <Route index element={<Home/>}/>
                <Route path={'/regester'} element={<Regester/>}/>
            </Routes>
        </>
    )
}

export default Router;