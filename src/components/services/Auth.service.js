import ApplicationService from "./Application.service";

class AuthService extends ApplicationService {
  constructor() {
    super();
  }

  async signup(data) {
    try {
      const response = await fetch(`${this.apiHost()}/api/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const message = console.log(`Ha ocurrido un error:  ${error}`);
     return message 
    }
  }

  async login(data) {
    try {
      const response = await fetch(`${this.apiHost()}/api/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      // console.log('Response Data Auth Service',responseData);
      return responseData;
      
    } catch (error) {
      const message = console.log(`Ha ocurrido un error:  ${error}`);
      return message     }
  }
  
  
  async logout(token) {
    try {
      if (!token) {
        throw new Error("Token not found");
      }
      
        const response = await fetch(`${this.apiHost()}/api/logout`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });

      if (!response.ok) {
        throw new Error("Logout request failed");
      }

      const responseData = await response.json();
      return responseData
 
    } catch (error) {
      console.error("An error occurred during logout:", error);
      }

  };

  async getTodos(token){

    try {
      const response = await fetch(`${this.apiHost()}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      });
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      const message = console.log(`Ha ocurrido un error:  ${error}`);
      return message     }

  }
}

export default AuthService;