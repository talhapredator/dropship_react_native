import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import axios from 'axios';
import { Color } from '../GlobalStyles';

interface Order {
  id: string;
  orderNumber: string;
  status: string;
}

const OrdersList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  useEffect(() => {
    // Fetch orders from the Spring Boot backend
    axios.get('http://192.168.18.5:8080/api/orders')
      .then((response) => {
        setOrders(response.data); // Assuming the data is in the correct format
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders", error);
        setLoading(false);
      });
  }, []);

  const renderOrderItem = ({ item }: { item: Order }) => (
    <Pressable 
      style={styles.orderContainer} 
      onPress={() => navigation.navigate('DeliveryStatusPage', { orderId: item.id })}
    >
      <View style={styles.orderDetails}>
        <Text style={styles.orderText}>Order No: {item.id}</Text>
      </View>
      <Text style={item.status === 'Delivered' ? styles.deliveredStatus : styles.shippedStatus}>
          {item.status}
        </Text>
      <Icon name="chevron-right" size={16} color="#007AFF" />
    </Pressable>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="arrow-left" size={20} color="#000" onPress={() => navigation.goBack()} />
        
      </View>
      <Text style={styles.headerText}>Orders List</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    top: '-4.5%',
    color: Color.black,
    left: '40%'
  },
  listContainer: {
    padding: 16,
    top: '0%'
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderDetails: {
   width: '50%'
  },
  orderText: {
    fontSize: 14,
    
    color: Color.black
    
  },
  shippedStatus: {
    color: '#007AFF',
    left: '90%',
    
  },
  deliveredStatus: {
    color: '#28a745',
    left: '90%',
  },
});

export default OrdersList;
