// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AddProductScreen from './screens/AddProductScreen';
import ScanQRCodeScreen from './screens/ScanQRCodeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Sales App' }}
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProductScreen} 
          options={{ title: 'Add Product' }} 
        />
        <Stack.Screen 
          name="ScanQRCode" 
          component={ScanQRCodeScreen} 
          options={{ title: 'Scan QR Code' }} 
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen} 
          options={{ title: 'Product Details' }} 
        />
            
      </Stack.Navigator>
    </NavigationContainer>
  );
}
