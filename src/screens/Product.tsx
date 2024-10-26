import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Modal, ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { getProductDetails, addItemToCart, getCartData } from "../services/ProductService";
import StarRating from '../components/StarRating'; // Make sure this service is correctly implemented


type ProductPageRouteParams = {
  productId: string;
  productName: string;
};

const Product = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute();
  const { productId, productName } = route.params as ProductPageRouteParams;



  const [productDetails, setProductDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginRequired, setLoginRequired] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("Product added to cart");
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const details = await getProductDetails(productId);
        setProductDetails(details);
      } catch (error: any) {
        console.error('Error fetching product details:', error.response?.data || error.message);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const fetchCartData = async () => {
    const cartData = await getCartData();
    if (cartData && cartData.items) {
      setCartItemCount(cartData.items.length);
    }
  };

  const handleAddToCart = async () => {
    try {
      setModalVisible(true);
      const result = await addItemToCart(parseInt(productId), 1);

      if (result.message && result.message === "You need to be logged in to add items to the cart.") {
        setModalMessage(result.message);
        setLoginRequired(true);
      } else {
        setModalMessage("Product added to cart");
        setLoginRequired(false);

        await fetchCartData(); // Fetch cart data after adding to cart

        setTimeout(() => {
          setModalVisible(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setError("Failed to add product to cart.");
    }
  };

  useEffect(() => {
    fetchCartData(); // Fetch cart data when component mounts
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Color.colorRoyalblue_200} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!productDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

    return (
      <ScrollView>
        <View style={styles.productPage}>
          <Pressable 
            style={styles.productPageChild}
            onPress={() => navigation.navigate("ThreeD")}>
            <Text style={styles.text3d}>3D View</Text>
          </Pressable>
          
          <Text style={[styles.nzxtKrakenCooler, styles.textTypo]}>
            {productName}
          </Text>
          <Text style={[styles.text, styles.textTypo]}>PKR {productDetails.price}/-</Text>
          <Text style={[styles.aioAm5, styles.aioAm5Typo]}>{productDetails.categoryName}</Text>
          
          <View style={[styles.ratingContainer, styles.ratingLayout]}>
            <StarRating rating={productDetails.ratings} size={16} color="#FFD700" />
            <Text style={[styles.text1, styles.text1Typo]}>({productDetails.ratings})</Text>
            {/* <Pressable
              style={styles.seeAllReviews}
              onPress={() => navigation.navigate("Ratings")}
            >
              <Text style={styles.seeAllReviews}>
                See all reviews
              </Text>
            </Pressable> */}
          </View>
          
          <Text style={[styles.aboutThisItem, styles.youMayAlsoTypo]}>
            {productDetails.description || "No description available."}
          </Text>
          <Text style={[styles.youMayAlso, styles.youMayAlsoTypo]}>
            You may also like this:
          </Text>
          <View style={styles.item7}>
            <Image
              style={styles.item7Child}
              resizeMode="cover"
              source={require("../assets/rectangle-32.png")}
            />
            <View style={styles.details}>
              <View style={[styles.ratingContainer, styles.ratingLayout]}>
                <StarRating rating={4.5} size={14} color="#FFD700" />
                <Text style={[styles.text1, styles.text1Typo]}>(257)</Text>
              </View>
              <Text style={[styles.am5Aio, styles.text1Typo]}>AM5 - AIO</Text>
              <Text style={[styles.nzxtProCooler, styles.text1Typo]}>
                NZXT PRO Cooler
              </Text>
            </View>
          </View>
          
          <ScrollView contentContainerStyle={styles.component1} horizontal>
            <Image
              style={[styles.component1Child, styles.component1Layout]}
              resizeMode="cover"
              source={{ uri: productDetails.imageUrl[0] }} 
            />
            <Image
              style={[styles.component1Item, styles.component1Layout]}
              resizeMode="cover"
              source={{ uri: productDetails.imageUrl[1] }} 
            />
          </ScrollView>
          <View style={styles.cpuCoolersParent}>
            <Text style={[styles.cpuCoolers]}>
              Product
            </Text>
            <Pressable
              style={styles.arrowCircleLeftUndefined}
              onPress={() => navigation.navigate("StyleMainPage")}
            >
              <Image
                style={styles.icon}
                resizeMode="cover"
                source={require("../assets/arrow-circle-left--undefined.png")}
              />
            </Pressable>
      <Pressable style={styles.vector2} onPress={() => navigation.navigate("Cart")}>
        <View style={styles.cartIconContainer}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
          {cartItemCount > 0 && (
            <View style={styles.dot}>
              <Text style={styles.dotText}>{cartItemCount}</Text>
            </View>
          )}
          </View>
        </Pressable>
          </View>
          {/* Add your existing code for other sections here */}
  
          <View style={[styles.productPageInner, styles.frameChildLayout]}>
            <View style={[styles.rectangleParent, styles.frameChildLayout]}>
              <View style={[styles.frameChild, styles.frameChildLayout]} />
              <Pressable style={styles.frameItem} onPress={handleAddToCart} />
              <Text style={[styles.addToCart, styles.addToCartPosition]}>
                ADD TO CART
              </Text>
            </View>
          </View>
        </View>
           {/* Modal for Add to Cart or Login */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>

            {loginRequired && (
              <View style={styles.buttonContainer}>
                <Pressable style={styles.signUpButton} onPress={() => {
                  setModalVisible(false);
                  navigation.navigate("SignUp");
                }}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <Pressable style={styles.okButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttonText}>OK</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </Modal>
      </ScrollView>
    );
  };
  

// StyleSheet remains unchanged
const styles = StyleSheet.create({
    textTypo: {
        textAlign: "right",
        fontFamily: FontFamily.publicSansSemiBold,
        fontWeight: "600",
        position: "absolute",
      },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      ratingContainer: {
        top: 630,
        left: 16,
        width: 300,
        height: 30,
      },
      
      text3d: {
        fontSize: 16,
        color: "white",
        left: 46,
        top: 6,
        
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: 200,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        color: '#000',
      },
      aioAm5Typo: {
        fontSize: FontSize.size_xs,
        color: Color.colorDimgray,
      },
      ratingLayout: {
        width: 113,
        height: 22,
        position: "absolute",
      },
      rating5ChildLayout: {
        width: 13,
        top: 0,
        height: 12,
        position: "absolute",
      },
      text1Typo: {
        fontFamily: FontFamily.publicSansBold,
        fontWeight: "700",
        textAlign: "left",
      },
      youMayAlsoTypo: {
        fontFamily: FontFamily.publicSansRegular,
        textAlign: "left",
        position: "absolute",
      },
      itemLayout: {
        overflow: "hidden",
        height: 260,
        width: 186,
        borderWidth: 1,
        borderColor: Color.colorGray_600,
        borderStyle: "solid",
        borderRadius: Border.br_3xs,
        top: 942,
        position: "absolute",
      },
      component1Layout: {
        maxHeight: "80%",
        maxWidth: "50%",
        bottom: "0%",
        top: "0%",
        width: "49.18%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
      },
      addToCartPosition: {
        top: 50,
        fontFamily: FontFamily.publicSansRegular,
        textAlign: "left",
        position: "absolute",
      },
      frameChildLayout: {
        height: 120,
        width: "100%",
        position: "absolute",
      },
      productPageChild: {
        top: "35.5%",
        left: "30%",
        borderRadius: Border.br_xl,
        backgroundColor: Color.colorRoyalblue_100,
        width: 150,
        height: 35,
        position: "absolute",
        zIndex: 1,
      },
      dView: {
        top: 519,
        left: 176,
        color: Color.white,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.publicSansSemiBold,
        fontWeight: "600",
      },
      nzxtKrakenCooler: {
        top: 563,
        color: Color.colorBlack,
        left: 16,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.publicSansSemiBold,
        fontWeight: "600",
      },
      text: {
        top: "45%",
        paddingLeft: 300,
        color: Color.colorBlack,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.publicSansSemiBold,
        fontWeight: "600",
      },
      aioAm5: {
        top: 593,
        color: Color.colorDimgray,
        left: 17,
        textAlign: "left",
        fontFamily: FontFamily.publicSansSemiBold,
        fontWeight: "600",
        position: "absolute",
      },
      rating5Child: {
        left: 0,
      },
      rating5Item: {
        left: 16,
      },
      rating5Inner: {
        left: 32,
      },
      starIcon: {
        left: 48,
      },
      rating5Child1: {
        left: 64,
      },
      text1: {
        left: 83,
        display: "flex",
        alignItems: "center",
        width: 30,
        fontSize: FontSize.font2_size,
        fontFamily: FontFamily.publicSansBold,
        fontWeight: "700",
        position: "absolute",
        top: 0,
        height: 12,
        color: Color.colorDimgray,
      },
      rating5: {
        height: 12,
        top: 613,
        left: 16,
      },
      aboutThisItem: {
        top: "50%",
        left: "3%",
        width: "90%",
        color: Color.colorDimgray,
        fontSize: FontSize.size_xs,
        letterSpacing: 1,
        lineHeight: 25,
      },
      youMayAlso: {
        top: 903,
        fontSize: FontSize.font1_size,
        left: 17,
        color: Color.colorBlack,
      },
      item7Child: {
        borderTopLeftRadius: Border.br_3xs,
        borderTopRightRadius: Border.br_3xs,
        height: 180,
        width: 186,
        left: 0,
        top: 0,
        position: "absolute",
      },
      rating51: {
        left: 0,
        top: 0,
        height: 12,
      },
      am5Aio: {
        top: 19,
        fontSize: FontSize.font2_size,
        fontFamily: FontFamily.publicSansBold,
        fontWeight: "700",
        position: "absolute",
        left: 0,
        color: Color.colorBlack,
      },
      nzxtProCooler: {
        top: 39,
        fontSize: FontSize.font1_size,
        left: 0,
        color: Color.colorBlack,
        position: "absolute",
      },
      details: {
        top: 187,
        left: 9,
        width: 136,
        height: 58,
        position: "absolute",
      },
      item7: {
        height: 260,
        borderWidth: 1,
        borderColor: Color.colorGray_600,
        borderStyle: "solid",
        borderRadius: Border.br_3xs,
        top: 942,
        width: 186,
        left: 16,
        position: "absolute",
      },
      item8: {
        left: 215,
      },
      item9: {
        left: 414,
      },
      seeAllReviews: {
        
        width:"100%",
        height: 20,
        color: "blue",
        fontSize: 16,
        left: "55%",
        top: -2,
        zIndex: 1,
      },
      seeAllReviewsContainer: {
        height: 40,
        left: 120,
        bottom: 15,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white
        
        
      },
      component1Child: {
        right: "50.82%",
        left: "0%",
      },
      component1Item: {
        right: "0%",
        left: "50.82%",
      },
      component1: {
        top: 101,
        width: 612,
        height: "30%",
        left: 0,
        position: "absolute",
      },
      cpuCoolers: {
        left: "10%",
        fontSize: 20,
        color: Color.colorBlack,
        top: "5%",
        width: '96%',
        textAlign: 'center',
       
      },
      icon: {
        
        overflow: "hidden",
       
      },
      arrowCircleLeftUndefined: {
        left: 20,
        top: "30%",
        width: 32,
        height: 32,
        position: "absolute",
      },
      cpuCoolersParent: {
        borderBottomWidth: 1,
        height: 70,
        width: '100%',
        borderColor: Color.colorGray_300,
        backgroundColor: Color.white,
        
        borderStyle: "solid",
       
        position: "absolute",
        flexDirection: 'row'
      },
      frameChild: {
        borderTopWidth: 1,
        borderColor: Color.colorGray_300,
        backgroundColor: Color.white,
        height: 120,
        borderStyle: "solid",
        left: 0,
        top: 0,
      },
      frameItem: {
        top: 35,
        left: "10%",
        borderRadius: Border.br_11xl,
        backgroundColor: Color.colorRoyalblue_200,
        width: "80%",
        height: 50,
        position: "absolute",
        alignContent: "center",
      },
      addToCart: {
        textAlign: "center",
        left: "35%", 
        fontSize: FontSize.font1_size,
        color: Color.white,
      },
      rectangleParent: {
        left: 0,
        width:"100%",
        bottom: "100%",
      },
      productPageInner: {
        top: "100%",
        left: 2,
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
      },
      signUpButton: {
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
        marginRight: 10
      },
      okButton: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 5
      },
      buttonText: {
        color: "white",
        fontSize: 16
      },
      vector2: {
        width: '0%',
        top: 24,
        height: 30,
        
        alignItems: 'flex-end'
      },
      vector3: {
        width: 23,
        height: 27,
        marginLeft: 80,
      },
      cartIconContainer: {
        position: 'relative',
      },
      dot: {
        position: 'absolute',
        right: '-20%',
        top: 0,
        backgroundColor: 'red',
        borderRadius: 20,
        width: 12,
        height: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      dotText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 8,
      },
      productPage: {
        
        backgroundColor: "#f9f9f9",
        flex: 1,
        height: 1342,
        width: "100%",
      },
});

export default Product;
