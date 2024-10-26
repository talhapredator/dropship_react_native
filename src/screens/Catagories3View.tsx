import * as React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, ParamListBase } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import axios from "axios";
import { getProductsByCategory } from "../services/ProductService";

const Catagories3View = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute();
  // const { categoryId, categoryName } = route.params;

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const data = await getProductsByCategory(categoryId);
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, [categoryId]);
  return (
    <View style={styles.catagories3view}>
      <ScrollView contentContainerStyle={[styles.scrollview, styles.scrollviewPosition]}>
        <Pressable
          style={[styles.item1, styles.itemLayout2]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-32.png")}
          />
          <View style={[styles.details, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-5.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(257)</Text>
            </View>
            <Text style={styles.am5Aio}>AM5 - AIO</Text>
            <Text style={styles.nzxtProCooler}>NZXT PRO Cooler</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.item3, styles.itemLayout2]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-321.png")}
          />
          <View style={[styles.details1, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-5.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(257)</Text>
            </View>
            <Text style={styles.am5Aio}>AM5 - AIO</Text>
            <Text style={styles.nzxtProCooler}>NZXT Kraken Cooler</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.item4, styles.itemLayout1]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-322.png")}
          />
          <View style={[styles.details2, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-5.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(257)</Text>
            </View>
            <Text style={styles.am5Aio}>AM5 - AIO</Text>
            <Text style={styles.nzxtProCooler}>DeepCool AIR Cooler</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.item5, styles.itemLayout]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-323.png")}
          />
          <View style={[styles.details, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-5.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(257)</Text>
            </View>
            <Text style={styles.am5Aio}>AM5 - AIO</Text>
            <Text style={styles.nzxtProCooler}>NZXT PRO Cooler</Text>
          </View>
        </Pressable>
        <View style={[styles.item6, styles.itemLayout]}>
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-324.png")}
          />
          <View style={[styles.details, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-5.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(257)</Text>
            </View>
            <Text style={styles.am5Aio}>AM5 - AIO</Text>
            <Text style={styles.nzxtProCooler}>NZXT PRO Cooler</Text>
          </View>
        </View>
        <Pressable
          style={[styles.item2, styles.itemLayout1]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.item1Child, styles.navbarPosition]}
            resizeMode="cover"
            source={require("../assets/rectangle-33.png")}
          />
          <View style={[styles.details5, styles.detailsPosition]}>
            <View style={styles.rating5}>
              <Image
                style={[styles.rating5Child, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Item, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Inner, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.starIcon, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Image
                style={[styles.rating5Child1, styles.rating5ChildLayout]}
                resizeMode="cover"
                source={require("../assets/star-1.png")}
              />
              <Text style={[styles.text, styles.textFlexBox]}>(24)</Text>
            </View>
            <Text style={styles.am5Aio}>AM4 - AIO</Text>
            <Text style={styles.nzxtProCooler}>DeepCool AIO 240mm</Text>
          </View>
        </Pressable>
      </ScrollView>
       <View style={[styles.horizontalScroll, styles.scrollviewPosition]}>
        <View style={[styles.horizontalScrollChild, styles.horizontalLayout]} />
        <View style={[styles.horizontalScrollItem, styles.horizontalLayout]} />
        <View style={[styles.horizontalScrollInner, styles.horizontalLayout]} />
        <View style={[styles.rectangleView, styles.horizontalLayout]} />
        <Text style={[styles.aio, styles.aioTypo]}> AIO</Text>
        <Text style={[styles.lga1700, styles.aioTypo]}>LGA1700</Text>
        <Text style={[styles.am4, styles.aioTypo]}>AM4</Text>
        <Text style={[styles.corsiar, styles.aioTypo]}>Corsiar</Text>
      </View>
      <View style={styles.cpuCoolersParent}>
        <Text style={styles.cpuCoolers}>CPU Coolers</Text>
        <Pressable
          style={[styles.search, styles.searchLayout]}
          onPress={() => navigation.navigate("Catagories4Search")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/search-box1.png")}
          />
        </Pressable>
        <Pressable
          style={[styles.arrowCircleLeftUndefined, styles.searchLayout]}
          onPress={() => navigation.navigate("Catagories2List")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.navbar, styles.textFlexBox]}>
        <Pressable
          style={styles.vector}
          onPress={() => navigation.navigate("StyleMainPage")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector7.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector1}
          onPress={() => navigation.navigate("Catagories")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector8.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector2}
          onPress={() => navigation.navigate("Cart")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector9.png")}
          />
        </Pressable>
        <Pressable
          style={styles.vector3}
          onPress={() => navigation.navigate("MyAccount")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require("../assets/vector10.png")}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollviewPosition: {
    position: "absolute",
    overflow: "hidden",
    left: 0,
    backgroundColor: Color.white
  },
  itemLayout2: {
    height: 260,
    width: 186,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    left: 20,
    position: "absolute",
    backgroundColor: Color.white
  },
  navbarPosition: {
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 0,
  },
  detailsPosition: {
    height: 58,
    top: 187,
    position: "absolute",
  },
  rating5ChildLayout: {
    width: 13,
    height: 15,
    top: 0,
    position: "absolute",
  },
  textFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
  itemLayout1: {
    left: 223,
    height: 260,
    width: 186,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  itemLayout: {
    top: 589,
    height: 260,
    width: 186,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    borderRadius: Border.br_3xs,
    position: "absolute",
  },
  searchLayout: {
    height: 32,
    width: 32,
    top: 21,
    position: "absolute",
  },
  iconLayout: {
    height: "100%",
    width: "100%",
  },
  horizontalLayout: {
    height: 35,
    width: 110,
    backgroundColor: Color.colorRoyalblue_200,
    borderRadius: Border.br_11xl,
    top: 13,
    position: "absolute",
  },
  aioTypo: {
    color: Color.white,
    fontFamily: FontFamily.publicSansSemiBold,
    fontWeight: "600",
    top: 20,
    fontSize: FontSize.font2_size,
    textAlign: "left",
    position: "absolute",
  },
  item1Child: {
    height: 180,
    top: 0,
    borderTopLeftRadius: Border.br_3xs,
    width: 180,
    position: "absolute",
    backgroundColor: Color.white
  },
  rating5Child: {
    left: 0,
  },
  rating5Item: {
    left: 16,
  },
  rating5Inner: {
    left: 32,
  },
  starIcon: {
    left: 48,
  },
  rating5Child1: {
    left: 64,
  },
  text: {
    left: 83,
    color: Color.colorDimgray,
    display: "flex",
    width: 30,
    textAlign: "left",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    fontSize: FontSize.font1_size,
    alignItems: "center",
    height: 12,
    top: 0,
  },
  rating5: {
    width: 113,
    height: 12,
    top: 0,
    left: 0,
    position: "absolute",
  },
  am5Aio: {
    top: 19,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    fontSize: FontSize.font1_size,
    left: 0,
    position: "absolute",
  },
  nzxtProCooler: {
    top: 39,
    fontSize: FontSize.font2_size,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    left: 0,
    position: "absolute",
  },
  details: {
    width: 136,
    left: 9,
    height: 58,
    top: 187,
  },
  item1: {
    top: 31,
    overflow: "hidden",
  },
  details1: {
    width: 157,
    left: 9,
    height: 58,
    top: 187,
  },
  item3: {
    top: 310,
  },
  details2: {
    width: 160,
    left: 9,
    height: 58,
    top: 187,
  },
  item4: {
    top: 310,
  },
  item5: {
    left: 20,
    top: 589,
  },
  item6: {
    left: 221,
  },
  details5: {
    left: 8,
    width: 170,
    height: 58,
    top: 187,
  },
  item2: {
    top: 31,
  },
  scrollview: {
    top: 135,
    width: 429,
    height: 1250,
    
    left: 0,
    backgroundColor: Color.white
  },
  cpuCoolers: {
    left: 145,
    fontSize: FontSize.size_5xl,
    fontFamily: FontFamily.publicSansRegular,
    top: 21,
    color: Color.colorBlack,
    textAlign: "left",
    position: "absolute",
  },
  icon: {
    overflow: "hidden",
  },
  search: {
    left: 380,
  },
  arrowCircleLeftUndefined: {
    left: 17,
  },
  cpuCoolersParent: {
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
    width: "100%",
    height: 70,
    borderStyle: "solid",
    overflow: "hidden",
    backgroundColor: Color.white,
    left: 0,
    position: "absolute",
  },
  horizontalScrollChild: {
    left: 16,
  },
  horizontalScrollItem: {
    left: 134,
  },
  horizontalScrollInner: {
    left: 252,
  },
  rectangleView: {
    left: 370,
  },
  aio: {
    left: 53,
  },
  lga1700: {
    left: 154,
  },
  am4: {
    left: 289,
  },
  corsiar: {
    left: 407,
  },
  horizontalScroll: {
    top: "8%",
    width: 1838,
    height: 63,
    overflow: "hidden",
    left: 0,
    backgroundColor: Color.white,
    flex: 1,
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
    
    height: 85,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    borderTopRightRadius: Border.br_3xs,
    borderTopLeftRadius: Border.br_3xs,
    left: 0,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    backgroundColor: Color.white,
    width: "100%",
  },
  catagories3view: {
    
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: Color.white,
  },
});

export default Catagories3View;
