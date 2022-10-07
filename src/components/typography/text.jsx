import { Text } from "@rneui/themed";
import { useSelector } from "react-redux";


function Title({text}) {

  const theme = useSelector(state => state.theme.currentTheme);
  const color = theme.colors.primary;

  return (
    <Text h2 style={{color}}>{text}</Text>
  );
};

function Label({text}) {

  const theme = useSelector(state => state.theme.currentTheme);
  const color = theme.colors.secondary;

  return (
    <Text h4 style={{color}}>{text}</Text>
  );
};

function Body({text}) {

  const theme = useSelector(state => state.theme.currentTheme);
  const color = theme.colors.secondary;

  return (
    <Text h5 style={{color}}>{text}</Text>
  );
};

function Tiny({text}) {
  const theme = useSelector(state => state.theme.currentTheme);
  const color = theme.colors.secondary;

  return (
    <Text style={{color, fontSize: 12}}>{text}</Text>
  );
}

function Error({text}) {

  const theme = useSelector(state => state.theme.currentTheme);
  const color = theme.colors.error;

  return (
    <Text style={{color, fontSize: 12}}>{text}</Text>
  );
};

export { Title, Label, Body, Tiny, Error };

