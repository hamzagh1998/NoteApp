import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "@rneui/base";

export function AddNewBtn({onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar
        activeOpacity={0.2}
        containerStyle={{ backgroundColor: "#7289da", marginBottom: 35 }}
        icon={{ name: "add", type: "ionicon" }}
        rounded
        size="large"
      />
    </TouchableOpacity>
  );
}