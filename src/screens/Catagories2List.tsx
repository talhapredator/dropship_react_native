import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { FontSize, Color, FontFamily, Border, Padding } from "../GlobalStyles";
import ProductList from "./ProductList";

const Catagories2List = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.catagories2list}>
      <View style={styles.catagoriesParent}>
        <Text style={styles.catagories}>Catagories</Text>
        <Pressable
          style={[styles.frame, styles.frameLayout]}
          onPress={() => navigation.navigate("Catagories4Search")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/search-box1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.arrowCircleLeftUndefined, styles.frameLayout]}
          onPress={() => navigation.navigate("Catagories")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
      <View style={styles.navbar}>
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("StyleMainPage")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector4.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector1}
          onPress={() => navigation.navigate("Catagories")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector5.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector2}
          onPress={() => navigation.navigate("Cart")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector2.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector3}
          onPress={() => navigation.navigate("MyAccount")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector3.png")}
          />
        </Pressable>
      </View>
      <Text style={styles.choseCategory}>Chose Category</Text>

      <Pressable style={[styles.amdProcessors, styles.processorsPosition]}
        onPress={() => navigation.navigate("ProductList", {
          categoryId: '1',})}>
        <Text style={[styles.processorsTypo]}>AMD Processors</Text>
      </Pressable>
      
      <Text style={[styles.intelProcessors, styles.processorsTypo]}>
        Intel Processors
      </Text>
      <Pressable
        style={[styles.cpuCoolers, styles.processorsPosition]}
        onPress={() => navigation.navigate("ProductList", {
          categoryId: '2',})}
      >
        <Text style={styles.processorsTypo}>CPU Coolers</Text>
      </Pressable>
      <Text style={[styles.thermalPaste, styles.processorsTypo]}>
        Thermal Paste
      </Text>
      <Text style={[styles.waterCooling, styles.processorsTypo]}>
        Water Cooling
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    height: 32,
    width: 32,
    top: 21,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  processorsTypo: {
    height: 38,
    width: 417,
    fontSize: FontSize.size_xl,
    display: "flex",
    alignItems: "center",
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
  },
  processorsPosition: {
    left: 13,
    position: "absolute",
  },
  catagories: {
    left: "30%",
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    top: 21,
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  frame: {
    left: 380,
  },
  arrowCircleLeftUndefined: {
    left: 17,
  },
  catagoriesParent: {
    
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: 430,
    height: 70,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    overflow: "hidden",
  },
  vector: {
    width: 26,
    height: 25,
  },
  vector1: {
    width: 24,
    height: 24,
    marginLeft: 80,
  },
  vector2: {
    width: 27,
    marginLeft: 80,
    height: 25,
  },
  vector3: {
    width: 23,
    height: 27,
    marginLeft: 80,
  },
  navbar: {
    top: 843,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    borderBottomRightRadius: Border.br_16xl,
    borderBottomLeftRadius: Border.br_16xl,
    borderColor: Color.colorGray_600,
    borderWidth: 1,
    height: 90,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    alignItems: "center",
    borderStyle: "solid",
    left: 0,
    position: "absolute",
    backgroundColor: Color.white,
  },
  choseCategory: {
    top: 118,
    fontSize: FontSize.font_size,
    color: Color.colorDimgray,
    width: 215,
    height: 29,
    display: "flex",
    left: 13,
    alignItems: "center",
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  amdProcessors: {
    top: 174,
    left: 13,
    position: "absolute",
  },
  intelProcessors: {
    top: 228,
    left: 13,
    position: "absolute",
  },
  cpuCoolers: {
    top: 282,
  },
  thermalPaste: {
    top: 336,
    left: 13,
    position: "absolute",
  },
  waterCooling: {
    top: 390,
    left: 13,
    position: "absolute",
  },
  catagories2list: {
    
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Catagories2List;
