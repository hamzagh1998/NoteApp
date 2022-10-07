import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginScreen } from "../../features/auth/login/screens/login.screen";
import { RegisterScreen } from "../../features/auth/register/screens/register.screen";

export function AuthNavigator() {
  const AuthStackNavigator = createNativeStackNavigator();

  return (
    <AuthStackNavigator.Navigator
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <AuthStackNavigator.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{headerShown: false}}
      />
      <AuthStackNavigator.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};