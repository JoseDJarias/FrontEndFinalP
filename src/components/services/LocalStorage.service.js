class LocalStorageService{

    saveToken(token){
        localStorage.setItem("token",token)
        return 'Saved'
    }

    getToken(){
        return localStorage.getItem("token")

    }
    removeToken(){
        localStorage.removeItem("token");

    }
};

export default LocalStorageService;