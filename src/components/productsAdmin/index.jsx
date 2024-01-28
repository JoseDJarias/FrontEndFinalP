import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import ProductList from "./ProductList"

export const ProductAdmin = () => {
    

    return (
        <>
            <NavLink to={`/product/admin/create`}> 
                <Button variant="primary" >Create a Product!</Button>
            </NavLink>
            <NavLink to={`/product/admin/category/`}> 
                <Button variant="primary" >Categories!</Button>
            </NavLink>
            <NavLink to={`/product/admin/reviews`}> 
                <Button variant="primary" >Users Reviews</Button>
            </NavLink>
            <NavLink to={`/product/admin/payment/`}> 
                <Button variant="primary" >Payment Methods!</Button>
            </NavLink>

            <ProductList></ProductList>



        </>


    
        )
    }
    
