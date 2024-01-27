import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from "../Home";
import { Login } from "../sessions/Login";
import { Logout } from "../sessions/Logout";
import { Signup } from "../sessions/Signup";
import { ApplicationNavbar } from "../shared/navbar";
import { Product } from "../../components/products/Product";
import { ProductAdmin } from "../productsAdmin";
import { UserProfile } from "../../components/profile/UserProfile";
import { CreateProduct } from "../productsAdmin/CreateProduct";
import { ProductPictureForm } from "../productsAdmin/ProductPictureForm";
import { ProductReviews } from "../productsAdmin/reviews/ProductReviews";
import { PaymentIndex } from "../productsAdmin/payment";
import { ShoppingCart } from "../products/shoppingcart";
import { CategoryIndex } from "../productsAdmin/categories";
import { CreateCategories } from "../productsAdmin/categories/CreateCategories";
import { CreatePaymentMethod } from "../productsAdmin/payment/CreatePaymentMethod";
import { Checkout } from "../products/shoppingcart/Checkout";
import { UserPurshases } from "../userPurshases/UserPurshases";
import { ComingSoonAdminComponent } from "../comingSoon/ComingSoonAdmin";
import { ComingSoonUserComponent } from "../comingSoon/ComingSoonUser";





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
                <Route path='/cart' element={<ShoppingCart/>}></Route>
                <Route path='/product' element={<Product/>}></Route>
                <Route path='/product/purshases' element={<UserPurshases/>}></Route>
                <Route path='/product/admin' element={<ProductAdmin/>}></Route>
                <Route path='/product/cart' element={<ShoppingCart/>}></Route>
                <Route path='/product/cart/checkout' element={<Checkout/>}></Route>
                <Route path='/product/admin/create' element={<CreateProduct/>}></Route>
                <Route path='/product/admin/category/' element={<CategoryIndex/>}></Route>
                <Route path='/product/admin/category/create' element={<CreateCategories/>}></Route>
                <Route path='/product/admin/create/picture' element={<ProductPictureForm/>}></Route>
                <Route path='/product/admin/reviews' element={<ProductReviews/>}></Route>
                <Route path='/product/admin/payment/' element={<PaymentIndex/>}></Route>
                <Route path='/product/admin/payment/create' element={<CreatePaymentMethod/>}></Route>
                <Route path='/coming/soon/admin' element={<ComingSoonAdminComponent/>}></Route>
                <Route path='/coming/soon/user' element={<ComingSoonUserComponent/>}></Route>




            </Routes>
        </>
    );
}


export default AppRouter;