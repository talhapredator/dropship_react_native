// src/components/OnlinePayment.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  OnlinePayment: undefined;
  PaymentSuccess: undefined;
  // Add other screens here
};

type OnlinePaymentScreenProp = StackNavigationProp<
  RootStackParamList,
  "OnlinePayment"
>;

const OnlinePayment: React.FC = () => {
  const navigation = useNavigation<OnlinePaymentScreenProp>();

  // State variables for input fields
  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  // State for loading indicator
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handler for Confirm Payment button
  const handleConfirmPayment = () => {
    // Simple validation
    if (!fullName.trim()) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/; // Example: 10-digit phone number
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // Simulate payment processing
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to PaymentSuccess screen
      navigation.navigate("PaymentSuccess");
    }, 2000); // 2-second delay to simulate loading
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.title}>Online Payment</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              returnKeyType="done"
              maxLength={10}
            />
          </View>

          <Pressable
            style={styles.button}
            onPress={handleConfirmPayment}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Confirm Payment</Text>
            )}
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default OnlinePayment;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    inner: {
      flex: 1,
      padding: 24,
      justifyContent: "center",
    },
    title: {
      fontSize: 28,
      fontWeight: "600",
      color: "#333333",
      marginBottom: 40,
      alignSelf: "center",
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      color: "#555555",
      marginBottom: 8,
      fontWeight: "500",
    },
    input: {
      height: 50,
      borderColor: "#dddddd",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 16,
      color: "#333333",
      backgroundColor: "#f9f9f9",
    },
    button: {
      height: 50,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
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
  