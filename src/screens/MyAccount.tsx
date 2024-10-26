import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Image, View, Pressable, Modal, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import axios from "axios";

interface UserProfile {
  fullName: string;
  email: string;
}

const MyAccount = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Function to handle logout confirmation
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/logout'); 
      setModalVisible(false); 
      navigation.navigate('StartScreen'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/profile');
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Fetch profile when component loads
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.myAccount}>
       <Text style={[styles.matildaBrown, styles.matildaBrownClr]}>
        {userProfile ? userProfile.fullName : 'Loading...'}
      </Text>

      <Image
        style={[styles.baselineLocalShipping24pxIcon, styles.iconLayout]}
        resizeMode="cover"
        source={require('../assets/baselinelocal-shipping24px.png')}
      />

      {/* Display dynamic email or a placeholder */}
      <Text style={styles.matildabrownmailcom}>
        {userProfile ? userProfile.email : 'Loading...'}
      </Text>
      <Pressable
        style={[styles.parent, styles.groupParentLayout]}
        onPress={() => navigation.navigate("AddressEdit")}
      >
        <View style={styles.view}>
          <Text style={[styles.shippingAddresses, styles.dividerPosition]}>
            Shipping addresses
          </Text>
          <Text style={[styles.ddresses, styles.ddressesTypo]}>3 Addresses</Text>
        </View>
        <View style={[styles.divider, styles.dividerPosition]} />
        <Image
          style={[styles.chevronRightIcon, styles.passwordPosition]}
          resizeMode="cover"
          source={require("../assets/chevron-right.png")}
        />
      </Pressable>
      <View style={[styles.group, styles.groupParentLayout]}>
        <Pressable 
        onPress={() => navigation.navigate("OrdersList")}
        style={[styles.view1, styles.viewPosition]}>
          <Text style={[styles.shippingAddresses, styles.dividerPosition]}>
            Orders
          </Text>
          <Text style={[styles.password, styles.passwordPosition]}>
            Total Orders: 1
          </Text>
        </Pressable>
        <Image
          style={[styles.chevronRightIcon, styles.passwordPosition]}
          resizeMode="cover"
          source={require("../assets/chevron-right.png")}
        />
      </View>
      <Pressable
        style={[styles.dividerParent, styles.groupParentLayout]}
        onPress={() => navigation.navigate("PaymentEdit")}
      >
        <View style={[styles.divider, styles.dividerPosition]} />
        <View style={[styles.view2, styles.viewPosition]}>
          <Text style={[styles.shippingAddresses, styles.dividerPosition]}>
            Payment methods
          </Text>
          <Text style={[styles.password, styles.passwordPosition]}>
            Visa **34
          </Text>
        </View>
        <Image
          style={[styles.chevronRightIcon, styles.passwordPosition]}
          resizeMode="cover"
          source={require("../assets/chevron-right.png")}
        />
      </Pressable>
      <Pressable
        style={[styles.dividerGroup, styles.groupParentLayout]}
        onPress={() => setModalVisible(true)} 
      >
        <View style={[styles.divider, styles.dividerPosition]} />
        <View style={styles.view3}>
          <Text style={[styles.shippingAddresses, styles.dividerPosition]}>
            Log Out
          </Text>
        </View>
        <Image
          style={[styles.chevronRightIcon, styles.passwordPosition]}
          resizeMode="cover"
          source={require("../assets/chevron-right.png")}
        />
      </Pressable>
      <Image
        style={[styles.tabIcon, styles.tabIconPosition]}
        resizeMode="cover"
        source={require("../assets/tab3.png")}
      />
      <Image
        style={styles.avaIcon}
        resizeMode="cover"
        source={require("../assets/ava.png")}
      />
      <Pressable style={[styles.upperNav, styles.tabIconPosition]} onPress={() => navigation.goBack()}>
        <Text style={[styles.account]}>Account</Text>
        <Image
          style={[styles.arrowCircleLeftUndefined, styles.accountPosition]}
          resizeMode="cover"
          source={require("../assets/arrow-circle-left--undefined.png")}
        />
      </Pressable>
      {/* Modal for Logout Confirmation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
       <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>Yes, Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  matildaBrownClr: {
    color: Color.black,
    textAlign: "left",
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  groupParentLayout: {
    height: 72,
    left: 20,
    width: 375,
    overflow: "hidden",
    position: "absolute",
  },
  dividerPosition: {
    left: 0,
    position: "absolute",
  },
  ddressesTypo: {
    fontSize: FontSize.font2_size,
    left: 0,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
  },
  passwordPosition: {
    top: 24,
    position: "absolute",
  },
  viewPosition: {
    height: 37,
    top: 19,
    left: 15,
    position: "absolute",
  },
  tabIconPosition: {
    width: '100%',
    position: "absolute",
  },
  accountPosition: {
    top: 21,
    position: "absolute",
  },
  matildaBrown: {
    top: 166,
    left: 119,
    fontSize: FontSize.headline3_size,
    lineHeight: 22,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  baselineLocalShipping24pxIcon: {
    top: 400,
    left: 256,
    overflow: "hidden",
    position: "absolute",
  },
  matildabrownmailcom: {
    top: 188,
    left: 120,
    fontSize: FontSize.font_size,
    lineHeight: 20,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  shippingAddresses: {
    top: 0,
    fontSize: FontSize.font1_size,
    fontWeight: "600",
    fontFamily: FontFamily.publicSansSemiBold,
    textAlign: "left",
    color: Color.black,
  },
  ddresses: {
    top: 25,
    position: "absolute",
  },
  view: {
    left: 16,
    width: 149,
    height: 38,
    top: 18,
    position: "absolute",
  },
  divider: {
    top: 71,
    backgroundColor: Color.gray,
    height: 1,
    opacity: 0.05,
    width: 375,
    left: 0,
  },
  chevronRightIcon: {
    left: 343,
    height: 24,
    width: 24,
  },
  parent: {
    top: 330,
  },
  password: {
    fontSize: FontSize.font2_size,
    left: 0,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
  },
  view1: {
    width: '50%',
  },
  group: {
    top: 474,
  },
  view2: {
    width: 136,
  },
  dividerParent: {
    top: 402,
  },
  view3: {
    width: 60,
    height: 19,
    left: 15,
    top: 18,
    position: "absolute",
  },
  dividerGroup: {
    top: 258,
  },
  tabIcon: {
    top: 843,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_16xl,
    borderBottomLeftRadius: Border.br_16xl,
    height: 89,
  },
  avaIcon: {
    top: 156,
    left: 36,
    width: 64,
    height: 64,
    position: "absolute",
  },
  account: {
    left: '0%',
    top: '35%',
    fontSize: 20,
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.publicSansRegular,
  },
  arrowCircleLeftUndefined: {
    left: 17,
    width: 32,
    height: 32,
    overflow: "hidden",
  },
  upperNav: {
   
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    height: 70,
    overflow: "hidden",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    color: Color.black

  },
  modalButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: Color.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: Color.colorRoyalblue_300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: FontFamily.robotoBold,
    fontSize: FontSize.size_mid,
  },
  myAccount: {
    
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    height: 932,
  },
});

export default MyAccount;
