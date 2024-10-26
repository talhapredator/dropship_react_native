const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StartScreen from "./src/screens/StartScreen";
import HomePage from "./src/screens/HomePage";
import SignUp from "./src/screens/SignUp";
import LogIn from "./src/screens/LogIn";
import StyleMainPage from "./src/screens/StyleMainPage";
import Catagories from "./src/screens/Catagories";
import Catagories2List from "./src/screens/Catagories2List"
import ProductList from "./src/screens/ProductList";
import Ratings from "./src/screens/Ratings";
import Cart from "./src/screens/Cart";
import Checkout from "./src/screens/Checkout";
import PaymentEdit from "./src/screens/PaymentEdit";
import AddressEdit from "./src/screens/AddressEdit";
import Success from "./src/screens/Success";
import Catagories3View from "./src/screens/Catagories3View";
import Settings from "./src/screens/Settings";
import MyAccount from "./src/screens/MyAccount";
import Catagories4Search from "./src/screens/Catagories4Search";
import Product from "./src/screens/Product";
import Chatbot from "./src/screens/Chatbot";
import ThreeD from "./src/screens/ThreeD";
import OnlinePayment from "./src/screens/OnlinePayment";
import DeliveryStatusPage from "./src/screens/DeliveryStatusPage";
import ProductPage from "./src/screens/ProductPage";
import OrdersList from "./src/screens/OrdersList";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <>
      <NavigationContainer>
        {hideSplashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OnlinePayment"
              component={OnlinePayment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ThreeD"
              component={ThreeD}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DeliveryStatusPage"
              component={DeliveryStatusPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OrdersList"
              component={OrdersList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="StyleMainPage"
              component={StyleMainPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Catagories"
              component={Catagories}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Catagories2List"
              component={Catagories2List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Ratings"
              component={Ratings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Checkout"
              component={Checkout}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Chatbot"
              component={Chatbot}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PaymentEdit"
              component={PaymentEdit}
              options={{ headerShown: false }}
            />
            
            <Stack.Screen
              name="AddressEdit"
              component={AddressEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyAccount"
              component={MyAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Catagories4Search"
              component={Catagories4Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Catagories3View"
              component={Catagories3View}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductPage"
              component={ProductPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Product"
              component={Product}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : null}
      </NavigationContainer>
    </>
  );
};
export default App;
