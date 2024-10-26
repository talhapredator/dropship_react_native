import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, Text, Image, Pressable, ScrollView, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { getProductsByCategory } from "../services/ProductService";



const ProductPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddToCart = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000); // Auto hide modal after 2 seconds
  };

  return (
    <ScrollView>
    <View style={styles.productPage}>
      <Pressable 
      style={styles.productPageChild}
      onPress={() => navigation.navigate("Product3DViewScreen")}>
        <Text style = {styles.text3d} >3D View</Text>
      </Pressable>
      <Text style={[styles.nzxtKrakenCooler, styles.textTypo]}>
        NZXT Kraken Cooler 360mm AIO
      </Text>
      <Text style={[styles.text, styles.textTypo]}>$ 465.00</Text>
      <Text style={[styles.aioAm5, styles.aioAm5Typo]}>AIO - AM5</Text>
      <View style={[styles.rating5, styles.ratingLayout]}>
        <Image
          style={[styles.rating5Child, styles.rating5ChildLayout]}
          resizeMode="cover"
          source={require("../assets/star-1.png")}
        />
        <Image
          style={[styles.rating5Item, styles.rating5ChildLayout]}
          resizeMode="cover"
          source={require("../assets/star-1.png")}
        />
        <Image
          style={[styles.rating5Inner, styles.rating5ChildLayout]}
          resizeMode="cover"
          source={require("../assets/star-1.png")}
        />
        <Image
          style={[styles.starIcon, styles.rating5ChildLayout]}
          resizeMode="cover"
          source={require("../assets/star-1.png")}
        />
        <Image
          style={[styles.rating5Child1, styles.rating5ChildLayout]}
          resizeMode="cover"
          source={require("../assets/star-5.png")}
        />
        <Text style={[styles.text1, styles.text1Typo]}>(257)</Text>
        <Pressable
        style={[styles.seeAllReviews]}
        onPress={() => navigation.navigate("Ratings")}
        >
          <Text style={[styles.seeAllReviews]}>
          See all reviews
          </Text>
        </Pressable>
      </View>
      <Text
        style={[styles.aboutThisItem, styles.youMayAlsoTypo]}
      >{`About this item
PERSONALIZATION THAT STUFFS: Display a favorite image, monitor real-time performance metrics from your PC, integrate web content and more with NZXT CAM software.
LCD SCREEN: The 1.54" square LCD with a 240 x 240 resolution, a 30Hz refresh rate and a bright 300cd/m² backlight brings the content on the screen to life.
HIGH-QUALITY PUMP: The powerful Asetek pump operates up to 2,800 rpm to ensure efficient and quiet coolant circulation.
POWERFUL COOLING: Static pressure fans with fluid dynamic bearings provide an optimal balance between high static pressure and airflow for powerful cooling with minimal noise.
EASY INSTALLATION: A single breakout cable from pump to motherboard allows for easy installation.`}</Text>
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
          <View style={[styles.rating51, styles.ratingLayout]}>
            <Image
              style={[styles.rating5Child, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Item, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Inner, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.starIcon, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Child1, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-5.png")}
            />
            <Text style={[styles.text1, styles.text1Typo]}>(257)</Text>
          </View>
          <Text style={[styles.am5Aio, styles.text1Typo]}>AM5 - AIO</Text>
          <Text style={[styles.nzxtProCooler, styles.text1Typo]}>
            NZXT PRO Cooler
          </Text>
        </View>
      </View>
      <View style={[styles.item8, styles.itemLayout]}>
        <Image
          style={styles.item7Child}
          resizeMode="cover"
          source={require("../assets/rectangle-32.png")}
        />
        <View style={styles.details}>
          <View style={[styles.rating51, styles.ratingLayout]}>
            <Image
              style={[styles.rating5Child, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Item, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Inner, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.starIcon, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Child1, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-5.png")}
            />
            <Text style={[styles.text1, styles.text1Typo]}>(257)</Text>
          </View>
          <Text style={[styles.am5Aio, styles.text1Typo]}>AM5 - AIO</Text>
          <Text style={[styles.nzxtProCooler, styles.text1Typo]}>
            NZXT PRO Cooler
          </Text>
        </View>
      </View>
      <View style={[styles.item9, styles.itemLayout]}>
        <Image
          style={styles.item7Child}
          resizeMode="cover"
          source={require("../assets/rectangle-32.png")}
        />
        <View style={styles.details}>
          <View style={[styles.rating51, styles.ratingLayout]}>
            <Image
              style={[styles.rating5Child, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Item, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Inner, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.starIcon, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-1.png")}
            />
            <Image
              style={[styles.rating5Child1, styles.rating5ChildLayout]}
              resizeMode="cover"
              source={require("../assets/star-5.png")}
            />
            <Text style={[styles.text1, styles.text1Typo]}>(257)</Text>
          </View>
          <Text style={[styles.am5Aio, styles.text1Typo]}>AM5 - AIO</Text>
          <Text style={[styles.nzxtProCooler, styles.text1Typo]}>
            NZXT PRO Cooler
          </Text>
        </View>
      </View>

      
      <ScrollView contentContainerStyle = {styles.component1}
       horizontal>
          <Image
            style={[styles.component1Child, styles.component1Layout]}
            resizeMode="cover"
            source={require("../assets/rectangle-38.png")}
          />
          <Image
            style={[styles.component1Item, styles.component1Layout]}
            resizeMode="cover"
            source={require("../assets/rectangle-38.png")}
          />
        
      </ScrollView>
      <View style={styles.cpuCoolersParent}>
        <Text style={[styles.cpuCoolers]}>
          CPU Coolers
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
      </View>
      
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
    <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Product added to cart</Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.publicSansSemiBold,
    fontWeight: "600",
    position: "absolute",
  },

  
  text3d: {
    fontSize: 16,
    color: "white",
    left: 65,
    top: 5,
    
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
    height: 12,
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
    maxHeight: "100%",
    maxWidth: "100%",
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
    top: "38.5%",
    left: "25%",
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorRoyalblue_100,
    width: 200,
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
    left: "75%",
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
    top: 667,
    left: 19,
    width: 395,
    color: Color.colorDimgray,
    fontSize: FontSize.size_xs,
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
    left: "30%",
    fontSize: FontSize.size_5xl,
    color: Color.colorBlack,
    top: "30%",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
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
    width: 430,
    borderColor: Color.colorGray_300,
    backgroundColor: Color.white,
    overflow: "hidden",
    borderStyle: "solid",
    left: 0,
    top: 0,
    position: "absolute",
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
  productPage: {
    
    backgroundColor: "#f9f9f9",
    flex: 1,
    height: 1342,
    width: "100%",
  },
});

export default ProductPage;
