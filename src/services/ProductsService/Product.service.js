import ApplicationService from "../Application.service";

export default class ProductsService extends ApplicationService {
  constructor() {
    super();
  }

  async getAllProducts() {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  async getProductById(id) {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/show?id=${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching product by ID ${id}: ${error.message}`);
    }
  }

  async getRandomProducts() {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/random_six`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching random products: ${error.message}`);
    }
  }

  async getAllCategories() {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/categories_index`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch categories. ${errorData.error || 'Unknown error'}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching categories: ${error.message}`);
    }
  }

  async getProductsByCategory(categoryId) {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/products_by_category/${categoryId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch products by category. ${errorData.error || 'Unknown error'}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching products by category ${categoryId}: ${error.message}`);
    }
  }

  // admin service
  async createProduct(productData) {
    try {
      // Make a POST request to the create product endpoint
      const response = await fetch(`${this.apiHost()}/api/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may include additional headers if needed (e.g., authentication token)
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        console.log('Product created successfully:', createdProduct);
        return createdProduct;
      } else {
        // If the request was not successful, throw an error
        const errorData = await response.json();
        throw new Error(`Failed to create product: ${errorData.message}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error creating product:', error.message);
      throw error;
    }
  }
// admin service
  async updateProduct(productId, productData) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Error updating product: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  // admin service
  async toggleAvailableState(productId, state) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/available_state/${productId}`, {
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
      throw new Error(error.message || 'Failed to toggle available state');
    }
  }

  // admin service
  async getAvailableProducts() {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/available_products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch available products: ${response.statusText}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching available products:', error.message);
      throw new Error('Failed to fetch available products');
    }
  }

  // admin service
  async updateStock(state,productId,token){
    console.log('state:',state, 'id',productId, 'tokken:',token);
    if (!state && !productId) {
      return `No accepting null data, state: ${state} product id: ${productId}`
    }
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/update_stock/${productId}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({state: state}),

       })

       if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      return  await response.json();
      
    } catch (error) {
      console.error('Error actualizando el stock:', error.message);

    }
  }

  async filterByPriceRange(minPrice, maxPrice) {
    try {
      const response = await fetch(`${this.apiHost()}/api/users/products/filter_by_price_range`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          min_price: minPrice,
          max_price: maxPrice,
        }),

      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const filteredProducts = await response.json();

      return filteredProducts;
    } catch (error) {
      console.error('Error en la solicitud de filtrado por rango de precio:', error.message);
      throw error;
    }
  }

  //  Products Pics Service

  async createProductPicture(data) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/product_pictures/`, {
        method: 'POST',
        body: data,
  
      });
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      throw new Error(`Error posting product picture: ${error.message}`);
    }
  }

  async getProductsPics() {

    try {
      const response = await fetch(`${this.apiHost()}/api/users/product_pictures/`, {
        method: 'GET',
        // Add other necessary headers
      });

      if (response.ok) {
        const data = await response.json();
        return data.image_url;
      } else {
        console.error('Failed to fetch the image URL');
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }



  }
}
