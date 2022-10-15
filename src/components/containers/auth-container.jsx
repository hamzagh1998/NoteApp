import React from "react";
import { ImageBackground, StyleSheet } from "react-native";


export function AuthContainer({children}) {

  return (
    <ImageBackground 
      source={require("../../assets/note-bg-img.jpg")}
      style={styles.image}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    padding: 10,
    opacity: 1,
  }
});