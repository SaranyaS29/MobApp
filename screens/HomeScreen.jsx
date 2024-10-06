// screens/HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Add Product"
        onPress={() => navigation.navigate('AddProduct')}
      />
      <View style={styles.separator} />
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate('ScanQRCode')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  separator: {
    height: 20,
  },
});

export default HomeScreen;
