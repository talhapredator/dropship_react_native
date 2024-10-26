import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, Pressable, SafeAreaView, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import ProductItem from '../components/ProductItem';
import { getCartData, getProductDetails } from "../services/ProductService";

const Cart = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0); // Total number of items

  // Function to calculate the total amount and total items
  const calculateTotals = useCallback((items: any[]) => {
    const totalAmount = items.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    setTotalAmount(totalAmount);
    setCartTotal(totalItems);
  }, []);

  // Function to fetch cart data from the backend (initial load only)
  const fetchCartData = useCallback(async () => {
    const data = await getCartData();
    if (data) {
      const itemsWithDetails = await Promise.all(
        data.items.map(async (item: any) => {
          const productId = item.product?.id;
          if (!productId) return null;

          const productDetails = await getProductDetails(productId.toString());
          if (productDetails) {
            return {
              ...item,
              productName: productDetails.name,
              productPrice: productDetails.price,
              productImageUri: productDetails.imageUrl[0],
            };
          }
          return null;
        })
      );

      const validItems = itemsWithDetails.filter(item => item !== null);
      setCartItems(validItems);
      setTotalAmount(data.totalAmount); // Set totalAmount from initial fetch
      calculateTotals(validItems); // Calculate totals
    }
  }, [calculateTotals]);

  // Function to handle quantity update in ProductItem
  const handleCartUpdate = (updatedCart: any) => {
    // Update cart items based on the updatedCart response
    setCartItems(updatedCart.items);
    setTotalAmount(updatedCart.totalAmount); // Set totalAmount from updatedCart
    
  };

  // Effect to fetch cart data on initial load
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <View style={styles.cart}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {cartItems.map((item) => (
            <ProductItem
              key={item.id}
              productId={item.id}
              productName={item.product.name}
              productImageUri={item.product.imageUrl}
              productPrice={item.product.price || 0}
              quantity={item.quantity || 0}
              onCartUpdate={handleCartUpdate}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <Text style={[styles.price3, styles.priceTypo]}>PKR {totalAmount.toFixed(2)}/- </Text>
      <Text style={[styles.totalAmount, styles.checkOutFlexBox]}>
        Total Amount:
      </Text>
      <View style={[styles.upperNav, styles.tabIconLayout]}>
        <Text style={[styles.cart1, styles.cart1Clr]}>Cart</Text>
        <Pressable style={styles.arrowCircleLeftUndefined} onPress={() => navigation.navigate("HomePage")}>
          <Image
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
      <Pressable
        style={styles.buttonprimaryinactivebig}
        onPress={() => navigation.navigate("Checkout")}
      >
        <View style={[styles.rectangle3, styles.upperNavShadowBox]} />
        <Text style={[styles.checkOut, styles.checkOutFlexBox]}>CHECK OUT</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  productLayout: {
    width: "95%",
    position: "absolute",
  },
  container: {
    top: "10%",
    height: '70%'
  },
  productPosition: {
    height: "25%",
    left: 0,
    position: "absolute",
  },
  sizeTypo: {
    display: "none",
    textAlign: "left",
    fontFamily: FontFamily.font,
    position: "absolute",
  },
  itemTypo: {
    top: "10%",
    fontWeight: "600",
    fontSize: FontSize.font1_size,
    color: Color.black,
    display: "none",
    textAlign: "left",
    fontFamily: FontFamily.font,
    position: "absolute",
  },
  iconLayout1: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  priceTypo: {
    textAlign: "right",
    color: Color.black,
    fontFamily: FontFamily.font,
    position: "absolute",
  },
  iconPosition1: {
    bottom: "61.5%",
    height: "38.5%",
  },
  numberPosition1: {
    left: "33.82%",
    bottom: "11.59%",
    top: "53.81%",
    height: "34.6%",
  },
  viewPosition: {
    width: "30.03%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  iconPosition: {
    bottom: "16.62%",
    top: "16.62%",
    width: "66.67%",
    height: "66.75%",
    overflow: "hidden",
    position: "absolute",
  },
  textTypo: {
    top: "22.25%",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.font,
    position: "absolute",
  },
  size2Typo: {
    top: "30%",
    display: "none",
    textAlign: "left",
    fontFamily: FontFamily.font,
    fontSize: FontSize.font2_size,
    position: "absolute",
  },
  iconLayout: {
    width: "11.67%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
    top: "0%",
    position: "absolute",
  },
  numberPosition: {
    right: "34.4%",
    position: "absolute",
  },
  priceTypo1: {
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  icon7Position: {
    width: "33.06%",
    bottom: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
  },
  tabIconLayout: {
    width: "100%",
    position: "absolute",
  },
  checkOutFlexBox: {
    textAlign: "center",
    lineHeight: 20,
  },
  cart1Clr: {
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  upperNavShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  bgShadowBox: {
    borderRadius: Border.br_5xs,
    elevation: 25,
    shadowRadius: 25,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    position: "absolute",
    width: "100%",
    backgroundColor: Color.white,
  },
  color1: {
    color: Color.gray,
  },
  black: {
    color: Color.black,
  },
  color: {
    left: "30.53%",
    fontSize: FontSize.font2_size,
    top: "29.73%",
    display: "none",
  },
  size: {
    left: "50.53%",
    fontSize: FontSize.font2_size,
    top: "29.73%",
    display: "none",
  },
  item: {
    left: "30.26%",
    fontWeight: "600",
    fontSize: FontSize.font1_size,
  },
  photoIcon: {
    width: "30.32%",
    right: "69.68%",
    left: "0%",
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  price: {
    top: "61.33%",
    left: "80.26%",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  icon: {
    width: "11.66%",
    right: "-0.87%",
    left: "89.21%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    top: "0%",
    bottom: "61.5%",
    height: "38.5%",
    position: "absolute",
  },
  icon1: {
    left: "66.97%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    right: "0%",
  },
  bgIcon: {
    left: "0%",
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
    right: "0%",
    width: "100%",
  },
  rectangle: {
    top: 12,
    left: 5,
    backgroundColor: Color.gray,
    width: 14,
    height: 2,
    position: "absolute",
  },
  icon2: {
    right: "16.79%",
    left: "16.54%",
  },
  view: {
    right: "66.97%",
    left: "0%",
  },
  text: {
    left: "43.05%",
  },
  numberOfItems: {
    width: "31.79%",
    right: "34.39%",
    position: "absolute",
  },
  productCardbag: {
    top: 0,
    width: "95%",
  },
  color2: {
    left: "30.21%",
  },
  size2: {
    left: "50%",
  },
  item1: {
    top: "10.63%",
    left: "29.95%",
    fontWeight: "600",
    fontSize: FontSize.font1_size,
    color: Color.black,
  },
  photoIcon1: {
    width: "30.31%",
    right: "69.69%",
    left: "0%",
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
  },
  price1: {
    top: "57.14%",
    left: "78.39%",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  icon3: {
    height: "38.48%",
    right: "-0.89%",
    bottom: "61.52%",
    left: "89.22%",
  },
  icon5: {
    height: "66.49%",
    width: "66.75%",
    top: "16.75%",
    right: "16.63%",
    bottom: "16.75%",
    left: "16.63%",
    overflow: "hidden",
    position: "absolute",
  },
  text1: {
    top: "22.42%",
    left: "42.62%",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.font,
    lineHeight: 20,
    position: "absolute",
  },
  numberOfItems1: {
    height: "34.64%",
    width: "31.77%",
    top: "53.84%",
    bottom: "11.52%",
    left: "33.83%",
  },
  productCardbag1: {
    top: 139,
    height: 112,
    left: 0,
  },
  color4: {
    left: "30.77%",
    fontSize: FontSize.font2_size,
    top: "29.73%",
    display: "none",
  },
  size4: {
    left: "50.93%",
    fontSize: FontSize.font2_size,
    top: "29.73%",
    display: "none",
  },
  item2: {
    left: "30.5%",
    fontWeight: "600",
    fontSize: FontSize.font1_size,
  },
  price2: {
    top: "56.64%",
    left: "80.11%",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  icon6: {
    right: "-0.88%",
    left: "89.2%",
    bottom: "61.5%",
    height: "38.5%",
  },
  icon7: {
    left: "66.94%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
    right: "0%",
  },
  icon8: {
    right: "16.67%",
    left: "16.67%",
  },
  view2: {
    right: "66.94%",
    left: "0%",
  },
  text2: {
    left: "43.41%",
  },
  numberOfItems2: {
    width: "31.78%",
    left: "33.82%",
    bottom: "11.59%",
    top: "53.81%",
    height: "34.6%",
  },
  productCardbag2: {
    top: 277,
    width: "95%",
  },
  productCards: {
    top: 162,
    left: 25,
    height: 390,
  },
  price3: {
    height: "30%",
    width: "100%",
    top: "81%",
    left: "0%",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  totalAmount: {
    top: "81%",
    left: "5%",
    color: Color.colorDimgray,
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "center",
    position: "absolute",
    fontSize: FontSize.font1_size,
  },
  intelCoreI9: {
    top: 462,
    left: 153,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.font1_size,
  },
  nzktKraken240mm: {
    top: 324,
    left: 152,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.font1_size,
  },
  redragonRgbMouse: {
    top: 178,
    left: 149,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.font1_size,
  },
  cart1: {
    top: "30%",
    left: "45%",
    fontSize: FontSize.size_5xl,
    textAlign: "left",
  },
  arrowCircleLeftUndefined: {
    top: 21,
    left: 17,
    width: 32,
    height: 32,
    overflow: "hidden",
    position: "absolute",
  },
  upperNav: {
    width: "100%",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderBottomWidth: 0,
    height: 70,
    left: 0,
    overflow: "hidden",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  rectangle3: {
    shadowColor: "rgba(211, 38, 38, 0.25)",
    shadowRadius: 8,
    elevation: 8,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorCornflowerblue,
    left: "0%",
    bottom: "0%",
    height: "100%",
    top: "0%",
    position: "absolute",
    right: "0%",
    width: "100%",
  },
  checkOut: {
    top: "29.17%",
    left: "37.9%",
    color: Color.white,
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "center",
    position: "absolute",
    fontSize: FontSize.font_size,
  },
  buttonprimaryinactivebig: {
    top: "90%",
    left: "10%",
    width: "80%",
    height: 48,
    position: "absolute",
  },
  cart: {
   
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
  navbarPosition: {
    borderTopRightRadius: Border.br_3xs,
    position: "absolute",
  },
  vector: {
    width: 26,
    height: 25,
  },
  vector1: {
    width: 24,
    height: 24,
    marginLeft: 80,
  },
  vector2: {
    width: 27,
    marginLeft: 80,
    height: 25,
  },
  vector3: {
    width: 23,
    height: 27,
    marginLeft: 80,
  },
  navbar: {
    top: "90%",
    borderTopLeftRadius: Border.br_3xs,
    borderColor: Color.colorGray_600,
    height: 80,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    backgroundColor: Color.white,
    width: "100%",
  },
});

export default Cart;
