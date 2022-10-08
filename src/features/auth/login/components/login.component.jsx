import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { AuthCard } from "../../../../components/containers/auth-card";
import { Spacer } from "../../../../components/spacer/spacer";

export function LoginComponent({onRegister, onGoogleButtonPress}) {

  const BottomText = () => (
    <Spacer position="top">
      <View style={styles.textContainer}>
        <Text style={{color: "#000"}}>
          Don't have an account?
        </Text>
        <Spacer position="left">
          <TouchableOpacity onPress={onRegister}>
            <Text style={{color: "#6001d2", fontWeight: "800"}}>
              Sign up
            </Text>
          </TouchableOpacity>
        </Spacer>
      </View>
    </Spacer>
  );

  return (
    <AuthCard 
      title="Sign in" 
      onGoogleButtonPress={onGoogleButtonPress}
    >
      <BottomText />
    </AuthCard>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: 400,
  }
});