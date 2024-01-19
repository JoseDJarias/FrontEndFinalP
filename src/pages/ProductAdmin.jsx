import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import ProductList from "../components/productsAdmin/ProductList"

export const ProductAdmin = () => {
    

    return (
        <>
            <NavLink to={`/product/admin/create`}> 
                <Button variant="primary" >Create a Product!</Button>
            </NavLink>
            <NavLink to={`/product/admin/category/create`}> 
                <Button variant="primary" >Create a Category!</Button>
            </NavLink>
            <NavLink to={`/product/admin/reviews`}> 
                <Button variant="primary" >Users Reviews</Button>
            </NavLink>

            <ProductList></ProductList>



        </>


    
        )
    }
    
