import { View } from "react-native";

const positions = {
  top: "marginTop",
  right: "marginRight",
  bot: "marginBottom",
  left: "marginLeft"
};

const sizes = {
  small: 8,
  meduim: 12,
  large: 16,
  xl: 20,
  xxl: 24
};

export function Spacer({position, size, children}) {
  const style = {
    justifyContent: "center", 
    alignItems: "center", 
  };
  const key = positions[position];
  const value = sizes[size];
  style[key] = value;

  return <View style={style}>{children}</View>
};

Spacer.defaultProps = {
  position: "bot",
  size: "small",
};