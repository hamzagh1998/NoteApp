import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/base";

export function AddNewBtn({onPress}) {

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const bgColor = currentTheme.bgColors.primary;

  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar
        activeOpacity={0.2}
        containerStyle={styles(bgColor).ButtonStyle}
        icon={{ name: "add", type: "ionicon" }}
        rounded
        size="large"
      />
    </TouchableOpacity>
  );
}

const styles = (bgColor="") => (StyleSheet.create({
  ButtonStyle: {
    backgroundColor: "#9b59b6",
    marginBottom: 35,
    borderTopWidth: 7,
    borderBottomWidth: 7,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopColor: bgColor,
    borderBottomColor: bgColor,
    borderRightColor: bgColor,
    borderLeftColor: bgColor
  }
}));
