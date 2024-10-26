import * as React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, Pressable, ScrollView, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, ParamListBase, RouteProp } from "@react-navigation/native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { getProductsByCategory } from "../services/ProductService";
import StarRating from '../components/StarRating';

type ProductListRouteParams = {
  categoryId: string;
  categoryName: string;
  Catagories2List: unknown;
};

type ProductItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  ratings: number;
};

const ProductList = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const route = useRoute<RouteProp<{ params: ProductListRouteParams }, 'params'>>();
  const { categoryId, categoryName, } = route.params || {};

  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsByCategory(Number(categoryId));
        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          console.error("Fetched data is not an array", response);
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const renderProductItem = ({ item }: { item: ProductItem }) => (
    <Pressable
      key={item.id}
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Product', { productId: item.id,  productName: item.name })}
    >
      <Image
        style={styles.productImage}
        resizeMode="cover"
        source={{ uri: item.imageUrl[0] }}
        //source={require("../assets/rectangle-324.png")}
      />
      <View style={styles.details}>
        <Text style={styles.productName}>{item.name}</Text>
        <StarRating rating={item.ratings} size={12} color="#55A5F8" />
        <Text style={[styles.text3]}>({item.ratings})</Text>
        <Text style={styles.productPrice}>PKR {item.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
  
        <Pressable
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/arrow-circle-left--undefined.png")}
          />
        </Pressable>
        <Text style={styles.headerTitle}>Products</Text>
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate("Categories4Search")}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/search-box1.png")}
          />
        </Pressable>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        columnWrapperStyle={styles.columnWrapper}
      />
      {/* <View style={[styles.navbar, styles.textFlexBox]}>
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
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: Color.white,
    height: "100%",
    width: "100%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: Color.colorGray_300,
    backgroundColor: Color.white,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FontFamily.publicSansRegular,
    color: Color.colorBlack,
  },
  searchButton: {
    height: 32,
    width: 32,
  },
  backButton: {
    height: 32,
    width: 32,
    
  },
  iconLayout: {
    height: "100%",
    width: "100%",
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
  icon: {
    height: "100%",
    width: "100%",
  },
  productList: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  text3: {
    left: 60,
    top: -13,
    color: Color.black,
    fontSize: 10
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemContainer: {
    backgroundColor: Color.white,
    borderRadius: Border.br_3xs,
    borderWidth: 1,
    borderColor: Color.colorGray_600,
    width: '48%',
    height: "100%",
    overflow: 'hidden',
  },
  productImage: {
    height: 130,
    width: '80%',
    left: 17,
    borderTopLeftRadius: Border.br_3xs,
    borderTopRightRadius: Border.br_3xs,
  },
  details: {
    padding: 10,
  },
  productName: {
    fontSize: 12,
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
  navbar: {
    top: "90%",
    height: 75,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Padding.p_26xl,
    paddingVertical: Padding.p_3xl,
    borderTopWidth: 1,
    borderColor: Color.colorGray_600,
    width: "100%",
    backgroundColor: Color.white,
  },
  textFlexBox: {
    alignItems: "center",
    position: "absolute",
  },
});

export default ProductList;
