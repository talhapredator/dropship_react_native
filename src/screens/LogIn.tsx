import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Alert, Image, Pressable, TextInput, Animated, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, Border, FontFamily } from "../GlobalStyles";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';

const LogIn = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1



  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: emailOrPhone,
        password: password,
      });

      if (response.data) {
        Animated.timing(fadeAnim, {
          toValue: 0, // Fade to 0 opacity
          duration: 500, // Animation duration in milliseconds
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate("StyleMainPage"); // Navigate after fade-out completes
        });
      } else {
        Alert.alert('Login failed', 'Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login error', 'Something went wrong. Please try again.');
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
    <View style={styles.logIn}>
      
      <View style={styles.signloginBox} >
      <KeyboardAvoidingView
      style ={styles.view2}
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      
      <Pressable
        style={[styles.rectangleContainer, styles.rectangleLayout]}
        onPress={handleLogin}
        //onPress={() => navigation.navigate("StyleMainPage")}
      >
        <View style={[styles.rectangleView, styles.rectangleLayout]} />
        <Text style={styles.logIn1}>Log In</Text>
        
      </Pressable>
      <Text style={[styles.dontHaveAn, styles.signUp1Typo]}>
        Don’t have an account ?
      </Text>
      <Pressable
        style={[styles.signUp, styles.signUpPosition]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={[styles.signUp1, styles.signUp1Typo]}>Sign Up</Text>
      </Pressable>
      </KeyboardAvoidingView>
      </View>
      
      <View style={[styles.rectangleParent, styles.rectangleLayout1]}>
        <View style={styles.frameChild} />
        <Text style={styles.emailOrPhone}>Email or Phone Number</Text>
        <TextInput
          style={styles.frameChild}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />
        
      </View>
      <View style={[styles.rectangleGroup, styles.rectangleLayout1]}>
      <TextInput
        style={styles.frameChild}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}  // Toggle between text and password view
        placeholder="Enter your password"
      />
        <Text style={styles.emailOrPhone}>Password</Text>
        <Image
          style={styles.eyeUndefined}
          resizeMode="cover"
          source={require("../assets/eye--undefined.png")}
        />
        
      </View>
      
      
      <View style={[styles.brandLogo, styles.brandLayout]}>
        <View style={[styles.brandLogoChild, styles.brandLayout]} />
        <View style={styles.brandLogoItem} />
        <Text style={[styles.original, styles.originalFlexBox]}>TECHNO</Text>
        <Text style={[styles.dropship, styles.originalFlexBox]}>BUYER</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangleLayout1: {
    height: 70,
    left: "7%",
    width: "90%",
    position: "absolute",
  },
  view: {
    

  },
  view2: {
   top: "35%"

  },
  iconContainer: {
    padding: 10,
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
    
    
    
  },
  signUp1Typo: {
    color: Color.colorDimgray,
    fontSize: FontSize.font_size,
    textAlign: "left",
    
  },
  signUpPosition: {
    top: 125,
    left:"61%",
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
    top: "52%",
    backgroundColor: Color.white,
    width: "100%",
    height: 526,
    left: 0,
    position: "absolute",
    borderRadius: Border.br_16xl,
  },
  frameChild: {
    top: 25,
    backgroundColor: Color.colorWhitesmoke_100,
    height: 45,
    width: "95%",
    left: 0,
    paddingHorizontal: 10,
    position: "absolute",
    color: Color.black,
    fontFamily: FontFamily.publicSansBold
  },
  emailOrPhone: {
    fontSize: FontSize.size_mid,
    color: Color.colorGray_500,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    top: 0,
    left: 0,
    position: "absolute",
  },
  examplegmailcom: {
    left: 3,
    fontSize: FontSize.size_mid,
    color: Color.colorGray_600,
    top: 35,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  rectangleParent: {
    top: "58%",
  },
  frameInner: {
    left: 6,
  },
  ellipseIcon: {
    left: 26,
  },
  frameChild1: {
    left: 46,
  },
  frameChild2: {
    left: 66,
  },
  frameChild3: {
    left: 86,
  },
  eyeUndefined: {
    top: 36,
    left: "85%",
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleGroup: {
    top: "74%",
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
    backgroundColor: Color.colorRoyalblue_300,
    top: 0,
    left: 0,
  },
  logIn1: {
    top: 10,
    left: "30%",
    fontSize: FontSize.size_xl,
    color: Color.white,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    textAlign: "left",
    position: "absolute",
  },
  rectangleContainer: {
    top: 70,
    left: "29%",
  },
  dontHaveAn: {
    left: "20%",
    width: "100%",
    top: 125,
    position: "absolute",
    height: 24,
    fontSize: FontSize.font_size,
    fontFamily: FontFamily.publicSansRegular,
  },
  signUp1: {
    fontFamily: FontFamily.publicSansBold,
    fontSize: FontSize.font_size,
    fontWeight: "700",
  },
  signUp: {
    left: "0%",
    
  },
  brandLogoChild: {
    left: 10,
   
    backgroundColor: Color.colorGainsboro_100,
    width: 2,
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
    top: "10%",
    left: "0%",
    width: "100%",
    
  },
  logIn: {
    backgroundColor: Color.colorCornflowerblue,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
   
  },
});

export default LogIn;
