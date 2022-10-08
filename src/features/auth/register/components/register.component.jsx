import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { AuthCard } from "../../../../components/containers/auth-card";
import { Spacer } from "../../../../components/spacer/spacer";

export function RegisterComponent({onLogin}) {

  const BottomText = () => (
    <Spacer position="top">
      <View style={styles.textContainer}>
        <Text style={{color: "#000"}}>
          Already have an account?
        </Text>
        <Spacer position="left">
          <TouchableOpacity onPress={onLogin}>
            <Text style={{color: "#6001d2", fontWeight: "800"}}>
              Sign in
            </Text>
          </TouchableOpacity>
        </Spacer>
      </View>
    </Spacer>
  );

  return (
    <AuthCard title="Sign up">
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