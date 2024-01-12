class ApplicationService {

    API_HOST = "http://localhost:3000";

    apiHost() {
        return this.API_HOST
    }


    objectIsEmpty = (obj) => Object.keys(obj || {}).length === 0;

    // recibe la data del user y la setea (guarda) a session storage
    setUserInfoSessionStorage(data) {


        const { token, user_info: { id, email, person } } = data;

        console.log(`Welcome ${person.name} `);
        window.alert(`Welcome ${person.name} `);

        const user_object = {
            token,
            user_info: {
                id,
                email,
                person: {
                    ...person // Spread the properties of the person object
                }
            }
        };

        // Convierto  a un json string
        const jsonString = JSON.stringify(user_object);

        // Guardo el json string en sessionS
        sessionStorage.setItem("userData", jsonString);

    }

    userInfoJsonStringToObject() {

        // Obtengo la data del user de sessionS
        const storedData = sessionStorage.getItem("userData");
        // Parseo de vuelta a un objeto el json string almacenado en sessionS
        const retrievedData = JSON.parse(storedData);

        if (retrievedData) {
            return retrievedData
        } else {
            return null}


    }
}

export default ApplicationService;