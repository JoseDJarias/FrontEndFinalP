import ApplicationService from "../Application.service";

export default class CategoryService extends ApplicationService {

  constructor() {
    super();
  }


  // Categories
  async getCategories() {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/categories`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
      
    } catch (error) {
      console.error('Error getting categories:', error.message);
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        const createdCategory = await response.json();
        console.log('Category created successfully:', createdCategory);
        return createdCategory;
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to create category: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error creating category:', error.message);
      throw error;
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/categories/${categoryId}`, {
        method: 'PATCH', // or 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        console.log('Category updated successfully:', updatedCategory);
        return updatedCategory;
      } else {
        const errorData = await response.json();
        throw new Error(`Failed to update category: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error updating category:', error.message);
      throw error;
    }
  }


  async getAvailableCategories() {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/categories/available_categories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch available categories: ${response.statusText}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching available categories:', error.message);
      throw new Error('Failed to fetch available categories');
    }
  }

  async toggleAvailableState(categoryId, state) {
    try {
      const response = await fetch(`${this.apiHost()}/api/admin/categories/available_state/${categoryId}`, {
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


}