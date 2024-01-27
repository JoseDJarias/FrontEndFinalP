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
                    ...person
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
            return null
        }

    }

    addToCart(product) {
        const cart = this.getCart() || [];

        if (!cart.some(item => item.productId === product.productId)) {
            cart.push({ ...product });
            this.setCart(cart);
            console.log('Product added', product);
        }
    }

    setCart(cart) {
        const jsonString = JSON.stringify(cart);
        sessionStorage.setItem("cart", jsonString);
    }

    getCart() {
        const jsonString = sessionStorage.getItem("cart");
        return jsonString ? JSON.parse(jsonString) : null;
    }

    deleteFromCart(productId) {
        const cart = this.getCart() || [];
        const updatedCart = cart.filter(item => item.productId !== productId);
        this.setCart(updatedCart);
        console.log(`Product with ID ${productId} deleted from the cart`);
    }

    clearCart() {
        sessionStorage.removeItem("cart");
        console.log("Cart cleared");
    }
}

export default ApplicationService;