import { useState } from "react"
import { useEffect } from "react"
import BillService from "../../services/ProductsService/Bills.service"
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import LocalStorageService from "../../services/LocalStorage.service";
import ApplicationService from "../../services/Application.service";
import './user-purshases.css'

export const  UserPurshases = () =>{
    const billsService = new BillService();

    const localStorageService = new LocalStorageService()

    const applicationService = new ApplicationService() 

    const [bills,setBills] = useState([])
    
    useEffect(() =>{
        const  fetchecBills = async () =>{
            try {
                const token = localStorageService.getToken();
                const userInfo = applicationService.userInfoJsonStringToObject();

                const { user_info: { id } } = userInfo;

                const response =  await billsService.getUserBills(id,token);
                setBills(response)
                
            } catch (error) {
                
            }
        } 
        fetchecBills()
    },[])
    return (
        <div className="user-purchases-container">
          {bills.length > 0 ? (
            <>
              <h2 style={{ color: "green", marginBottom: "20px" }}>Your Bills</h2>
              {bills.map((bill) => (
                <div key={bill.id} className="bill-container">
                  <div className="bill-info">
                    <p>
                      <strong>Bill ID:</strong> {bill.id}
                    </p>
                    <p>
                      <strong>Payment Method ID:</strong> {bill.payment_method_id}
                    </p>
                    <p>
                      <strong>Created At:</strong> {bill.created_at}
                    </p>
                  </div>
    
                  <div className="product-info">
                    <h4>Bill Details</h4>
                    {bill.product_bills.map((productBill) => (
                      <div key={productBill.id} className="product-bill-container">
                        <p>
                          <strong>Product ID:</strong> {productBill.product_id}
                        </p>
                        <p>
                          <strong>Name:</strong> {productBill.product.name}
                        </p>
                        <p>
                          <strong>Description:</strong>{" "}
                          {productBill.product.description}
                        </p>
                        <p>
                          <strong>Unitary Price:</strong>{" "}
                          {productBill.product.unitary_price}
                        </p>
                        <p>
                          <strong>Quantity:</strong> {productBill.quantity}
                        </p>
                        <p>
                          <strong>Total Cost:</strong> {productBill.total}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="no-bills-message">
              <p>No bills generated yet</p>
              <NavLink to="/product">
                <Button variant="primary">Let's Buy!!</Button>
              </NavLink>
            </div>
          )}
        </div>
      );
}