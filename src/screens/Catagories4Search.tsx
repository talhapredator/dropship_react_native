import React, { useState } from "react";
import { Text, StyleSheet, Image, Pressable, View, TextInput, Platform, FlatList, KeyboardAvoidingView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../GlobalStyles";
import { handleSearch } from "../services/ProductService";
import StarRating from '../components/StarRating';


interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  ratings: number;
}

const Catagories4Search = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductItem[]>([]); // State to hold search results


  // const performSearch = async () => {
  //   try {
  //     const products = await handleSearch(query);
  //     console.log(products);
  //   } catch (error) {
  //     console.error("Search failed", error);
  //   }
  // };
  const performSearch = async () => {
    try {
      const searchResults = await handleSearch(query);
      setProducts(searchResults); // Store the search results in state
      // console.log(searchResults);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  // Render a product item
  const renderProductItem = ({ item }: { item: ProductItem }) => (
    
    <Pressable
      style={[ styles.rectangleLayout]}
      onPress={() => navigation.navigate("Product", { productId: item.id, productName: item.name })} // Navigate to ProductPage
    >
      <Image
        style={[styles.productImage]}
        resizeMode="cover"
        source={{ uri: item.imageUrl[0] }} 
      />
      <Text style={[styles.productName]}>{item.name}</Text>
      <StarRating rating={item.ratings} size={12} color="#55A5F8" />
      <Text style={[styles.text3]}>({item.ratings})</Text>
      <Text style={[styles.productPrice]}>PKR {item.price}/-</Text>
    </Pressable>
  );


  return (
    <View style={[styles.catagories4search]}>
      {/* <View style={[styles.brandsParent, styles.brandsParentShadowBox]}>
        <Text style={styles.brands}>Brands</Text>

        <Pressable
          style={styles.arrowCircleLeftUndefined}
          onPress={() => navigation.navigate("HomePage")}
        >
          <Image
            style={[styles.icon, styles.iconLayout]}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
      </View> */}
      
      <View style={[styles.searchBox, styles.searchBoxLayout]}>
        <View style={[styles.roundedRectangle, styles.roundedRectangleBorder]} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={performSearch} // Triggers search on Enter key press
          onFocus={() => console.log('Focused')}  // Ensures focus handling works
        />
        <Pressable style={styles.checkButton} onPress={performSearch}>
          <Image
            style={styles.vectorIcon}
            resizeMode="cover"
            source={require("../assets/vector6.png")} // Assuming this is the check icon
          />
        </Pressable>
        
      </View>
       {/* Render search results */}
       <KeyboardAvoidingView style={{ height: 820 }}>
       <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.resultsContainer}
        numColumns={2} // Grid layout
        columnWrapperStyle={styles.columnWrapper}
        keyboardShouldPersistTaps="handled" // Ensures taps on items are handled
        />
      </KeyboardAvoidingView>
      
    </View>
  );
};
const styles = StyleSheet.create({
  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },
  itemContainer: {
    backgroundColor: Color.white,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    width: '48%',
    overflow: 'hidden',
  },
  productImage: {
    height: 130,
    width: '100%',
    left: 0,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
    marginBottom: 10,
  },
  details: {
    padding: 1,
  },
  productName: {
    
    fontSize: 14,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    color: Color.colorBlack,
  },
  productPrice: {
    fontSize: FontSize.font2_size,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    color: Color.colorBlack,
    top: 0
  },
  resultsContainer: {
   
    paddingHorizontal: 10,
    paddingTop: 80,
    backgroundColor: Color.white
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 10,
    
  },
  textInput: {
    zIndex: 1,
    fontSize: FontSize.size_mid,
    fontFamily: FontFamily.dMSansBold,
    
    color: Color.white,
    width: "80%",
    height: 43,
    left: 50,
    
  },
  checkButton: {
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 40,
    left: "0%",
    top: "-85%",
    
  },
  brandsParentShadowBox: {
    width: 430,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  checkedbuttonIconLayout: {
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  searchBoxLayout: {
    height: 45,
    width: "95%",
  },
  roundedRectangleBorder: {
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    borderStyle: "solid",
    left: 0,
    position: "absolute",
  },
  applyTypo: {
    color: Color.white,
    fontSize: FontSize.headline3_size,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
  },
  brandLayout1: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  childBorder: {
    borderColor: Color.colorBlack,
    borderWidth: 1,
    borderStyle: "solid",
    left: "84.9%"
  },
  brandLayout: {
    height: "100%",
    width: "100%",
    left: 13,
    position: "absolute",
  },
  applyPosition: {
    top: 9,
    position: "absolute",
  },
  brand1ChildPosition: {
    top: 8,
    position: "absolute",
  },
  discardLayout: {
    width: 140,
    height: 40,
    position: "absolute",
  },
  brands: {
    left: "35%",
    fontSize: FontSize.size_5xl,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    top: 21,
    position: "absolute",
  },
  icon: {
    height: "100%",
    overflow: "hidden",
  },
  arrowCircleLeftUndefined: {
    left: 17,
    width: 32,
    height: 32,
    top: 21,
    position: "absolute",
  },
  brandsParent: {
    
    borderColor: Color.colorGray_300,
    borderBottomWidth: 1,
    height: 70,
    borderStyle: "solid",
    width: "100%",
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
  },
  frame: {
    top: 126,
    left: 57,
    transform: [
      {
        rotate: "90deg",
      },
    ],
    position: "absolute",
  },
  roundedRectangle: {
    backgroundColor: Color.colorRoyalblue_300,
    borderRadius: Border.br_xl,
    top: 0,
    height: 45,
    width: "100%",
  },
  vectorIcon: {
    height: "50%",
    width: "40.62%",
    top: "20%",
    right: "91.28%",
    bottom: "28.89%",
    left: "25.1%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  search: {
    top: 10,
    left: 48,
    position: "absolute",
  },
  searchBox: {
    zIndex:1,
    top: 15,
    left: 10,
    position: "absolute",
  },
  nzxt: {
    fontSize: FontSize.size_xl,
    display: "flex",
    alignItems: "center",
    width: 417,
    top: 0,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
    left: 0,
  },
  brand1Child: {
    width: 25,
    height: 25,
    left: 352,
    top: 8,
    position: "absolute",
  },
  brand1: {
    top: 195,
    left: 13,
    width: 417,
  },
  checkedbuttonIcon: {
    left: "85%",
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  brand2: {
    top: 258,
  },
  brand3: {
    top: 323,
  },
  brand11: {
    top: 387,
    left: 13,
    width: 417,
  },
  checkedbuttonIcon1: {
    left: "85%",
    height: 24,
    width: 24,
    overflow: "hidden",
  },
  brand12: {
    top: 451,
    left: 13,
    width: 417,
  },
  brand13: {
    top: 515,
    left: 13,
    width: "100%",
  },
  catagories4searchChild: {
    top: "85%",
    height: 120,
    width: "100%",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    backgroundColor: Color.white,
  },
  discardButtonChild: {
    borderColor: Color.colorBlack,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_xl,
    top: 0,
    left: 0,
    width: 140,
    backgroundColor: Color.white,
  },
  discard: {
    left: 38,
    fontSize: FontSize.headline3_size,
    top: 10,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansRegular,
  },
  discardButton: {
    left: "10%",
    top: "90%",
    width: 140,
  },
  discardButtonItem: {
    backgroundColor: Color.colorRoyalblue_200,
    borderColor: Color.colorBlack,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: Border.br_xl,
    top: 0,
    left: 0,
    width: 140,
  },
  apply: {
    left: 45,
    color: Color.white,
    fontSize: FontSize.headline3_size,
    textAlign: "left",
    fontFamily: FontFamily.publicSansRegular,
  },
  discardButton1: {
    left: "55%",
    top: "90%",
    width: 140,
  },
  catagories4search: {
    
    height: '100%',
    backgroundColor: Color.white,
    width: "100%"
  },
  rectangleLayout: {
    backgroundColor: Color.white,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    width: '48%',
    height: '100%',
    
    padding: 7,
    
  },
  text3: {
    left: 60,
    top: -13,
    color: Color.black,
    fontSize: 10
  },
  framePosition: {
  
  },
  itemTypo: {
    fontSize: 12,
    left: "5%",
    alignItems: "center",
    
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    
  },
  textTypo3: {
    fontSize: FontSize.font2_size,
    fontFamily: FontFamily.publicSansBold,
    fontWeight: "700",
    color: Color.colorBlack,
    top: "85%",
    left: "5%"
  },
});

export default Catagories4Search;
