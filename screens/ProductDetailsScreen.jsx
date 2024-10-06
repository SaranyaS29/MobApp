// screens/ProductDetailsScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://192.168.100.72:5001/api'; // Replace with your actual API base URL

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params; // Get the productId from the navigation params
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        console.log('Fetching product with ID:', productId); // Log the product ID
  
        // Make the API request to fetch product details
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
  
        // Log the full product details response to the console
        console.log('Product details fetched successfully:', response.data);
  
        // Set the product details in the state
        setProductDetails(response.data);
      } catch (error) {
        console.error('Fetch Product Error:', error);
        const errorMessage =
          error.response?.data?.message || error.message || 'Failed to fetch product details.';
        Alert.alert('Error', errorMessage);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [productId]);
  
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading product details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error fetching product details.</Text>
        <Button title="Try Again" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{productDetails.name}</Text>
      <Text style={styles.detail}>Price: {productDetails.price}</Text>
      <Text style={styles.detail}>GST: {productDetails.gst}</Text>
      <Text style={styles.detail}>Wastage: {productDetails.wastage}</Text>
      <Text style={styles.detail}>Packaging Cost: {productDetails.packagingCost}</Text>
      <Text style={styles.detail}>Transport: {productDetails.transport}</Text>
      <Text style={styles.detail}>Discount: {productDetails.discount}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProductDetailsScreen;
