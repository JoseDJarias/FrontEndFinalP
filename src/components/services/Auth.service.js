import ApplicationService from "./Application.service";

class AuthService extends ApplicationService {
    constructor(){
      super();
    }

    // Both login and signup are POST and logout DELETE action

    async signup(data) {
        await fetch( `${this.apiHost()}/api/signup`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    
    async login(data) {
        await fetch( `${this.apiHost()}/api/login`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
    

    async logout(){


    };
}

export default AuthService;