// api/api.js
import axios from 'axios';

// Use localhost for local development
const API_BASE_URL = 'http://192.168.100.72:5001/api';

export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    // Corrected the URL formatting for product ID
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
