import ApplicationService from "./Application.service";
import LocalStorageService from "./LocalStorage.service";

class ProfileService extends ApplicationService{
  constructor(){
    super()
  }

    async updateUserProfile(data) {
        try {
          const getToken = new LocalStorageService()
          const token = getToken.getToken()

          const userInfo = this.userInfoJsonStringToObject() || {};
          const { user_info } = userInfo;
    
          // Check if user_info is defined
          if (!user_info) {
            throw new Error("User information not available");
          }
    
          const { id } = user_info;
          console.log('User ID:', id);

          if (!id) {
            throw new Error("User ID expected");
          }
          if (!data) {
            throw new Error("Object expected");
          }
          
          const response = await fetch(`${this.apiHost()}/api/people/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
              'token': token
            }
          });
    
          if (!response.ok) {
            throw new Error("Can not update info");
          }
    
          const responseData = await response.json();
          console.log('Respuesta del updatePROFFILE:', responseData);
          return responseData
     
        } catch (error) {
          console.error("Can not update:", error);
          }
    
      };
    
}

export default ProfileService;