import { NavLink } from "react-router-dom"
import { ComingSoonAdminComponent } from "../../comingSoon/ComingSoonAdmin"
import { Button } from "react-bootstrap"

export const ProductReviews = () => {
    return (
        <>
            <NavLink to='/product/admin/'>
                <Button variant="primary" >Go back to admin panel!</Button>
            </NavLink>
            <ComingSoonAdminComponent />
        </>
    )
}