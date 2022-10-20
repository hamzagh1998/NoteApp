import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/themed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { NotesNavigator } from "./notes.navigator";
import { CrudNavigator } from "./crud.navigator";
import { AllNotesScreen } from "../../features/notes/presentation/all/screens/all-notes.screen";

import { AddNewBtn } from "../../components/buttons/add-new-btn";

export function MainNavigator() {
  const MainBottomTabNavigator = createBottomTabNavigator();

  const theme = useSelector(state => state.theme.currentTheme);

  const TAB_ICON = {
    Notes: ["file-tray-full", "file-tray-full-outline"],
    "_": [],
    Favorites: ["star", "star-outline"]
  };

  const tabThemeHandler = ({route, navigation}) => {
    return {
      tabBarIcon: ({ focused, color, size }) => {
        const iconName = focused ? TAB_ICON[route.name][0]: TAB_ICON[route.name][1];
        return route.name === "_"
                ? <AddNewBtn onPress={() => navigation.navigate("_", { screen: "Create" })} />
                : <Icon name={iconName} type="ionicon" size={size+5} color={color} />; 
      },
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: theme.colors.secondary,
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {height: 60, backgroundColor: theme.bgColors.primary, borderTopWidth: 0}
    };
  };

  return (
    <MainBottomTabNavigator.Navigator screenOptions={tabThemeHandler}>
      <MainBottomTabNavigator.Screen 
        name="Notes"
        component={NotesNavigator}
      />
      <MainBottomTabNavigator.Screen 
        name="_"
        component={CrudNavigator}
      />
      <MainBottomTabNavigator.Screen
        name="Favorites"
        component={AllNotesScreen}
      />
    </MainBottomTabNavigator.Navigator>
  )

};