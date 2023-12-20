import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from "../Home";
import { Login } from "../sessions/Login";


function AppRouter() { 
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </>
    );
}


export default AppRouter;