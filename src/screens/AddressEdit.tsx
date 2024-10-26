import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { FontSize, Border, Color, FontFamily } from "../GlobalStyles";
import { getUserProfile, updateUserProfile } from "../services/ProductService"; // Import the service
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";


const AddressEdit = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [fullName, setFullName] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true); 
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchUserProfileData = async () => {
      const userProfile = await getUserProfile();

      if (userProfile) {
        setFullName(userProfile.fullName);
        setShippingAddress(userProfile.address);
        setPhoneNumber(userProfile.phoneNumber);
        setCity(userProfile.city);
      }
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchUserProfileData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.blurContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Updating Address</Text>
        </View>
      </View>
    );
  }
  
  const handleUpdateProfile = async () => {
    const profileData = {
      fullName,
      address: shippingAddress,
      phoneNumber,
      city,
    };

    const updatedProfile = await updateUserProfile(profileData);

    if (updatedProfile) {
      
    } else {
      
    }
  };
  

  return (
    <View style={styles.addressEdit}>
      <View style={[styles.upperNav, styles.arrowPosition]}>
        <Text style={[styles.editAddress]}>Information</Text>
        <Image
          style={[styles.arrowCircleLeftUndefined, styles.arrowPosition]}
          resizeMode="cover"
          source={require("../assets/arrow-circle-left--undefined.png")}
        />
      </View>
      <View style={[styles.fields, styles.fieldsLayout]}>
        <View style={[styles.textFields, styles.fieldsLayout]}>
          <View style={[styles.textFieldordinaryinactive, styles.textLayout]}>
            <View style={styles.textChildShadowBox} />
            <TextInput
              style={[styles.input, styles.addressFlexBox]}
              placeholder="Full name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Text style={[styles.label, styles.addressFlexBox]}>Full Name</Text>
          </View>
          <View style={[styles.textFieldordinaryfocused, styles.textPosition]}>
            <View style={styles.textChildShadowBox} />
            <TextInput
              style={[styles.input, styles.addressFlexBox]}
              placeholder="Shipping Address"
              value={shippingAddress}
              onChangeText={setShippingAddress}
            />
            <Text style={[styles.label, styles.addressFlexBox]}>Shipping Address</Text>
            <View style={styles.line} />
          </View>
          <View style={[styles.textFieldordinaryfocused1, styles.textPosition]}>
            <View style={styles.textChildShadowBox} />
            <TextInput
              style={[styles.input, styles.addressFlexBox]}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <Text style={[styles.label, styles.addressFlexBox]}>Phone Number</Text>
            <View style={styles.line} />
          </View>
          <View style={[styles.textFieldordinaryfocused4, styles.textPosition]}>
            <View style={styles.textChildShadowBox} />
            <TextInput
              style={[styles.input, styles.addressFlexBox]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <Text style={[styles.label, styles.addressFlexBox]}>City</Text>
            <View style={styles.line} />
          </View>
        </View>
      </View>
      <TouchableOpacity
       style={styles.buttonprimaryinactivebig}
       onPress={async () => {
        setIsLoading(true);
        await handleUpdateProfile();   // Send the updated profile data to the server
        setTimeout(() => {
          setIsLoading(false); // Hide loading screen
          navigation.goBack();  // Delay navigation back by 3 seconds
        }, 3000);  // 3000 milliseconds = 3 seconds
      }}
    >
         <View style={[styles.rectangle, styles.upperNavShadowBox]} />
         <Text style={[styles.addCard, styles.addCardLayout]}>Confirm Address</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  upperNavShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',  // Semi-transparent background to simulate blur
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: Color.colorRoyalblue_300,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 1,
    fontSize: 14,
    color: Color.black,
    left: 5,
    width: '80%'
   

  },
  label: {
    marginTop: 0,
    top: -10,
    fontSize: FontSize.size_xs,
    color: Color.colorGray_300,
  },
  addCardLayout: {
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  fieldsLayout: {
   
    
    
  },
  textLayout: {
    height: 64,
    width: 348,
    position: "absolute",
    
  },
  addressFlexBox: {
    textAlign: "left",
    position: "absolute",
    
  },
  textPosition: {
    left: 1,
    height: 64,
    width: 348,
    position: "absolute",
  },
  arrowPosition: {

  },
  rectangle: {
    shadowColor: "rgba(211, 38, 38, 0.25)",
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorCornflowerblue,
    elevation: 8,
    shadowRadius: 8,
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "0%",
    height: "100%",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: "absolute",
    width: "100%",
  },
  addCard: {
    top: "29.17%",
   
    width: '100%',
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  buttonprimaryinactivebig: {
    top: '90%',
    left: "8%",
    width: "100%",
    height: 48,
    paddingHorizontal: 30,
    position: "absolute",
  },
  textChildShadowBox: {
    borderRadius: Border.br_3xs,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: "0%",
    bottom: "0%",
    right: "0%",
    top: "10%",
    height: "70%",
    position: "absolute",
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  fullName: {
    top: "34.38%",
    fontWeight: "500",
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.font,
    left: "5.83%",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  textFieldordinaryinactive: {
    left: 0,
    height: 64,
    width: 348,
    top: '0%',
    
  },
  newbridgeCourt: {
    top: "45.31%",
    letterSpacing: 0,
    lineHeight: 21,
    color: Color.black,
    fontFamily: FontFamily.font,
    left: "5.83%",
    textAlign: "left",
    fontSize: FontSize.font_size,
  },
  address: {
    top: "21.88%",
    fontSize: FontSize.font2_size,
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.font,
    left: "5.83%",
  },
  line: {
    height: "20.94%",
    width: "0.11%",
    top: "51.25%",
    right: "78.97%",
    bottom: "27.81%",
    left: "20.92%",
    borderColor: Color.colorBlack,
    borderRightWidth: 0.4,
    display: "none",
    borderStyle: "solid",
    position: "absolute",
  },
  textFieldordinaryfocused: {
    top: 84,
  },
  textFieldordinaryfocused1: {
    top: 250,
  },
  textFieldordinaryfocused2: {
    top: 40,
    left: 0,
  },
  baselineKeyboardArrowDown2Icon: {
    height: "3.31%",
    width: "4.63%",
    top: "92.56%",
    right: "3.2%",
    bottom: "4.13%",
    left: "92.17%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  textFieldordinaryfocused3: {
    top: 252,
    left: 2,
    height: 64,
    width: 348,
  },
  textFieldordinaryfocused4: {
    top: 165,
  },
  textFields: {
    left: '7.5%',
    
  },
  fields: {
    top: 40,
    left: "0%",
    
  },
  editAddress: {
    top: 22,
    left: "36%",
    fontSize: 20,
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
  },
  arrowCircleLeftUndefined: {
    top: '-15%',
    left: 17,
    width: 32,
    height: 32,
  },
  upperNav: {
   
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: "100%",
    height: 70,
    borderStyle: "solid",
    left: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    overflow: "hidden",
  },
  addressEdit: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default AddressEdit;
