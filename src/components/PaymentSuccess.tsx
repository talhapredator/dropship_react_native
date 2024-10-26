// src/components/PaymentSuccess.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  PaymentSuccess: undefined;
  Checkout: undefined;
  Success: undefined;
  // Add other screens here
};

type PaymentSuccessScreenProp = StackNavigationProp<
  RootStackParamList,
  "PaymentSuccess"
 
>;

const PaymentSuccess: React.FC = () => {
  const navigation = useNavigation<PaymentSuccessScreenProp>();

  const handleGoHome = () => {
    navigation.navigate("Success"); // Navigate to desired screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✅</Text>
      <Text style={styles.successText}>Payment Successful!</Text>
      <Pressable style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Go to Checkout</Text>
      </Pressable>
    </View>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
