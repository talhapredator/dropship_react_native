import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, StyleSheet, Image, View, Pressable, ScrollView, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";
import { getProductDetails, getCartData } from "../services/ProductService";
import StarRating from '../components/StarRating';

const HomePage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  // State for holding product data
  const [product1, setProduct1] = useState<any>(null);
  const [product2, setProduct2] = useState<any>(null);
  const [product3, setProduct3] = useState<any>(null); // State for Product 3
  const [product4, setProduct4] = useState<any>(null); // State for Product 4
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [cartItemCount, setCartItemCount] = useState(0);

  const scrollRef = useRef<ScrollView>(null);
  let scrollInterval: NodeJS.Timeout | null = null;


  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const product1Data = await getProductDetails("1");
        const product2Data = await getProductDetails("2");
        const product3Data = await getProductDetails("3");
        const product4Data = await getProductDetails("4");
        setProduct1(product1Data);
        setProduct2(product2Data);
        setProduct3(product3Data);
        setProduct4(product4Data);

        
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchProducts();
  }, []); // No dependencies needed, fetch once on mount

  // Fetch cart data when screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchCartData = async () => {
        const cartData = await getCartData();
        if (cartData && cartData.items) {
          // Count the number of items in the cart
          setCartItemCount(cartData.items.length);
        }
      };

      fetchCartData();
    }, []) // No dependencies, run every time the screen gains focus
  );

  // Carousel auto-scroll
  useEffect(() => {
    let currentIndex = 0;
    const images = [1, 2, 3]; // Total number of images

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollRef.current) {
          currentIndex = (currentIndex + 1) % images.length;
          scrollRef.current.scrollTo({
            x: currentIndex * 305, // Adjust this width based on your image width
            animated: true,
          });
        }
      }, 3000); // Auto-scroll every 3 seconds
    };

    startAutoScroll();

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval); // Clear interval on component unmount
      }
    };
  }, []); // No dependencies needed, just for auto-scroll

  if (isLoading) {
    return <Text>Loading...</Text>; // Display loading indicator
  }

  if (error) {
    return <Text>{error}</Text>; // Display error message
  }

  return (
    <View style={styles.homePage}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Sale Section */}
        <Text style={[styles.sale, styles.newTypo]}>Sale</Text>
        <View style={[styles.frameParent, styles.frameLayout1]}>
          <Pressable
            style={[styles.rectangleParent, styles.rectangleLayout]}
            onPress={() => {
              navigation.navigate("Product", {
                productId: "1",   // Ensure this value is correct
                productName: product1.name  // Ensure this value is correct
              });
            }}
          >
            <Image
              style={[styles.frameChild, styles.framePosition]}
              resizeMode="cover"
              source={{ uri: product1.imageUrl[0] }} // Product 1 Image
            />
            <Text style={[styles.item1, styles.itemTypo]}>{product1.name}</Text>
            <View style={styles.ratingLayout1}>
              <StarRating rating={product1.ratings} size={12} color="#55A5F8" />
              <Text style={[styles.text3]}>({product1.ratings})</Text>
            </View>
            <Text style={[styles.text, styles.textTypo3]}>PKR {product1.price}/-</Text>
          </Pressable>

          <Pressable
            style={[styles.rectangleGroup, styles.rectangleLayout]}
            onPress={() =>
              
              navigation.navigate("Product", {
                productId: "2",  // Pass product1 id
                productName: product2.name,  // Pass product1 name
              })
            }
          >
            <Image
              style={[styles.frameChild, styles.framePosition]}
              resizeMode="cover"
              source={{ uri: product2.imageUrl[1] }} // Product 2 Image
            />
            <Text style={[styles.item0, styles.itemTypo]}>{product2.name}</Text>
            <View style={styles.ratingLayout1}>
              <StarRating rating={product2.ratings} size={12} color="#55A5F8" />
              <Text style={[styles.text3]}>({product2.ratings})</Text>
            </View>
            <Text style={[styles.text, styles.textTypo3]}>PKR {product2.price}/-</Text>
          </Pressable>

          <Text style={[styles.new, styles.newTypo]}>New</Text>
        </View>

        {/* New Section */}
        <View style={[styles.frameGroup, styles.frameLayout1]}>
          <Pressable
            style={[styles.rectangleParent, styles.rectangleLayout1]}
            onPress={() =>
              navigation.navigate("Product", {
                productId: "3",  // Pass product1 id
                productName: product1.name,  // Pass product1 name
              })
            }
          >
            <Image
              style={[styles.frameChild, styles.framePosition]}
              resizeMode="cover"
              source={{ uri: product3.imageUrl[0] }} // Accessing the first image in the list
            />
            <Text style={[styles.item1, styles.itemTypo]}>{product3.name}</Text>
            <View style={styles.ratingLayout}>
              <StarRating rating={product3.ratings} size={12} color="#55A5F8" />
              <Text style={[styles.text3]}>({product3.ratings})</Text>
            </View>
            <Text style={[styles.text2nd, styles.textTypo3]}>PKR {product3.price}/-</Text>
          </Pressable>

          <Pressable
            style={[styles.rectangleGroup, styles.rectangleLayout1]}
            onPress={() =>
              navigation.navigate("Product", {
                productId: "4",  // Pass product1 id
                productName: product4.name,  // Pass product1 name
              })
            }
          >
            <Image
              style={[styles.frameChild, styles.framePosition]}
              resizeMode="cover"
              source={{ uri: product4.imageUrl[0] }} // Product 4 Image
            />
            <Text style={[styles.item2, styles.itemTypo]}>{product4.name}</Text>
            <View style={styles.ratingLayout}>
              <StarRating rating={product4.ratings} size={12} color="#55A5F8" />
              <Text style={[styles.text3]}>({product4.ratings})</Text>
            </View>
            <Text style={[styles.text2nd, styles.textTypo3]}>PKR {product4.price}/-</Text>
          </Pressable>
        </View>

        {/* Auto-scrolling Carousel */}
        <View style={styles.carousel}>
          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.galleryPadding}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          >
            <Image
               style={[styles.imageContainerLayout, { marginRight: 20 }]}
              resizeMode="cover"
              source={require("../assets/image-container.png")}
            />
            <Image
               style={[styles.imageContainerLayout, { marginRight: 80, right: 10 }]}
              resizeMode="cover"
              source={require("../assets/image-container1.png")}
            />
            <Image
               style={[styles.imageContainerLayout, { right: 80 }]}
              resizeMode="cover"
              source={require("../assets/image-container2.png")}
            />
          </ScrollView>
          <View style={styles.indicators}>
            <Image
              style={styles.indicatorsLayout}
              resizeMode="cover"
              source={require("../assets/ellipse-1.png")}
            />
            <Image
              style={[styles.indicatorsItem, styles.indicatorsLayout]}
              resizeMode="cover"
              source={require("../assets/ellipse-2.png")}
            />
            <Image
              style={[styles.indicatorsItem, styles.indicatorsLayout]}
              resizeMode="cover"
              source={require("../assets/ellipse-2.png")}
            />
          </View>
        </View>

        <Text style={styles.hiTalha}>Hi, Mutahir</Text>
        <Pressable
          style={styles.searchBox}
          onPress={() => navigation.navigate("Catagories4Search")}
        >
          <Image
            style={styles.icon2}
            resizeMode="cover"
            source={require("../assets/search-box.png")}
          />
        </Pressable>
      </ScrollView>

      {/* Bottom Navbar */}
      <View style={styles.navbar}>
        <Pressable style={styles.vector} onPress={() => navigation.navigate("StyleMainPage")}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/vector.png")}
          />
        </Pressable>
        <Pressable style={styles.vector1} onPress={() => navigation.navigate("Catagories")}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/vector1.png")}
          />
        </Pressable>
        <Pressable style={styles.vector2} onPress={() => navigation.navigate("Cart")}>
        <View style={styles.cartIconContainer}>
          <Image
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
        <Pressable style={styles.vector3} onPress={() => navigation.navigate("MyAccount")}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/vector3.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  newTypo: {
    width: 143,
    display: "flex",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    fontSize: FontSize.size_13xl,
    alignItems: "center",
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },

  scrollContent: {
    top: 29,
    left: 15,
    width: "100%",
    height: 1050,
    position: "absolute",
  },
  frameLayout1: {
    width: "100%",
    position: "absolute",
  },
  rectangleLayout: {
    height: "90%",
    borderRadius: Border.br_mini,
    width: "45%",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    position: "absolute",
    overflow: "hidden",
  },
  rectangleLayout1: {
    height: "95%",
    borderRadius: Border.br_mini,
    width: "45%",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    position: "absolute",
    overflow: "hidden",
  },
  framePosition: {
  
  },
  itemTypo: {
    height: "15%",
    width: "100%",
    fontSize: 12,
    left: "3%",
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  textTypo3: {
    fontSize: FontSize.font2_size,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
  },
  discountLayout: {
    width: "55%",
    height: "32%",
    position: "absolute",
  },
  textTypo2: {
    height: "20%",
    width: "20%",
    textAlign: "center",
    color: Color.white,
    fontSize: FontSize.size_xs,
    top: 5,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  oldLayout: {
    width: "0%",
    height: "0%",
  },
  textTypo1: {
    color: Color.colorDimgray,
    fontSize: FontSize.font2_size,
    
    textAlign: "left",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  ratingLayout: {
    height: "10%",
    width: "50%",
    top: "70%",
    position: "absolute",
    left: "2.5%"
  },
  ratingLayout1: {
    height: "10%",
    width: "50%",
    top: "72.5%",
    position: "absolute",
    left: "2.5%"
  },
  rating5ChildLayout: {
    width: "20%",
    height: "60%",
    position: "absolute",
  },
  textTypo: {
    width: "50%",
    fontSize: FontSize.font1_size,
    height: "80%",
    color: Color.colorDimgray,
    top: 0,
    alignItems: "center",
    display: "flex",
    textAlign: "left",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    position: "absolute",
  },
  text4Position: {
    top: "80%",
    position: "absolute",
  },
  frameLayout: {
    height: 250,
    width: "45%",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    borderRadius: Border.br_mini,
    position: "absolute",
    overflow: "hidden",
  },
  imageContainerLayout: {
    height: 120,
    borderRadius: Border.br_5xs,
    width: 320,
    padding: 0,
    overflow: "hidden",
  },
  indicatorsLayout: {
    height: 8,
    width: 8,
  },
  sale: {
    top: 250,
    left: 0,
    height: 71,
  },
  frameChild: {
    height: 139,
    left: 17,
    width: 130,
    top: 0,
    position: "absolute",
  },
  item1: {
    top: 150,
  },
  text: {
    left: 5,
    top: 200,
    position: "absolute",
  },
  text2nd: {
    left: 5,
    top: 215,
    position: "absolute",
  },
  discount: {
    
  },
  text1: {
    left: 126,
  },
  discountBox: {
    top: 206,
    left: 112,
  },
  text2: {
    left: 8,
  },
  oldPriceChild: {
    top: 8,
    borderColor: Color.colorDimgray,
    borderTopWidth: 1,
    width: 33,
    height: 1,
    left: 0,
    borderStyle: "solid",
    position: "absolute",
  },
  oldPrice: {
    left: 7,
    top: 211,
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
  text3: {
    left: 60,
    top: -13,
    color: Color.black,
    fontSize: 10
  },
  rating5: {
    left: 6,
  },
  rectangleParent: {
    
  },
  frameItem: {
    height: 142,
    left: 0,
    width: 180,
    top: 0,
    position: "absolute",
  },
  item2: {
    top: 150,
  },
  item0: {
    top: 150,
  },
  text4: {
    left: 42,
    fontSize: FontSize.font2_size,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
  },
  text5: {
    left: 124,
  },
  discountBox1: {
    top: 205,
    left: 110,
  },
  text6: {
    left: 7,
  },
  oldPrice1: {
    width: 32,
    height: 16,
    left: 6,
  },
  text7: {
    left: 90,
  },
  rating4: {
    left: 7,
  },
  rectangleGroup: {
    left: "47%",
  },
  rectangleContainer: {
    left: "100%",
  },
  frameParent: {
    top: 300,
    left: '1%',
    height: "25%",
  },
  framePressable: {
    left: 0,
  },
  rectangleParent1: {
    left: 205,
  },
  frameView: {
    left: 400,
  },
  frameGroup: {
    top: 650,
    height: "25%",
    left: '1%',
    overflow: "hidden",
  },
  new: {
    top: 265,
    left: 0,
    height: 47,
  },
  hiTalha: {
    top: "1%",
    left: "35%",
    fontSize: 20,
    fontFamily: FontFamily.publicSansRegular,
    
    color: Color.colorBlack,
    position: "absolute",
    width: 900,
    height: 40,
    backgroundColor: Color.white
  },
  icon: {
    
  },
  icon2: {
    width: 36,
    height: 36,
  },
  searchBox: {
    left: "83%",
    top: "1%",
  },
  imageContainerIcon1: {
    marginLeft: 0,
  },
  gallery: {
    flexDirection: "row",
  },
  galleryPadding: {
   
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: Color.white,
    
  },
  indicatorsItem: {
    marginLeft: 5,
  },
  indicators: {
    padding: Padding.p_base,
    marginTop: 0,
    width: 0,
    right: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    top: "5%",
    left: 0,
    width: 400,
    height: 206,
    paddingHorizontal: 0,
    paddingVertical: Padding.p_base,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: Color.white,
    
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
    width: 24,
    marginLeft: 80,
    height: 26,
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
  navbar: {
    top: "90%",
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,

    height: 85,
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    flexDirection: "row",
    justifyContent: "center",
    left: 0,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    alignItems: "center",
    position: "absolute",
    backgroundColor: Color.white,
    width: "100%",
  },
  homePage: {
   
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
    position: "absolute",
  },
});

export default HomePage;
