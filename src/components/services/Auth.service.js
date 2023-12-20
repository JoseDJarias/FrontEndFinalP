import ApplicationService from "./Application.service";

class AuthService extends ApplicationService {
  constructor() {
    super();
  }

  // Both login and signup are POST and logout DELETE action

  async signup(data) {
    await fetch(`${this.apiHost()}/api/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async login(data) {
    const response = await fetch(`${this.apiHost()}/api/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();
    return responseData;
  }


  async logout() {


  };
}

export default AuthService;