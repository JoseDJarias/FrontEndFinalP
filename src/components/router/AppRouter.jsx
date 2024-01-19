import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from "../Home";
import { Login } from "../sessions/Login";
import { Logout } from "../sessions/Logout";
import { Signup } from "../sessions/Signup";
import { ApplicationNavbar } from "../shared/navbar";
import { Product } from "../../pages/Product";
import { ProductAdmin } from "../../pages/ProductAdmin";
import { UserProfile } from "../../pages/UserProfile";
import { CreateProduct } from "../productsAdmin/CreateProduct";
import { CreateCategories } from "../productsAdmin/CreateCategories";
import { ProductPictureForm } from "../productsAdmin/ProductPictureForm";
import { ProductReviews } from "../productsAdmin/ProductReviews";




function AppRouter() { 
    return (
        <>
            <ApplicationNavbar/>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>
                <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/profile' element={<UserProfile/>}></Route>
                <Route path='/product' element={<Product/>}></Route>
                <Route path='/product/admin' element={<ProductAdmin/>}></Route>
                <Route path='/product/admin/create' element={<CreateProduct/>}></Route>
                <Route path='/product/admin/category/create' element={<CreateCategories/>}></Route>
                <Route path='/product/admin/create/picture' element={<ProductPictureForm/>}></Route>
                <Route path='/product/admin/reviews' element={<ProductReviews/>}></Route>



            </Routes>
        </>
    );
}


export default AppRouter;