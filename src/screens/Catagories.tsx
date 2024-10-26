import * as React from "react";
import { Text, StyleSheet, Image, Pressable, View, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize, Padding } from "../GlobalStyles";


const Catagories = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.catagories1}>
      <View style={styles.catagoriesParent}>
        <Text style={[styles.catagories, styles.catagoriesTypo]}>
          Catagories
        </Text>
        <Pressable
          style={[styles.searchBox, styles.searchBoxLayout]}
          onPress={() => navigation.navigate("Catagories4Search")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/search-box1.png")}
          />
        </Pressable>

        <Pressable
          style={[styles.arrowCircleLeftUndefined, styles.searchBoxLayout]}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.contain}>
      <Pressable
        style={[styles.processorsSection, styles.sectionLayout]}
        onPress={() => navigation.navigate("Catagories2List")}
      >
        <View
          style={[styles.processorsSectionChild, styles.sectionChildBorder]}
        />
        <Text style={[styles.processors, styles.catagoriesTypo]}>
          Processors
        </Text>
        <Image
          style={[styles.processorsSectionItem, styles.navbarPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle-21.png")}
        />
      </Pressable>
      <View style={[styles.motherboardSection, styles.sectionLayout]}>
        <View
          style={[styles.motherboardSectionChild, styles.sectionChildBorder]}
        />
        <Text style={[styles.processors, styles.catagoriesTypo]}>
          Motherboards
        </Text>
        <Image
          style={[styles.processorsSectionItem, styles.navbarPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle-23.png")}
        />
      </View>
      <Pressable
        style={[styles.processorsSection1, styles.sectionLayout]}
        onPress={() => navigation.navigate("ProductList", {
          categoryId: '6',})}>
      
        <View
          style={[styles.processorsSectionChild, styles.sectionChildBorder]}
        />
        <Text style={[styles.processors, styles.catagoriesTypo]}>
          Graphic Cards
        </Text>
        <Image
          style={[styles.processorsSectionItem, styles.navbarPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle-9.png")}
        />
      </Pressable>
      <View style={[styles.ramSection, styles.sectionLayout]}>
        <View style={[styles.ramSectionChild, styles.sectionChildBorder]} />
        <Text style={[styles.processors, styles.catagoriesTypo]}>Ram</Text>
        <Image
          style={[styles.processorsSectionItem, styles.navbarPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle-25.png")}
        />
      </View>
      <View style={[styles.ssdSection, styles.sectionLayout]}>
        <View style={[styles.ssdSectionChild, styles.sectionChildBorder]} />
        <Text style={[styles.processors, styles.catagoriesTypo]}>SSD</Text>
        <Image
          style={[styles.processorsSectionItem, styles.navbarPosition]}
          resizeMode="cover"
          source={require("../assets/rectangle-27.png")}
        />
      </View>
      </ScrollView>
      <View style={[styles.navbar, styles.navbarPosition]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  catagoriesTypo: {
    
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
   
  },
  contain: {
    width: "100%",
    height: 1100,
    top: -60,
    
  },
  searchBoxLayout: {
    height: 32,
    width: 32,
    top: 21,
    position: "absolute",
    
  },
  iconLayout: {
    height: "100%",
    width: "100%",
    left: "10%"
    
  },
  sectionLayout: {
    height: 120,
    width: "100%",
    left: 10,
    position: "absolute",
  },
  sectionChildBorder: {
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    backgroundColor: Color.white,
  },
  navbarPosition: {
    borderTopRightRadius: Border.br_3xs,
    position: "absolute",
  },
  catagories: {
    left: "40%",
    fontSize: 20,
    top: 23,
   
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
  },
  icon: {
    overflow: "hidden",
  },
  searchBox: {
    left: "88%",
  },
  arrowCircleLeftUndefined: {
    left: 17,
  },
  catagoriesParent: {
    backgroundColor:  Color.white,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    width: '100%',
    height: 70,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    position: "absolute",
    overflow: "hidden",
    zIndex: 1
  },
  processorsSectionChild: {
    borderColor: Color.colorGray_400,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    top: 0,
    height: 120,
    width: "95%",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  processors: {
    top: "35%",
    left: 26,
    fontSize: 16,
    display: "flex",
    width: 156,
    height: 60,
    alignItems: "center",
  },
  processorsSectionItem: {
    left: "45%",
    borderBottomRightRadius: Border.br_3xs,
    width: "50%",
    top: 0,
    borderTopRightRadius: Border.br_3xs,
    height: 120,
  },
  processorsSection: {
    top: 188,
    backgroundColor: Color.white
    
  },
  processorsSection1: {
    top: 500,
    backgroundColor: Color.white
    
  },
  motherboardSectionChild: {
    borderColor: Color.colorGray_400,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    top: 0,
    height: 120,
    width: 340,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  motherboardSection: {
    top: 350,
  },
  ramSectionChild: {
    borderColor: Color.colorGray_400,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    top: 0,
    height: 120,
    width: 340,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  ramSection: {
    top: 650,
  },
  ssdSectionChild: {
    borderColor: Color.colorGray_400,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    top: 0,
    height: 120,
    width: 340,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
  },
  ssdSection: {
    top: 800,
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
    top: "90%",
    borderTopLeftRadius: Border.br_3xs,
    borderColor: Color.colorGray_600,
    height: 85,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    left: 0,
    backgroundColor: Color.white,
    width: "100%",
  },
  catagories1: {
   
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Catagories;
