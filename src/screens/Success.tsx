import * as React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";

const Success = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.success}>
      <Pressable style={styles.buttonprimaryinactivebig}
      onPress={() => navigation.navigate("OrdersList")}>
        <View style={[styles.rectangle, styles.upperNavShadowBox]} />
        <Text style={styles.addCard}>Check Order Status</Text>
      </Pressable>
      <Text style={[styles.success1, styles.success1FlexBox]}>Success!</Text>
      <Text style={styles.yourOrderWill}>{`Your order will be delivered soon\nThank you for choosing our app!`}</Text>
      <Image
        style={styles.bagsIcon}
        resizeMode="cover"
        source={require("../assets/bags.png")}
      />
      <View style={[styles.upperNav, styles.upperNavShadowBox]}>
        <Text style={[styles.confirmation, styles.confirmationPosition]}>
          Confirmation
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
  upperNavShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    position: "absolute",
  },
  success1FlexBox: {
    textAlign: "left",
    color: Color.colorBlack,
  },
  confirmationPosition: {
    top: 24,
    position: "absolute",
  },
  rectangle: {
    height: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowColor: "rgba(211, 38, 38, 0.25)",
    shadowRadius: 8,
    elevation: 8,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorCornflowerblue,
    width: "100%",
  },
  addCard: {
    top: "29.17%",
    left: "28.49%",
    lineHeight: 20,
    color: Color.white,
    textAlign: "center",
    fontSize: FontSize.font_size,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  buttonprimaryinactivebig: {
    top: "90%",
    left: 48,
    width: "75%",
    height: 48,
    position: "absolute",
  },
  success1: {
    top: 420,
    left: "32%",
    fontSize: FontSize.headline_size,
    fontWeight: "700",
    fontFamily: FontFamily.font,
    textAlign: "left",
    position: "absolute",
  },
  yourOrderWill: {
    top: 561,
    left: "23%",
    lineHeight: 21,
    color: Color.colorBlack,
    fontFamily: FontFamily.font,
    textAlign: "center",
    fontSize: FontSize.font_size,
    position: "absolute",
  },
  bagsIcon: {
    top: "20%",
    left: "20%",
    width: 208,
    height: 213,
    overflow: "hidden",
    position: "absolute",
  },
  confirmation: {
    left: "36%",
    fontSize: 20,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    
  },
  arrowCircleLeftUndefined: {
    left: 17,
    width: 32,
    height: 32,
    overflow: "hidden",
    top: 20,
  },
  upperNav: {
    
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderStyle: "solid",
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: "100%",
    height: 70,
    overflow: "hidden",
  },
  success: {
    backgroundColor: Color.white,
    flex: 1,
    height: "100%",
    width: "100%",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },  
});

export default Success;
