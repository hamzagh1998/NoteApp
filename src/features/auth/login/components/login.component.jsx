import React from "react";
import { StyleSheet } from "react-native";

import { AuthCard } from "../../../../components/containers/auth-card";

export function LoginComponent({onRegister, onGoogleButtonPress, onFacebookButtonPress}) {

  return (
    <AuthCard 
      title="Sign in" 
      onGoogleButtonPress={onGoogleButtonPress}
      onFacebookButtonPress={onFacebookButtonPress}
    />
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 400,
  }
});