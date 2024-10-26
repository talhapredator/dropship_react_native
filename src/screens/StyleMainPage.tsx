import { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, Modal, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { Video, ResizeMode } from 'expo-av';


const StyleMainPage = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const video = useRef(null);
  const [status, setStatus] = useState({});

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     e.preventDefault(); // Prevent default back navigation behavior
  //     setIsModalVisible(true); // Show modal when user tries to go back
  //   });

  //   return unsubscribe; // Cleanup the listener on unmount
  // }, [navigation]);

  // const handleLogout = () => {
  //   setIsModalVisible(false);
  //   navigation.navigate('Login'); // Navigate to the login screen
  // };

  // const handleStay = () => {
  //   setIsModalVisible(false); // Close the modal and stay on the current screen
  // };


  return (
    <ScrollView>
    <View style={styles.styleMainPage}>
      
      <Image
        style={[styles.styleMainPageChild, styles.tabIconLayout]}
        resizeMode="cover"
        source={require("../assets/rectangle-7.png")}
      />
      <Pressable onPress={() => navigation.navigate("Chatbot")}>
       <Image
         style={styles.styleMainPageItem}
         resizeMode="cover"
         source={require("../assets/rectangle-9.png")}
       />
     </Pressable>
      <Text style={[styles.accessories, styles.latestTechTypo]}>
        Accessories
      </Text>
      <Image
        style={styles.styleMainPageInner}
        resizeMode="cover"
        source={require("../assets/rectangle-10.png")}
      />
      <View style={[styles.rectangleParent, styles.frameChildLayout]}>
        <View style={[styles.frameChild, styles.frameChildLayout]} />
        <Pressable onPress={() => navigation.navigate("OrdersList")}>
        <Text style={[styles.summerSaleUptoContainer, styles.saleTypo]}>
          <Text style={styles.summerSale}>{`Summer Sale `}</Text>
          <Text style={styles.upto50Off}>Upto 50% off</Text>
        </Text>
        </Pressable>
      </View>
      <Text style={[styles.exclusiveSale, styles.exclusiveSalePosition]}>
        Exclusive Sale
      </Text>
      <Pressable
        style={[styles.rectanglePressable, styles.exclusiveSalePosition]}
        onPress={() => navigation.navigate("HomePage")}
      />
      <Text style={[styles.explore, styles.saleTypo]}>{`Explore >`}</Text>
      <Text style={[styles.latestTech, styles.latestTechTypo]}>
        Latest Tech
      </Text>
    </View>

    {/* <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Log Out?</Text>
            <View style={styles.modalButtons}>
              <Button title="  Yes  " onPress={handleLogout} />
              <Button title="   No   " onPress={handleStay} />
            </View>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabIconLayout: {
    width: "100%",
    position: "absolute",
  },
  latestTechTypo: {
    textAlign: "left",
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.size_5xl,
    color: Color.white,
    position: "absolute",
    
  },
  frameChildLayout: {
    height: 231,
    width: "70%",
    left: 0,
    position: "absolute",
  },
  saleTypo: {
    fontFamily: FontFamily.publicSansSemiBold,
    fontWeight: "600",
    textAlign: "left",
  },
  exclusiveSalePosition: {
    left: 16,
    position: "absolute",
  },
  styleMainPageChild: {
    
    height: 363,
    left: 0,
    width: 430,
    top: 0,
  },
  styleMainPageItem: {
    top: 594,
    height: 264,
    width: "49%",
    left: 0,
    position: "absolute",
  },
  accessories: {
    top: 611,
    left: 11,
    
  },
  styleMainPageInner: {
    left: "49%",
    width: "51%",
    height: 495,
    top: 363,
    position: "absolute",
  },
  frameChild: {
    backgroundColor: '#4052b0',
    height: 0,
    width: 1,
    marginBottom: 10,
    
  },
  summerSale: {
    fontSize: FontSize.size_6xl,
    color: Color.white
  },
  upto50Off: {
    fontSize: FontSize.size_xl,
    color: Color.white
  },
  summerSaleUptoContainer: {
    top: 37,
    left: 19,
    color: Color.colorRoyalblue_100,
    width: "50%",
    height: 150,
    
  },
  rectangleParent: {
    top: 363,
    
  },
  exclusiveSale: {
    top: 256,
    fontSize: FontSize.size_6xl,
    fontFamily: FontFamily.publicSansSemiBold,
    fontWeight: "600",
    textAlign: "left",
    color: Color.white,
  },
  rectanglePressable: {
    top: 302,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorRoyalblue_300,
    width: 140,
    height: 38,
  },
  explore: {
    top: 312,
    left: 53,
    fontSize: 15,
    color: Color.white,
    fontWeight: "600",
    position: "absolute",
  },
  latestTech: {
    top: 572,
    left: "60%",
  },
  tabIcon: {
    top: "91%",
    left: 0,
    
    borderBottomRightRadius: Border.br_16xl,
    borderBottomLeftRadius: Border.br_16xl,
    height: 80,
    width: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Color.black
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    width: 150,
  },
  styleMainPage: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 932,
    overflow: "hidden",
  },
});

export default StyleMainPage;
