import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from "../Home";
import { Login } from "../sessions/Login";
import { Logout } from "../sessions/Logout";
import { Signup } from "../sessions/Signup";
import { ApplicationNavbar } from "../shared/navbar";



function AppRouter() { 
    return (
        <>
            <ApplicationNavbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>

            </Routes>
        </>
    );
}


export default AppRouter;