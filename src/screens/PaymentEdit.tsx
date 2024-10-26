import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";

const PaymentEdit = () => {
  return (
    <View style={styles.paymentEdit}>
      <View style={[styles.textFieldordinaryfocused, styles.textLayout]}>
        <View style={styles.textChildShadowBox} />
        <Text style={[styles.text, styles.textTypo]}>5546 8205 3693 3947</Text>
        <Text style={[styles.cardNumber, styles.cvvTypo1]}>Card number</Text>
        <View style={styles.line} />
      </View>
      <View style={[styles.textFieldordinaryfocused1, styles.textLayout]}>
        <View style={styles.textChildShadowBox} />
        <Text style={[styles.text, styles.textTypo]}>05/23</Text>
        <Text style={[styles.cardNumber, styles.cvvTypo1]}>Expire Date</Text>
        <View style={styles.line} />
      </View>
      <View style={[styles.textFieldordinaryfocused2, styles.textLayout]}>
        <View style={styles.textChildShadowBox} />
        <Text style={[styles.text2, styles.cardTypo]}>567</Text>
        <Text style={[styles.cvv, styles.cardTypo]}>CVV</Text>
        <View style={styles.line} />
      </View>
      <View style={[styles.textFieldordinaryinactive, styles.textLayout]}>
        <View style={styles.textChildShadowBox} />
        <Text style={[styles.nameOnCard, styles.cardTypo]}>Name on card</Text>
      </View>
      
      <View style={styles.buttonprimaryinactivebig}>
        <View style={[styles.rectangle, styles.upperNavShadowBox]} />
        <Text style={[styles.addCard, styles.cardTypo]}>ADD CARD</Text>
      </View>
      <Image
        style={[styles.mastercardIcon, styles.upperNavPosition]}
        resizeMode="cover"
        source={require("../assets/mastercard.png")}
      />
      <View style={[styles.upperNav, styles.upperNavPosition]}>
        <Text style={[styles.editPayment, styles.cardTypo]}>Edit Payment</Text>
        <Image
          style={[styles.arrowCircleLeftUndefined, styles.upperNavPosition]}
          resizeMode="cover"
          source={require("../assets/arrow-circle-left--undefined.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textLayout: {
    height: 64,
    width: "100%",
    left: "2%",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.font,
    textAlign: "left",
    position: "absolute",
  },
  cvvTypo1: {
    fontSize: FontSize.font2_size,
    color: Color.gray,
  },
  cardTypo: {
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  upperNavShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  upperNavPosition: {
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
  text: {
    fontWeight: "500",
    textAlign: "left",
    color: Color.black,
    lineHeight: 20,
    fontSize: FontSize.font_size,
    left: "6.33%",
    fontFamily: FontFamily.font,
    top: "45.31%",
  },
  cardNumber: {
    top: "21.88%",
    color: Color.gray,
    textAlign: "left",
    fontFamily: FontFamily.font,
    position: "absolute",
    left: "6.33%",
  },
  line: {
    height: "20.94%",
    width: "0.11%",
    top: "51.25%",
    right: "78.94%",
    bottom: "27.81%",
    left: "20.95%",
    borderColor: Color.colorBlack,
    borderRightWidth: 0.4,
    display: "none",
    borderStyle: "solid",
    position: "absolute",
  },
  textFieldordinaryfocused: {
    top: 289,
  },
  textFieldordinaryfocused1: {
    top: 373,
  },
  text2: {
    left: "5.82%",
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "left",
    color: Color.black,
    lineHeight: 20,
    fontSize: FontSize.font_size,
    top: "45.31%",
  },
  cvv: {
    top: "20.31%",
    left: "5.82%",
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "left",
    color: Color.gray,
    fontSize: FontSize.font2_size,
  },
  textFieldordinaryfocused2: {
    top: 457,
  },
  nameOnCard: {
    top: "34.38%",
    left: "5.82%",
    fontFamily: FontFamily.publicSansRegular,
    textAlign: "left",
    color: Color.gray,
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  textFieldordinaryinactive: {
    top: 205,
  },
  headline: {
    top: 165,
    left: "40%",
    fontSize: FontSize.headline3_size,
    lineHeight: 22,
    fontWeight: "600",
    width: 125,
    textAlign: "left",
    color: Color.black,
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
  addCard: {
    top: "29.17%",
    left: "39.07%",
    color: Color.white,
    textAlign: "center",
    lineHeight: 20,
    fontSize: FontSize.font_size,
  },
  buttonprimaryinactivebig: {
    top: "90%",
    left: "10%",
    width: "80%",
    height: 48,
    position: "absolute",
  },
  mastercardIcon: {
    top: 314,
    left: "80%",
    width: 35,
    height: 25,
  },
  editPayment: {
    top: 22,
    left: "30%",
    fontSize: FontSize.size_5xl,
    color: Color.colorBlack,
    textAlign: "left",
  },
  arrowCircleLeftUndefined: {
    top: 21,
    left: 17,
    width: 32,
    height: 32,
  },
  upperNav: {
    
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: 430,
    height: 70,
    borderStyle: "solid",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    overflow: "hidden",
  },
  paymentEdit: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default PaymentEdit;
