import React, {useEffect, useState} from "react";
import AuthService from "../services/Auth.service";
import Button from 'react-bootstrap/Button';
import LocalStorageService from "../services/LocalStorage.service";

export const Logout = () => {

    const service = new AuthService;
    
    const localStorage = new LocalStorageService;

    const token = localStorage.getToken;
  
    const handleLogout = () => {
        try {
            service.logout(token)
            localStorage.removeToken(token)
            alert('Session has been destroy')
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