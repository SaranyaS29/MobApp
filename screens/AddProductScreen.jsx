// screens/AddProductScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

// Validation schema using Yup
const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  price: Yup.number().typeError('Price must be a number').required('Price is required').positive('Price must be positive'),
  gst: Yup.number().typeError('GST must be a number').required('GST is required').min(0, 'GST cannot be negative'),
  wastage: Yup.number().typeError('Wastage must be a number').required('Wastage is required').min(0, 'Wastage cannot be negative'),
  packagingCost: Yup.number().typeError('Packaging Cost must be a number').required('Packaging Cost is required').min(0, 'Packaging Cost cannot be negative'),
  transport: Yup.number().typeError('Transport must be a number').required('Transport is required').min(0, 'Transport cannot be negative'),
  discount: Yup.number().typeError('Discount must be a number').min(0, 'Discount cannot be negative'),
});

// Define the API base URL
const API_BASE_URL = 'http://192.168.100.72:5001/api'; // Replace with your actual API base URL

const AddProductScreen = () => {
  const [qrValue, setQrValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const numericValues = {
        ...values,
        price: parseFloat(values.price),
        gst: parseFloat(values.gst),
        wastage: parseFloat(values.wastage),
        packagingCost: parseFloat(values.packagingCost),
        transport: parseFloat(values.transport),
        discount: parseFloat(values.discount) || 0,
      };

      console.log('Sending Product:', numericValues); // Debugging statement

      const response = await axios.post(`${API_BASE_URL}/products`, numericValues);

      if (response.status === 201) {
        const savedProduct = response.data;
        setQrValue(savedProduct._id); // Set the QR code value to the product ID
        resetForm();
        Alert.alert('Success', 'Product added successfully!');
      } else {
        Alert.alert('Error', 'Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Add Product Error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add product. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: '',
            price: '',
            gst: '',
            wastage: '',
            packagingCost: '',
            transport: '',
            discount: '',
          }}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {/* Input fields */}
              <Text style={styles.label}>Product Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Enter product name"
              />
              {errors.name && touched.name ? <Text style={styles.error}>{errors.name}</Text> : null}

              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                placeholder="Enter price"
                keyboardType="numeric"
              />
              {errors.price && touched.price ? <Text style={styles.error}>{errors.price}</Text> : null}

              <Text style={styles.label}>GST (%)</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('gst')}
                onBlur={handleBlur('gst')}
                value={values.gst}
                placeholder="Enter GST percentage"
                keyboardType="numeric"
              />
              {errors.gst && touched.gst ? <Text style={styles.error}>{errors.gst}</Text> : null}

              <Text style={styles.label}>Wastage (%)</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('wastage')}
                onBlur={handleBlur('wastage')}
                value={values.wastage}
                placeholder="Enter wastage percentage"
                keyboardType="numeric"
              />
              {errors.wastage && touched.wastage ? <Text style={styles.error}>{errors.wastage}</Text> : null}

              <Text style={styles.label}>Packaging Cost</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('packagingCost')}
                onBlur={handleBlur('packagingCost')}
                value={values.packagingCost}
                placeholder="Enter packaging cost"
                keyboardType="numeric"
              />
              {errors.packagingCost && touched.packagingCost ? <Text style={styles.error}>{errors.packagingCost}</Text> : null}

              <Text style={styles.label}>Transport</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('transport')}
                onBlur={handleBlur('transport')}
                value={values.transport}
                placeholder="Enter transport cost"
                keyboardType="numeric"
              />
              {errors.transport && touched.transport ? <Text style={styles.error}>{errors.transport}</Text> : null}

              <Text style={styles.label}>Discount (%)</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('discount')}
                onBlur={handleBlur('discount')}
                value={values.discount}
                placeholder="Enter discount percentage (optional)"
                keyboardType="numeric"
              />
              {errors.discount && touched.discount ? <Text style={styles.error}>{errors.discount}</Text> : null}

              {/* Submit Button */}
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
              ) : (
                <Button onPress={handleSubmit} title="Add Product" />
              )}
            </View>
          )}
        </Formik>

        {/* QR Code Display */}
        {qrValue && (
          <View style={styles.qrContainer}>
            <Text style={styles.qrText}>Product QR Code:</Text>
            <QRCode value={qrValue} size={200} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
  },
  error: {
    color: 'red',
    marginTop: 4,
    marginBottom: 8,
  },
  loader: {
    marginVertical: 20,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  qrText: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
