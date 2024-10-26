
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/products/category';

export const getProductsByCategory = async (categoryId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}?category_id=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

const BASE_URL2 = 'http://192.168.18.5:8080/api/products';

export const getProductDetails = async (productId: string) => {
  try {
    const response = await axios.get(`${BASE_URL2}/${productId}`);
    
    // Extract the relevant data
    const { price,imageUrl,name, description, ratings, category_id } = response.data;
    
    // Assuming category_id=2 corresponds to "CPU Cooler"
    const categoryName = category_id === 2 ? 'CPU Cooler' : 'CPU Cooler';

    return {
      price,
      name,
      description,
      ratings,
      categoryName,
      imageUrl
    };
  } catch (error) {
    console.error('Error fetching product details:', error);
    return null;
  }
};

export const getProductsByIds = async (productIds: number[]) => {
  try {
    const promises = productIds.map((id) => getProductDetails(id.toString()));
    const products = await Promise.all(promises);
    return products.filter(product => product !== null); // Filter out any null responses
  } catch (error) {
    console.error('Error fetching products by ids:', error);
    return [];
  }
};

const CART_URL = 'http://localhost:8080/api/cart/current';

export const getCartData = async () => {
  try {
    const response = await axios.get(CART_URL); 
    return response.data;
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return null;
  }
};


const ADD_URL = 'http://localhost:8080/api/cart';

// Function to add an item to the cart
export const addItemToCart = async (productId: number, quantity: number = 1) => {
  try {
    const response = await axios.post(`${ADD_URL}/add/${productId}`, null, {
      params: { quantity },
      withCredentials: true, // Ensures the session is maintained
    });
    return response.data;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return null;
  }
};

const PROFILE_URL = 'http://localhost:8080/api/profile';

export const getUserProfile = async () => {
  try {
    const response = await axios.get(PROFILE_URL, { withCredentials: true });

    // Extracting relevant data
    const { fullName, address, phoneNumber, city } = response.data;

    return {
      fullName,
      address,
      phoneNumber,
      city
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null; // Return null in case of an error
  }
};


interface UserProfile {
  fullName: string;
  address: string;
  phoneNumber: string;
  city: string;
}

export const updateUserProfile = async (profileData: UserProfile): Promise<UserProfile | null> => {
  try {
    const response = await axios.put<UserProfile>(`${PROFILE_URL}/update`, profileData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return null;
  }
};

export const createOrder = async (paymentMethod: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/api/orders/create?paymentMethod=${paymentMethod}`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

// Function to get pricing details
export const getPricingDetails = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/orders/pricing-details', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching pricing details", error);
    throw error;
  }
};

const API_URL = 'http://localhost:8080/api/orders';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const handleSearch = async (query: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/search?q=${query}`);
    return response.data;  // Ensure you return the data from the response
  } catch (error) {
    console.error("Error fetching search results", error);
    throw error;
  }
};
