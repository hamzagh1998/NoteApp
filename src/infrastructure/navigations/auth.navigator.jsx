import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { LoginScreen } from "../../features/auth/login/screens/login.screen";
import { RegisterScreen } from "../../features/auth/register/screens/register.screen";

export function AuthNavigator() {
  const AuthStackNavigator = createNativeStackNavigator();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "684332957943-378fimjkqoi0rvf6893luste86rscfn4.apps.googleusercontent.com",
    });
  }, []);

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