import * as React from "react";
import { Image, StyleSheet, View, Text, Pressable } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

const Settings = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.settings}>
      <Image
        style={styles.baselineLocalShipping24pxIcon}
        resizeMode="cover"
        source={require("../assets/baselinelocal-shipping24px.png")}
      />
      <View style={styles.personalInfoWrapper}>
        <View style={styles.personalInfo}>
          <View style={[styles.textFieldordinaryinactive, styles.textLayout]}>
            <View style={styles.textChildShadowBox} />
            <Text style={[styles.fullName, styles.fullNameTypo]}>
              Full name
            </Text>
          </View>
          <View style={[styles.textFieldordinaryfocused, styles.textLayout]}>
            <View style={styles.textChildShadowBox} />
            <Text style={styles.text}>12/12/1989</Text>
            <Text style={[styles.dateOfBirth, styles.password3Position]}>
              Date of Birth
            </Text>
            <View style={[styles.line, styles.lineBorder]} />
          </View>
          <Text style={[styles.personalInformation, styles.changeFlexBox]}>
            Personal Information
          </Text>
        </View>
      </View>
      <View style={styles.buttonprimaryinactivebig}>
        <View style={[styles.rectangle, styles.upperNavShadowBox]} />
        <Text style={styles.savePassword}>SAVE PASSWORD</Text>
      </View>
      <View style={styles.passwordParent}>
        <View style={styles.password}>
          <View style={[styles.textFieldordinaryfocused1, styles.textLayout]}>
            <View style={styles.textChildShadowBox} />
            <Text style={styles.text}>****************</Text>
            <Text style={[styles.dateOfBirth, styles.password3Position]}>
              Password
            </Text>
            <View style={[styles.line, styles.lineBorder]} />
          </View>
          <Text style={[styles.password2, styles.changeFlexBox]}>Password</Text>
          <Text style={[styles.change, styles.changeTypo]}>Change</Text>
        </View>
        <View style={[styles.textFieldordinaryfocused2, styles.textLayout]}>
          <View style={styles.textChildShadowBox} />
          <Text style={styles.text}>****************</Text>
          <Text style={[styles.password3, styles.changeTypo]}>
            Confirm Password
          </Text>
          <View style={[styles.line, styles.lineBorder]} />
        </View>
      </View>
      <View style={[styles.upperNav, styles.lineBorder]}>
        <Text style={[styles.settings1, styles.settings1Position]}>
          Settings
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
    </View>
  );
};

const styles = StyleSheet.create({
  textLayout: {
    height: 64,
    left: 0,
    width: 350,
    position: "absolute",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  fullNameTypo: {
    textAlign: "left",
    fontFamily: FontFamily.font,
  },
  password3Position: {
    fontSize: FontSize.font2_size,
    color: Color.gray,
    left: "5.83%",
    position: "absolute",
  },
  lineBorder: {
    borderStyle: "solid",
    position: "absolute",
  },
  changeFlexBox: {
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  upperNavShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  changeTypo: {
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "left",
  },
  settings1Position: {
    top: 21,
    position: "absolute",
  },
  baselineLocalShipping24pxIcon: {
    top: 400,
    left: 256,
    width: 24,
    height: 24,
    overflow: "hidden",
    position: "absolute",
  },
  textChildShadowBox: {
    borderRadius: Border.br_9xs,
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
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
  fullName: {
    top: "34.38%",
    color: Color.gray,
    left: "5.83%",
    textAlign: "left",
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
    position: "absolute",
  },
  textFieldordinaryinactive: {
    top: 37,
  },
  text: {
    top: "45.31%",
    letterSpacing: 0,
    lineHeight: 21,
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.font,
    fontSize: FontSize.font_size,
    left: "5.83%",
    position: "absolute",
  },
  dateOfBirth: {
    top: "21.88%",
    textAlign: "left",
    fontFamily: FontFamily.font,
  },
  line: {
    height: "20.94%",
    width: "0.11%",
    top: "51.25%",
    right: "78.94%",
    bottom: "27.81%",
    left: "20.94%",
    borderColor: Color.colorBlack,
    borderRightWidth: 0.4,
    display: "none",
  },
  textFieldordinaryfocused: {
    top: 125,
  },
  personalInformation: {
    width: 166,
    fontWeight: "600",
    fontSize: FontSize.font1_size,
    display: "flex",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.font,
    left: 0,
    top: 0,
  },
  personalInfo: {
    left: 0,
    top: 0,
    height: 189,
    width: 350,
    position: "absolute",
  },
  personalInfoWrapper: {
    top: 176,
    left: 38,
    height: 189,
    width: 350,
    position: "absolute",
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
      height: 1,
    },
    position: "absolute",
    width: "100%",
  },
  savePassword: {
    top: "29.17%",
    left: "31.49%",
    color: Color.white,
    textAlign: "center",
    fontFamily: FontFamily.font,
    fontWeight: "500",
    lineHeight: 20,
    fontSize: FontSize.font_size,
    position: "absolute",
  },
  buttonprimaryinactivebig: {
    top: "90%",
    left: "10%",
    width: "80%",
    height: 48,
    position: "absolute",
  },
  textFieldordinaryfocused1: {
    top: 38,
  },
  password2: {
    top: 1,
    width: 78,
    fontWeight: "600",
    fontSize: FontSize.font1_size,
    display: "flex",
    color: Color.black,
    textAlign: "left",
    fontFamily: FontFamily.font,
    left: 0,
  },
  change: {
    left: "75%",
    color: Color.colorRoyalblue_100,
    width: "100%",
    alignItems: "center",
    display: "flex",
    position: "absolute",
    lineHeight: 20,
    fontSize: FontSize.font_size,
    fontFamily: FontFamily.publicSansRegular,
    top: 0,
  },
  password: {
    left: 1,
    height: 102,
    top: 0,
    width: 350,
    position: "absolute",
  },
  password3: {
    top: "20.31%",
    fontSize: FontSize.font2_size,
    color: Color.gray,
    left: "5.83%",
    position: "absolute",
  },
  textFieldordinaryfocused2: {
    top: 107,
  },
  passwordParent: {
    top: 441,
    left: 37,
    width: 351,
    height: 171,
    position: "absolute",
  },
  settings1: {
    left: 168,
    fontSize: FontSize.size_5xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "left",
  },
  arrowCircleLeftUndefined: {
    left: 17,
    width: 32,
    height: 32,
    overflow: "hidden",
    top: "30%"
  },
  upperNav: {
    
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: 430,
    height: 70,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderStyle: "solid",
    left: 0,
    overflow: "hidden",
  },
  settings: {
    
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Settings;
