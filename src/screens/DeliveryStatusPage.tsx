import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useRoute, RouteProp } from "@react-navigation/native";
import { Color } from '../GlobalStyles';
import { fetchOrders } from '../services/ProductService'; // Import the Axios service

// Define TypeScript interfaces for the response data
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string[];  // Array of image URLs
  ratings: number;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  orderDate: string;
  estimatedDeliveryDate: string;
  status: string;
  paymentMethod: string;
  billingAddress: string;
  orderTotal: number;
  deliveryFee: number;
}

const DeliveryStatusPage: React.FC = () => {
  const route = useRoute<RouteProp<{ params: { orderId: number } }, 'params'>>(); // Get orderId from route params
  const { orderId } = route.params;

  const [order, setOrder] = useState<Order | null>(null);  // UseState for order
  const [loading, setLoading] = useState(true);            // UseState for loading
  const [error, setError] = useState('');                  // UseState for error
  
  // Hook to fetch orders
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const orders: Order[] = await fetchOrders();  // Fetch all orders
        const selectedOrder = orders.find(order => order.id === orderId);  // Find the specific order by ID
        if (selectedOrder) {
          setOrder(selectedOrder);  // Set the found order
        } else {
          setError('Order not found.');
        }
      } catch (err) {
        console.error("Error fetching order:", err);
        setError('Failed to load order.');
      } finally {
        setLoading(false);  // Set loading to false after data is fetched
      }
    };

    loadOrder();
  }, [orderId]);  // Re-run effect if orderId changes

  // Render loading indicator if data is still being fetched
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Render error message if there is an error
  if (error) {
    return <Text>{error}</Text>;
  }

  // Render message if no order is found
  if (!order) {
    return <Text>No orders found.</Text>;
  }

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'CREATED':
        return 1;
      case 'PROCESSING':
        return 2;
      case 'SHIPPED':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 1;
    }
  };

  const activeStep = getStatusStep(order.status);

  const totalItems = order.items.reduce((total, item) => total + item.quantity, 0);
  
  // Render the order details
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.orderId}>Order ID: {order.id}</Text>
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.orderDate}>Order date: {new Date(order.orderDate).toDateString()}</Text>
        <Text style={styles.deliveryDate}>Estimated delivery: {new Date(order.estimatedDeliveryDate).toDateString()}</Text>
      </View>

      <View style={styles.progressContainer}>
  <View style={styles.progressBar}>
    {/* Created */}
    <View style={styles.progressStepContainer}>
      <Text style={styles.progressStatus}>Created</Text>
      <View style={[styles.progressStep, order.status === 'CREATED' ? styles.activeStep : null]} />
    </View>
    
    <View style={styles.progressLine} />

    {/* Processing */}
    <View style={styles.progressStepContainer}>
      <Text style={styles.progressStatus}>Processing</Text>
      <View style={[styles.progressStep, order.status === 'PROCESSING' ? styles.activeStep : null]} />
    </View>
    
    <View style={styles.progressLine} />

    {/* Out for Delivery */}
    <View style={styles.progressStepContainer}>
      <Text style={styles.progressStatus}>Shipped</Text>
      <View style={[styles.progressStep, order.status === 'SHIPPED' ? styles.activeStep : null]} />
    </View>
    
    <View style={styles.progressLine} />

    {/* Delivered */}
    <View style={styles.progressStepContainer}>
      <Text style={styles.progressStatus}>Delivered</Text>
      <View style={[styles.progressStep, order.status === 'DELIVERED' ? styles.activeStep : null]} />
    </View>
  </View>
</View>

      {/* Products List */}
      {order.items.map(item => (
        <View key={item.id} style={styles.productContainer}>
          <Image source={{ uri: item.product.imageUrl[0] }} style={styles.productImage} />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.product.name}</Text>
            <Text style={styles.productPrice}>{item.product.price.toFixed(2)} PKR</Text>
            <Text style={styles.productQuantity}>Qty: {item.quantity}</Text>
          </View>
        </View>
      ))}

      {/* Payment Info */}
      <View style={styles.paymentInfo}>
        <Text style={styles.paymentLabel}>Payment</Text>
        <Text style={styles.paymentDetails}>{order.paymentMethod}</Text>
      </View>

      {/* Delivery Info */}
      <View style={styles.deliveryInfo}>
        <Text style={styles.deliveryLabel}>Delivery Address</Text>
        <Text style={styles.deliveryDetails}>{order.billingAddress}</Text>
      </View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <Text style={styles.summaryLabel}>Order Summary</Text>
        <Text style={styles.summaryItem}>Delivery: {order.deliveryFee.toFixed(2)} PKR</Text>
        <Text style={styles.summaryItem}>Total Items: {totalItems}</Text>
        <Text style={styles.summaryTotal}>Total: {order.orderTotal.toFixed(2)} PKR</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // For Android shadow
    
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  orderInfo: {
    padding: 20,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
  },
  deliveryDate: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: 'bold'
  },
  progressContainer: {
    
    padding: 20,
  },
  activeLine: {
    backgroundColor: '#4caf50',
  },
  progressStepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // Each step takes equal space
  },
  progressStatus: {
    marginBottom: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000', 
    textAlign: 'center', 
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    width: '100%', 
    
  },
  progressStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    zIndex: 1, // Ensure dots are above the line
  },
  activeStep: {
    backgroundColor: Color.colorRoyalblue_100,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
    position: 'relative', // Adjusts the position relative to dots
    marginHorizontal: -35, // Aligns the line with the dots without gaps
    top: 11,
    left: 2
    
  },
  productContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
    padding: 20,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: Color.black,
  },
  productPrice: {
    fontSize: 12,
    color: '#000',
  },
  productQuantity: {
    fontSize: 12,
    color: '#888',
  },
  paymentInfo: {
    marginBottom: 20,
    padding: 20,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
  },
  paymentDetails: {
    fontSize: 14,
    color: '#000',
  },
  deliveryInfo: {
    marginBottom: 20,
    left: 130,
    top: '-10.5%',
    padding: 20,
    
  },
  deliveryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
  },
  deliveryDetails: {
    fontSize: 14,
    color: '#000',
    width: 200,
  },
  orderSummary: {
    
    top: -80,
    padding: 20,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Color.black,
  },
  summaryItem: {
    fontSize: 14,
    color: '#888',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: Color.black,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryStatusPage;
