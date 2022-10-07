import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

export function SafeAreaContainer({children}) {

  const theme = useSelector(state => state.theme.currentTheme);
  const bgColor = theme.bgColors.secondary;

  return (
    <View 
      style={{flex: 1, backgroundColor: bgColor, padding: 10}}
    >
      {children}
    </View>
  );
};

