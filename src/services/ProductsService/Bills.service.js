import ApplicationService from "../Application.service";

export default class BillService extends ApplicationService {
    async createBill(voucher, productData) {

        const formData = new FormData();
        formData.append('voucher', voucher);

        // Append individual properties of productData
        formData.append('productData[payment_method_id]', productData.payment_method_id);
        formData.append('productData[user_id]', productData.user_id);

        // Append each product in the products array
        productData.products.forEach((product) => {
            formData.append(`productData[products][][quantity]`, product.quantity);
            formData.append(`productData[products][][unitaryPrice]`, product.unitaryPrice);
            formData.append(`productData[products][][productId]`, product.productId);
        });

        try {
            const response = await fetch(`${this.apiHost()}/api/admin/bills`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                // Hacer algo con la respuesta, si es necesario
                return responseData;
            } else {
                throw new Error('Error creating bill');
            }
        } catch (error) {
            console.error('Error creating bill:', error);
            throw error;
        }
    }

    async getUserBills(id,token) {
        if (!id ) {
            console.error('NUll id');
        }
        if (!token) {
            console.error('Must be authorized')
        }
        try {
            const response = await fetch(`${this.apiHost()}/api/admin/bills/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    token: token
                },
            },
            )
            if (response.ok) {
                const responseData = await response.json();
                // Hacer algo con la respuesta, si es necesario
                return responseData;
            }
            const responseData = await response.json();
            return responseData;

        }
        catch (error) {
            console.error('Error retrieving Bills:', error);
            throw error;
        }
    }

}