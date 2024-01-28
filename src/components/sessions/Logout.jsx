import React, {useEffect, useState} from "react";
import AuthService from "../../services/Auth.service";
import Button from 'react-bootstrap/Button';
import LocalStorageService from "../../services/LocalStorage.service";
import { useNavigate } from "react-router-dom";

export const Logout = () => {

    const service = new AuthService();
    
    const localStorage = new LocalStorageService();
 
    const token = localStorage.getToken();

    const  navigate = useNavigate();
     
    const handleLogout = () => {
        try {
            service.logout(token)
            localStorage.removeToken(token)
            sessionStorage.removeItem('userData')
            alert('Session has been destroy')
            navigate('/')
        } catch (error) {
            alert('Something went wrong!',error);
        }          
      }
      return (
        <div className="">
          <h1>Log Out</h1>
            <Button onClick={handleLogout}>Logout</Button>

        </div>
      );
}