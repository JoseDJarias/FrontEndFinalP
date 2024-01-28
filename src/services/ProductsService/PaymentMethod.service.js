import ApplicationService from "../Application.service";

export default class PaymentService extends ApplicationService {

  constructor() {
    super();
  }

  async getPaymentMethods() {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/payment_methods`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment methods');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching payment methods:', error.message);
      throw error;
    }
  }

  async createPaymentMethod(paymentMethodData) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/payment_methods`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentMethodData),
      });

      if (response.ok) {
        const createdPaymentMethod = await response.json();
        console.log('Payment method created successfully:', createdPaymentMethod);
        return createdPaymentMethod;
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to create payment method: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error creating payment method:', error.message);
      throw error;
    }
  }

  async updatePaymentMethod(paymentMethodId, paymentMethodData) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/payment_methods/${paymentMethodId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method: paymentMethodData }),
      });

      if (response.ok) {
        const updatedPaymentMethod = await response.json();
        console.log('Payment method updated successfully:', updatedPaymentMethod);
        return updatedPaymentMethod;
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to update payment method: ${errorData.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('Error updating payment method:', error.message);
      throw error;
    }
  }

  async toggleAvailableState(paymentMethodId, state) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/payment_methods/available_state/${paymentMethodId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: state }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to toggle available state');
      }

      const responseData = await response.json();
      console.log('SERVICED DATA', responseData);
      return responseData;
    } catch (error) {
      console.error('Failed to toggle available state:', error.message);
      throw error;
    }
  }

  async getAvailablePaymentMethods() {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/payment_methods/available_payment_methods`);
      if (!response.ok) {
        throw new Error('Failed to fetch available payment methods');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching available payment methods:', error.message);
      throw error;
    }
  }
}

