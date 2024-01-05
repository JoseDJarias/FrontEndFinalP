class ProfileService{

    async fetchUserData(token) {
        try {
          if (!token) {
            throw new Error("Token not found");
          }
          
            const response = await fetch(`${this.apiHost()}/api/people/`, {
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
    
}