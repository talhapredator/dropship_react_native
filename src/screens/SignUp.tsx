import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Image,Alert, Pressable, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from 'axios';
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.18.5:8080/api/auth/signup', { 
        email: emailOrPhone, 
        password,
      });

      if (response.data) {
        Alert.alert('Signup successful', 'You can now log in with your new account');
        navigation.navigate("LogIn");
      } else {
        Alert.alert('Signup failed', 'Unable to create account');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Signup error', 'Something went wrong. Please try again.');
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // Hide the button when the keyboard is shown
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Show the button when the keyboard is hidden
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.signUp}>
      <View style={styles.signloginBox} />
      
      <View style={[styles.fullNameParent, styles.parentLayout]}>
        <Text style={styles.fullName}>Full Name</Text>
        <View style={styles.frameChild} />
        <TextInput
          style={styles.johnDoeTypo}
          placeholder=""
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      
      <View style={[styles.rectangleParent, styles.parentLayout]}>
        <View style={styles.frameChild} />
        <Text style={styles.fullName}>Email or Phone Number</Text>
        <TextInput
          style={styles.johnDoeTypo}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
      </View>
      
      <View style={[styles.rectangleGroup, styles.parentLayout]}>
        <View style={styles.frameChild} />
        <Text style={styles.fullName}>Password</Text>
        <TextInput
          style={styles.johnDoeTypo}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      
      <View style={[styles.brandLogo, styles.brandLayout]}>
        <View style={[styles.brandLogoChild, styles.brandLayout]} />
        <View style={styles.brandLogoItem} />
        <Text style={[styles.original, styles.originalFlexBox]}>TECHNO</Text>
        <Text style={[styles.dropship, styles.originalFlexBox]}>BUYER</Text>
      </View>

      {!isKeyboardVisible && ( // Conditionally render the button based on keyboard visibility
        <View style={styles.view}>       
          <Pressable
            style={[styles.rectangleContainer, styles.rectangleLayout]}
            onPress={handleSignUp}
          >
            <View style={[styles.rectangleView, styles.rectangleLayout]} />
            <Text style={styles.signUp1}>Sign Up</Text>
          </Pressable>

          <View style={styles.textContainer}>
           <Text style={styles.text1}>Already have an account? </Text>
           <Pressable onPress={() => navigation.navigate("LogIn")}>
           <Text style={styles.text2}>Log In</Text>
           </Pressable>
          </View>
        </View>
        
        
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  parentLayout: {
    height: "100%",
    left: "10%",
    width: "100%",
    position: "absolute",
  },
  inputField: {
    
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 1,
    top: "20%", 
    justifyContent: "center",
    alignItems: "center",
  },
  
  text1: {
    fontSize: FontSize.font_size,
    color: Color.black,
    fontFamily: FontFamily.publicSansRegular,
  },
  
  text2: {
    fontSize: FontSize.font_size,
    color: Color.colorSteelblue,
    fontFamily: FontFamily.dMSansBold,
    textDecorationLine: "underline",
  },
  johnDoeTypo: {
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    left: 0,
    textAlign: "left",
    paddingVertical: 30,
    width:"100%" ,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
    
  },
  frameChildLayout: {
    height: 12,
    width: 11,
    top: 43,
    position: "absolute",
  },
  rectangleLayout: {
    height: 51,
    width: 156,
    position: "absolute",
    
   
  },
  logIn1Typo: {
    color: Color.colorDimgray,
    fontSize: FontSize.font_size,
    textAlign: "center",
  },
  logInPosition: {
   
    position: "absolute",
  },
  brandLayout: {
    height: 200,
   position: "absolute",
  },
  originalFlexBox: {
    textAlign: "center",
    color: Color.white,
    position: "absolute",
  },
  signloginBox: {
    top: "40%",
    backgroundColor: Color.white,
    width: "100%",
    height: "100%",
    
    position: "absolute",
    borderRadius: Border.br_16xl,
  },
  fullName: {
    fontSize: FontSize.size_mid,
    color: Color.colorGray_400,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
   
    position: "absolute",
  },
  name1:{
    fontSize: FontSize.size_mid,
    color: Color.colorGray_400,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
   
    position: "absolute",
  },
  frameChild: {
    top: 22,
    backgroundColor: Color.colorWhitesmoke_100,
    height: 45,
    width: "80%",
    left: 0,
    position: "absolute",
  },
  johnDoe: {
    top: 37,
  },
  fullNameParent: {
    top: "47%",
  },
  examplegmailcom: {
    top: 38,
    color: Color.colorBlack,
    fontSize: FontSize.size_xs,
    left: 3,
    textAlign: "left",
    paddingVertical: 30,
    width:"100%" ,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  rectangleParent: {
    top: "62%",
  },
  ellipseIcon: {
    left: 10,
  },
  frameChild1: {
    left: 30,
  },
  frameChild2: {
    left: 50,
  },
  frameChild3: {
    left: 70,
  },
  frameChild4: {
    left: 90,
  },
  eyeUndefined: {
    left: "70%",
    width: 24,
    height: 24,
    top: 35,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleGroup: {
    top: "78%",
  },
  rectangleView: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorSteelblue,
    top: "0%",
    left: 0,
  },
  signUp1: {
    top: "20%",
    left: "30%",
    fontSize: FontSize.size_mid,
    color: Color.white,
    fontFamily: FontFamily.dMSansBold,
    fontWeight: "500",
    
    position: "absolute",
  },
  rectangleContainer: {
    
    left: "30%",
    top: "90%"
    
  },
  alreadyHaveAn: {
    left: "0%",
    width: "100%",
   
    position: "absolute",
    fontSize: FontSize.font_size,
    fontFamily: FontFamily.publicSansRegular,
  },
  logIn1: {
    fontFamily: FontFamily.publicSansBold,
    fontSize: FontSize.font_size,
    fontWeight: "900",
    top: "60%",
    left: "0%",
    textAlign: "center"
    
  },
  logIn: {
    width: "10%",
  },
  view:{
    top: "86%",
  },
  
  brandLogoChild: {
    left: 0,
    borderRadius: Border.br_xl,
    backgroundColor: Color.colorGainsboro_100,
    width: 262,
    top: 0,
  },
  brandLogoItem: {
    top: "13%",
    left: "18%",
    backgroundColor: Color.colorRoyalblue_200,
    width: "65%",
    height: "34%",
    alignItems: "center",
    position: "absolute",
  },
  original: {
    fontSize: FontSize.size_17xl,
    fontFamily: FontFamily.dMSansBold,
    letterSpacing: 7,
    fontWeight: "200",
    width: "100%",
    height: "100%",
    top: "18%",
  },
  dropship: {
    top: "45%",
    fontSize: FontSize.size_17xl,
    fontFamily: FontFamily.righteousRegular,
    letterSpacing: 7,
    height: "100%",
    width: "100%",
    left: 0,
  },
  brandLogo: {
    top: 70,
    left: "1%",
    width: "100%",
  },
  signUp: {
    backgroundColor: Color.colorCornflowerblue,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex:1
  },
});

export default SignUp;
