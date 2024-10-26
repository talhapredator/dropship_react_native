import * as React from "react";
import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";

const Ratings = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.ratings}>
      <View style={styles.ratings1}>
        <View style={[styles.rateAndReview, styles.iconPosition]}>
          <Text style={[styles.text, styles.textTypo1]}>4.8</Text>
          <Text style={[styles.reviews, styles.textTypo1]}>39 Reviews</Text>
        </View>
        <View style={[styles.starsAndBar, styles.starsLayout]}>
          <Image
            style={[styles.starsIcon, styles.starsLayout]}
            resizeMode="cover"
            source={require("../assets/stars.png")}
          />
          <View style={styles.bar}>
            <View style={[styles.barChild, styles.barChildLayout]} />
            <View style={[styles.barItem, styles.barChildLayout]} />
            <View style={[styles.barInner, styles.barChildLayout]} />
            <View style={[styles.rectangleView, styles.barChildLayout]} />
            <View style={[styles.barChild1, styles.barChildLayout]} />
          </View>
          <Text style={styles.text1}>30</Text>
          <Text style={[styles.text2, styles.textTypo]}>3</Text>
          <Text style={[styles.text3, styles.textTypo]}>4</Text>
          <Text style={[styles.text4, styles.textTypo]}>2</Text>
          <Text style={[styles.text5, styles.textTypo]}>0</Text>
        </View>
      </View>
      <View style={styles.reviewsParent}>
        <Text style={[styles.reviews1, styles.reviews1FlexBox]}>
          12 Reviews
        </Text>
        <View style={[styles.avatarParent, styles.avatarLayout]}>
          <Image
            style={[styles.avatarIcon, styles.avatarIconLayout]}
            resizeMode="cover"
            source={require("../assets/avatar.png")}
          />
          <View style={styles.rectangleParent}>
            <View style={styles.groupChild} />
            <Text style={[styles.review, styles.reviewTypo]}>
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            <Text style={[styles.helenAunt, styles.reviews1FlexBox]}>
              Helen Aunt
            </Text>
            <Image
              style={styles.rating6Icon}
              resizeMode="cover"
              source={require("../assets/rating-6.png")}
            />
          </View>
        </View>
        <View style={[styles.avatarGroup, styles.avatarLayout]}>
          <Image
            style={[styles.avatarIcon, styles.avatarIconLayout]}
            resizeMode="cover"
            source={require("../assets/avatar.png")}
          />
          <View style={styles.rectangleParent}>
            <View style={styles.groupChild} />
            <Text style={[styles.review, styles.reviewTypo]}>
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            <Text style={[styles.helenAunt, styles.reviews1FlexBox]}>
              Helen Aunt
            </Text>
            <Image
              style={styles.rating6Icon}
              resizeMode="cover"
              source={require("../assets/rating-6.png")}
            />
          </View>
        </View>
        <View style={[styles.avatarContainer, styles.avatarLayout]}>
          <Image
            style={[styles.avatarIcon, styles.avatarIconLayout]}
            resizeMode="cover"
            source={require("../assets/avatar.png")}
          />
          <View style={styles.rectangleParent}>
            <View style={styles.groupChild} />
            <Text style={[styles.review, styles.reviewTypo]}>
              The dress is great! Very classy and comfortable. It fit perfectly!
              I'm 5'7" and 130 pounds. I am a 34B chest. This dress would be too
              long for those who are shorter but could be hemmed. I wouldn't
              recommend it for those big chested as I am smaller chested and it
              fit me perfectly. The underarms were not too wide and the dress
              was made well.
            </Text>
            <Text style={[styles.helenAunt, styles.reviews1FlexBox]}>
              Helen Aunt
            </Text>
            <Image
              style={styles.rating6Icon}
              resizeMode="cover"
              source={require("../assets/rating-6.png")}
            />
          </View>
        </View>
      </View>
      <View style={styles.upperNav}>
        <Text style={[styles.productRating, styles.reviews1FlexBox]}>
          Product Rating
        </Text>
        <Pressable
          style={[styles.arrowCircleLeftUndefined, styles.avatarIconLayout]}
          onPress={() => navigation.navigate("ProductPage")}
        >
          <Image
            style={[styles.icon, styles.bgLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View>
      <View style={[styles.writeAReview, styles.blurLayout]}>
        <LinearGradient
          style={[styles.blur, styles.blurLayout]}
          locations={[0, 0.78]}
          colors={["rgba(255, 255, 255, 0.22)", "#fff"]}
          useAngle={true}
          angle={180}
        />
        <View style={styles.buttonreviewinactive}>
          <View style={[styles.bg, styles.bgLayout]} />
          <Image
            style={styles.icon1}
            resizeMode="cover"
            source={require("../assets/icon.png")}
          />
          <Text style={[styles.writeAReview1, styles.reviewTypo]}>
            Write a review
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    left: 0,
    top: 0,
  },
  textTypo1: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  starsLayout: {
    height: 92,
    position: "absolute",
  },
  barChildLayout: {
    height: 10,
    backgroundColor: Color.colorCornflowerblue,
    borderRadius: Border.br_21xl,
    left: 0,
    position: "absolute",
  },
  textTypo: {
    left: 239,
    fontSize: FontSize.size_3xs,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  reviews1FlexBox: {
    textAlign: "left",
    color: Color.colorBlack,
    position: "absolute",
  },
  avatarLayout: {
    height: 297,
    width: 361,
    left: -1,
    position: "absolute",
  },
  avatarIconLayout: {
    height: 32,
    width: 32,
    position: "absolute",
  },
  reviewTypo: {
    fontFamily: FontFamily.font,
    textAlign: "left",
    position: "absolute",
  },
  bgLayout: {
    height: "100%",
    width: "100%",
  },
  blurLayout: {
    height: 120,
    width: 430,
    left: 0,
    position: "absolute",
  },
  text: {
    fontSize: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 119,
    height: 90,
    left: 0,
    top: 0,
  },
  reviews: {
    top: 73,
    left: 28,
    fontSize: FontSize.size_xs,
  },
  rateAndReview: {
    width: 129,
    height: 96,
    position: "absolute",
  },
  starsIcon: {
    width: 80,
    left: 0,
    top: 0,
  },
  barChild: {
    width: 128,
    top: 0,
  },
  barItem: {
    top: 19,
    width: 40,
  },
  barInner: {
    top: 38,
    width: 50,
  },
  rectangleView: {
    top: 57,
    width: 19,
  },
  barChild1: {
    top: 76,
    width: 8,
  },
  bar: {
    top: 3,
    left: 96,
    height: 86,
    width: 128,
    position: "absolute",
  },
  text1: {
    top: 2,
    left: 236,
    fontSize: FontSize.size_3xs,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    position: "absolute",
  },
  text2: {
    top: 21,
  },
  text3: {
    top: 40,
  },
  text4: {
    top: 59,
  },
  text5: {
    top: 78,
  },
  starsAndBar: {
    top: 7,
    left: 139,
    width: 269,
  },
  ratings1: {
    top: 167,
    left: 9,
    width: 408,
    height: 99,
    position: "absolute",
  },
  reviews1: {
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    fontSize: FontSize.font1_size,
    textAlign: "left",
    left: 0,
    top: 0,
  },
  avatarIcon: {
    left: 0,
    top: 0,
  },
  groupChild: {
    borderRadius: Border.br_3xs,
    backgroundColor: Color.colorGray_100,
    borderColor: Color.colorGray_200,
    borderWidth: 1,
    borderStyle: "solid",
    width: 318,
    height: 297,
    left: 0,
    top: 0,
    position: "absolute",
  },
  review: {
    top: 51,
    fontSize: FontSize.font_size,
    letterSpacing: 0,
    lineHeight: 21,
    color: Color.black,
    width: 267,
    height: 199,
    opacity: 0.8,
    left: 11,
  },
  helenAunt: {
    top: 6,
    left: 11,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    fontSize: FontSize.font1_size,
    textAlign: "left",
  },
  rating6Icon: {
    width: 77,
    height: 12,
    top: 32,
    left: 11,
    position: "absolute",
  },
  rectangleParent: {
    left: 43,
    width: 318,
    height: 297,
    top: 0,
    position: "absolute",
  },
  avatarParent: {
    top: 40,
  },
  avatarGroup: {
    top: 358,
  },
  avatarContainer: {
    top: 676,
  },
  reviewsParent: {
    top: 283,
    left: 34,
    width: 360,
    height: 973,
    position: "absolute",
  },
  productRating: {
    left: 137,
    fontSize: FontSize.size_5xl,
    top: 21,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
  },
  icon: {
    overflow: "hidden",
  },
  arrowCircleLeftUndefined: {
    left: 17,
    top: 21,
  },
  upperNav: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    height: 70,
    overflow: "hidden",
    width: 430,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  blur: {
    backgroundColor: "transparent",
    top: 0,
  },
  bg: {
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    shadowColor: "rgba(211, 38, 38, 0.25)",
    shadowRadius: 8,
    elevation: 8,
    borderRadius: Border.br_6xl,
    backgroundColor: Color.colorRoyalblue_200,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    height: "100%",
    position: "absolute",
  },
  icon1: {
    height: "66.67%",
    width: "18.73%",
    top: "16.81%",
    right: "75%",
    bottom: "16.53%",
    left: "6.27%",
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    position: "absolute",
  },
  writeAReview1: {
    height: "24.93%",
    width: "64.85%",
    top: "41.74%",
    left: "28.13%",
    fontSize: FontSize.font2_size,
    lineHeight: 8,
    fontWeight: "600",
    color: Color.white,
  },
  buttonreviewinactive: {
    height: "29.75%",
    width: "34.14%",
    top: "45.33%",
    right: "4.53%",
    bottom: "24.92%",
    left: "61.33%",
    position: "absolute",
  },
  writeAReview: {
    top: 812,
  },
  ratings: {
    
    backgroundColor: Color.white,
    flex: 1,
    height: 932,
    width: "100%",
  },
});

export default Ratings;
