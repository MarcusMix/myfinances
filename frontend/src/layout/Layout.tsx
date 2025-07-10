import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Home from "../screen/home/Home";
import Profile from "../screen/profile/Profile";
import Expense from "../screen/expense/Expense";
import Limit from "../screen/limit/Limit";
import Ionicons from "@expo/vector-icons/Ionicons";
import Login from "../screen/login/Login";
import Register from "../screen/register/Register";
import { useAuth } from "../context/AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let localIcon;
          if (route.name === "Home") {
            localIcon = focused ? "home" : "home-outline";
          } else if (route.name === "Perfil") {
            localIcon = focused ? "person" : "person-outline";
          } else if (route.name === "Limites") {
            localIcon = focused ? "wallet" : "wallet-outline";
          } else if (route.name === "Despesas") {
            localIcon = focused ? "receipt" : "receipt-outline";
          }
          return <Ionicons name={localIcon} size={size} color={color} />;
        },
        tabBarStyle: { paddingBottom: 20, paddingTop: 8, height: 80 },
      })}
    >
      <Tab.Screen name="Perfil" component={Profile} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Despesas" component={Expense} />
      <Tab.Screen name="Limites" component={Limit} />
    </Tab.Navigator>
  );
}

export default function Layout() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "Main" : "Login"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
