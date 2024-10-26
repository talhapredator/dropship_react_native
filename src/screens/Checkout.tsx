import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, View, Pressable, Image, Animated } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { getUserProfile, getPricingDetails, createOrder } from "../services/ProductService";
import Icon from 'react-native-vector-icons/FontAwesome';


const Checkout = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // State variables for profile data
  const [fullName, setFullName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  // State variables for order and payment
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default to COD
  const [pricingDetails, setPricingDetails] = useState({
    order: 0,
    delivery: 0,
    summary: 0,
  });
  const animatedValue = new Animated.Value(1);

  // Fetch user profile data on component mount
  useFocusEffect(
    useCallback(() => {
    const fetchUserProfileData = async () => {
      try {
        const userProfile = await getUserProfile();
        if (userProfile) {
          setFullName(userProfile.fullName);
          setShippingAddress(userProfile.address);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      }
    };

    fetchUserProfileData();
  }, [])
);

  // Fetch pricing details on component mount
  useEffect(() => {
    const fetchPricingDetails = async () => {
      try {
        const details = await getPricingDetails();
        if (details) {
          setPricingDetails({
            order: details.cartTotal,
            delivery: details.deliveryFee,
            summary: details.totalAmount,
          });
        }
      } catch (error) {
        console.error("Error fetching pricing details", error);
      }
    };

    fetchPricingDetails();
  }, []);

  // Handle payment method selection
  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
    // Add animation effect
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2, // scale effect
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePress = () => {
    // Trigger animation or any action here
    Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1.2, // Example scale up
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 1, // Scale back down
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to another screen
    navigation.navigate("AddressEdit");
  };

  

  // Submit order
  const handleSubmitOrder = async () => {
    if (!shippingAddress) {
      setErrorMessage("Shipping address is required.");
      return;
    }
    try {
      await createOrder(paymentMethod);
      if (paymentMethod === "Online") {
        // Navigate to the online payment screen if 'Online' is selected
        navigation.navigate("Success");
      } else {
        // Navigate to success screen for COD
        navigation.navigate("Success");
      }
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  return (
    <View style={styles.checkout}>
      <View style={[styles.shippingAddress]}>
      <Text style={[styles.head, styles.headFlexBox]}>Shipping address</Text>
        <View
          style={[
            styles.address, 
            styles.bgLayout, 
            !shippingAddress && { borderColor: 'red', borderWidth: 2 } // Add red border if empty
          ]}
        >
          <View style={[styles.bg, styles.bgShadowBox]} />
          <Text style={[styles.address1, styles.address1Typo]}>
            {shippingAddress || "Add Address To Place Order !!!"} {/* Show placeholder if empty */}
          </Text>
          <Text style={[styles.name]}>{fullName}</Text>
          <Pressable
            style={[styles.change, styles.namePosition]}
            onPress={() => handlePress()}
          >
            <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
            <Icon name="edit" size={24} color="royalblue" />
           </Animated.View>
          </Pressable>
        </View>
        {!shippingAddress && ( // Show error message when shipping address is missing
          <Text style={{ color: 'red', fontSize: 10 }}> {errorMessage} </Text> // Small font size (10)
        )}
      </View>
      
      <View style={[styles.payment, styles.sumsLayout]}>
        <Text style={[styles.head1, styles.headFlexBox]}>Payment</Text>

        <Pressable onPress={() => handlePaymentMethodChange("COD")}>
          <Animated.View style={[styles.paymentOption, { transform: [{ scale: paymentMethod === "COD" ? animatedValue : 1 }] }]}>
            <Icon name="credit-card" size={16} color={paymentMethod === "COD" ? "royalblue" : "black"} />
            <Text style={paymentMethod === "COD" ? styles.selected : styles.unselected}>
              Cash on Delivery
            </Text>
          </Animated.View>
        </Pressable>

        <Pressable onPress={() => handlePaymentMethodChange("Online")}>
          <Animated.View style={[styles.paymentOption, { transform: [{ scale: paymentMethod === "Online" ? animatedValue : 1 }] }]}>
            <Icon name="credit-card" size={16} color={paymentMethod === "Online" ? "royalblue" : "black"} />
            <Text style={paymentMethod === "Online" ? styles.selected : styles.unselected}>
              Online Payment
            </Text>
          </Animated.View>
        </Pressable>
      </View>
      <View style={[styles.sums, ]}>
        <View style={[styles.orderSum,]}>
          <Text style={[styles.order, styles.orderFlexBox]}>Order:</Text>
          <Text style={[styles.price, styles.priceFlexBox]}>PKR {pricingDetails.order} /-</Text>
        </View>
        <View style={[styles.deliverySum]}>
          <Text style={[styles.delivery, styles.orderFlexBox]}>Delivery:</Text>
          <Text style={[styles.price1, styles.priceFlexBox]}>PKR {pricingDetails.delivery} /-</Text>
        </View>
        <View style={[styles.summary]}>
          <Text style={[styles.summary1, styles.orderFlexBox]}>Summary:</Text>
          <Text style={[styles.price2, styles.priceFlexBox2]}>PKR {pricingDetails.summary} /-</Text>
        </View>
        <View style={styles.buttonprimaryinactivebig}>
          <Pressable
            style={[styles.rectangle, styles.iconLayout]}
            onPress={handleSubmitOrder}
          />
          <Text style={[styles.submitOrder, styles.orderLayout]}>
            SUBMIT ORDER
          </Text>
        </View>
      </View>
      <View style={[styles.upperNav, styles.bgShadowBox]}>
        <Text style={styles.checkout1}>Checkout</Text>
        <Pressable
          style={styles.arrowCircleLeftUndefined}
          onPress={() => navigation.navigate("Cart")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sumsLayout: {
    width: "95%",
    position: "absolute",
    left: 10,
    
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: "#F5F5F5",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    top: '2%',
    right: '20%'
  },
  headFlexBox: {
    alignItems: "center",
    alignSelf: 'center',
    display: "flex",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    fontWeight: 700,
  },
  selected: {
    color: Color.colorRoyalblue_300,
    fontWeight: "bold",
    left: 7,
    
   
  },
  unselected: {
    color: "black",
    left: 7,
   
  },
  bgLayout: {
    height: 110,
    left: 10,
    borderRadius: Border.br_5xs,
    width: '95%',
    position: "absolute",
    backgroundColor: "#F5F5F5",
    
  },
  bgShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  address1Typo: {
    
    letterSpacing: 0,
    fontSize: 14,
    fontWeight: 500,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: '#212529',
    fontFamily: FontFamily.dMSansBold,
    position: "absolute",
    
  },
  orderLayout: {
    lineHeight: 20,
    fontSize: FontSize.font2_size,
  },
  namePosition: {
    top: 20,
    position: "absolute",
  },
  changeTypo: {
    color: Color.colorRoyalblue_100,
    lineHeight: 20,
    fontSize: FontSize.font2_size,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    left: 0
  },
  changeTypo2: {
    color: Color.colorRoyalblue_100,
    lineHeight: 20,
    fontSize: FontSize.font2_size,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    left: 0
  },
  orderFlexBox: {
    color: Color.gray,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    left: "5%",
    position: "absolute",
  },
  priceFlexBox: {
    textAlign: "right",
    color: Color.black,
    fontSize: 12,
    left: '-5%'
  },
  priceFlexBox2: {
    textAlign: "right",
    color: Color.black,
    fontSize: 14,
    left: '-5%'
  },
  summaryLayout: {
    width: 349,
    position: "absolute",
  },
  price2Position: {
    top: "0%",
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  head: {
    width: '100%',
    fontSize: FontSize.font_size,
    top: 0,
    paddingHorizontal: 18
  },
  bg: {
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowRadius: 25,
    elevation: 25,
    borderRadius: Border.br_5xs,
    height: 108,
    position: "absolute",
    top: 0,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  address1: {
    top: 45,
    width: '85%',
    paddingHorizontal: 15,
  },
  name: {
    width: '100%',
    top: 18,
    position: "absolute",
    left: 0,
    paddingHorizontal: 15,
    alignItems: "center",
    display: "flex",
    color: '#212529',
    textAlign: "left",
    fontFamily: FontFamily.dMSansBold,
    fontSize: 14,
    fontWeight: 500,
    
  },
  change1: {
    width: "100%",
  },
  change: {
    
    left: "85%",
    top: 0,
  },
  address: {
    top: 38,
  },
  shippingAddress: {
    top: 110,
    
  },
  head1: {
    width: '100%',
    fontSize: FontSize.font_size,
    fontWeight: 'bold',
    left: '3%',
    top: '-50%',
    position: "absolute",
    color: '#333',
  },
  cardNumber: {
    top: 44,
    left: 89,
    width: 124,
    lineHeight: 21,
    letterSpacing: 0,
    fontSize: FontSize.font2_size,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.black,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
    
  },
  change3: {
    width: 57,
  },
  change2: {
    left: 293,
    top: 0,
    position: "absolute",
  },
  cardIcon: {
    width: 70,
    height: 38,
    top: 34,
    left: 0,
    position: "absolute",
  },
  payment: {
    top: '42.5%',
    padding: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: Border.br_5xs,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  order: {
    width: 45,
    lineHeight: 20,
    fontSize: FontSize.font2_size,
    top: 0,
  },
  price: {
    width: "100%",
    left: "0%",
    top: "5%",
    fontFamily: FontFamily.publicSansRegular,
    fontSize: FontSize.font_size,
    position: "absolute",
  },
  orderSum: {
    
  },
  delivery: {
    width: 62,
    lineHeight: 20,
    fontSize: FontSize.font2_size,
    top: 0,
  },
  price1: {
    width: "100%",
    left: "0%",
    top: "5%",
    textAlign: "right",
    fontFamily: FontFamily.publicSansRegular,
    fontSize: FontSize.font_size,
    position: "absolute",
  },
  deliverySum: {
    height: '7%',
    top: 20,
  },
  summary1: {
    top: 2,
    width: 81,
    fontSize: FontSize.font_size,
  },
  price2: {
    width: "100%",
    left: "0%",
    fontSize: FontSize.headline3_size,
    lineHeight: 22,
    fontWeight: "600",
    fontFamily: FontFamily.publicSansSemiBold,
    textAlign: "right",
    color: Color.black,
  },
  summary: {
    top: '15%',
    height: '100%',
    left: 0,
  },
  rectangle: {
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowColor: "rgba(211, 38, 38, 0.25)",
    shadowRadius: 8,
    elevation: 8,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorCornflowerblue,
    top: "0%",
    position: "absolute",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  submitOrder: {
    top: "29.17%",
    left: "35%",
    fontWeight: "500",
    fontFamily: FontFamily.headline3,
    color: Color.white,
    textAlign: "center",
    position: "absolute",
    fontSize: FontSize.font_size,
  },
  buttonprimaryinactivebig: {
    top: "40%",
    left: "15%",
    width: "70%",
    height: 48,
    position: "absolute",
  },
  sums: {
    top: "70%",
    height: "40%",
    left: "0%",
    width: "100%",
  },
  checkout1: {
    top: "32.5%",
    left: "40%",
    fontSize: 20,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  arrowCircleLeftUndefined: {
    left: 17,
    top: 21,
    width: 32,
    height: 32,
    position: "absolute",
  },
  upperNav: {

    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: "100%",
    height: 70,
    overflow: "hidden",
    position: "absolute",
  },
  checkout: {
    
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Checkout;
