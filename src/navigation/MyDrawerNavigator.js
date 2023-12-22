import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStackNavigator from "./MyStackNavigator";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import UserContext from "../context/UserContext";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";
import DrawerContent from "../components/DrawerContent";
import BookAdd from "../screens/BookAdd";
import SettingsScreen from "../screens/SettingsScreen";
import Target from "../screens/Target";
const Drawer = createDrawerNavigator();

export default () => {
  const state = useContext(UserContext);

  if (state.isLoading === true) {
    return <SplashScreen />;
  }

  return (
    <Drawer.Navigator
      initialRouteName="Үүсгэн байгуулагчид"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Үүсгэн байгуулагчид" component={MyStackNavigator} />
      <Drawer.Screen name="Зорилго" component={Target} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen name="Нэмж оруулах" component={BookAdd} />
          )}

          <Drawer.Screen name="Тохиргоо" component={SettingsScreen} />
          <Drawer.Screen
            name="Logout"
            component={HomeScreen}
            listeners={() => {
              state.logout();
            }}
          />
        </>
      ) : (
        <>
          <Drawer.Screen name="Бүртгэл" component={SignupScreen} />
          <Drawer.Screen name="Нэвтрэх" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
