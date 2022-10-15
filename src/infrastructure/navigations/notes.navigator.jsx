import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { toggleTheme } from "../../store/theme.slice";
import { setStoredToken } from "../../store/token.slice";

import { useAsyncStorage } from "../../hooks/use-async-storage";

import { AllNotesScreen } from "../../features/notes/presentation/all/screens/all-notes.screen";
import { NoteDetailScreen } from "../../features/notes/presentation/detail/screens/note-detail.screen";

import { Spacer } from "../../components/spacer/spacer";

export function NotesNavigator() {
  const NotesStackNavigator = createNativeStackNavigator();

  const [_, setTheme] = useAsyncStorage("@theme");

  const dispatch = useDispatch();

  const themeMode = useSelector(state => state.theme.mode);
  const theme = useSelector(state => state.theme.currentTheme);

  const {name, photoUrl} = useSelector(state => state.user.value);

  const onLogout = () => {
    dispatch(setStoredToken({token: null, isLoading: false}));
    (async () => {
      try {
        await AsyncStorage.removeItem("@token");
      } catch (error) {
        console.log("error removing token from async storage:", error);
      };
    })();
  };

  useEffect(() => {
    const changeTheme = () => setTheme(themeMode);
    changeTheme();
  }, [themeMode]);

  return (
    <NotesStackNavigator.Navigator
      screenOptions={{
      headerBackButtonMenuEnabled: true, 
      headerTitleStyle: {fontWeight: "bold", color: theme.colors.primary},
      headerStyle: {backgroundColor: theme.bgColors.primary}
    }}
    >
      <NotesStackNavigator.Screen 
        name="All" 
        component={AllNotesScreen} 
        options={
          ({ navigation, route }) => ({
            title: name ? name : null,
            headerRight: () => (
             <>
               <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
                <Icon 
                  name={themeMode === "dark" ? "md-sunny" : "moon"} 
                  type="ionicon" 
                  size={26} 
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
              <Spacer position="right" size="large" />
              <TouchableOpacity onPress={() => onLogout()}>
                <Icon 
                  name="exit-outline" 
                  type="ionicon" 
                  size={26} 
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
             </>
            ),
            headerLeft: () =>(
              <Spacer position="right">
                <Avatar
                  source={{ uri: photoUrl ? photoUrl : null }}
                  size={44}
                  rounded
                />
              </Spacer>
            )
        })}
      />
      <NotesStackNavigator.Screen 
        name="Detail" 
        component={NoteDetailScreen} 
        options={({ route }) => ({ title: route.params.title })}
      />
    </NotesStackNavigator.Navigator>
  );
};