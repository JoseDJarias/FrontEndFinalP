import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from "../Home";


function AppRouter() { 
    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                {/* <Route path='/login' element={<About/>}></Route> */}
            </Routes>
        </>
    );
}


export default AppRouter;