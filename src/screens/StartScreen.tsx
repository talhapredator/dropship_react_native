import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Pressable, Text, Image, Animated } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, Color, Border, FontFamily } from "../GlobalStyles";

const StartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity set to 1
  
  const handlePress = () => {
    // Start fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade to 0 opacity
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate("StyleMainPage"); // Navigate after fade-out completes
    });
  };
  
  return (
    <View style={styles.startScreen}>
      <Pressable
        style={styles.startScreenChild}
        onPress={() => navigation.navigate("StyleMainPage")}
      >
      <Text style={styles.signUp}>Continue</Text>
      </Pressable>
      <Text style={[styles.alreadyHaveAn, styles.logIn1Typo]}>
        Already have an account ?
      </Text>
      <Pressable
        style={[styles.logIn, styles.logInPosition]}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={[styles.logIn1, styles.logIn1Typo]}>Log In</Text>
      </Pressable>
      <View style={[styles.brandLogo, styles.brandLayout]}>
        <View style={[styles.brandLogoChild]} />
        <View style={styles.brandLogoItem} />
        <Text style={[styles.original, styles.originalFlexBox]}>TECHNO</Text>
        <Text style={[styles.dropship, styles.originalFlexBox]}>BUYER</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logIn1Typo: {
    fontSize: FontSize.font_size,
    color: Color.white,
  },
  brandLogoChild: {
    
    
    
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
  logInPosition: {
    top: "94%",
    
  },
  brandLayout: {
    height: "28%",
    position: "absolute",
  },
  originalFlexBox: {
    textAlign: "center",
    color: Color.white,
    position: "absolute",
  },
  startScreenChild: {
    top: "85%",
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
    width: "50%",
    height: "7.5%",
    left: "25%",
    position: "absolute",
  },
  signUp: {
    top: "25%",
    left: "27.5%",
    fontSize: FontSize.size_xl,
   
    color: Color.white,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
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
  alreadyHaveAn: {
    fontFamily: FontFamily.publicSansRegular,
    width: "50%",
    height: 24,
    top: "94%",
    position: "absolute",
    left: "20%",
  },
  logIn1: {
    fontFamily: FontFamily.publicSansBold,
    fontSize: FontSize.font_size,
    fontWeight: "700",
  },
  logIn: {
    left: "66%",
  },
  brandLogo: {
    top: "10%",
    left: "6%",
    width: "90%",
    
  },
  startScreen: {
    
    backgroundColor: Color.colorCornflowerblue,
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default StartScreen;
