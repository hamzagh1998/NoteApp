import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateContentScreen } from "../../features/notes/crud/create/screens/create-content.screen";
import { UpdateNoteScreen } from "../../features/notes/crud/update/screens/update-note.screen";

export function CrudNavigator() {
  const CrudStackNavigator = createNativeStackNavigator();

  return (
    <CrudStackNavigator.Navigator
      screenOptions={{headerBackButtonMenuEnabled: true}}
    >
      <CrudStackNavigator.Screen 
        name="Create" 
        component={CreateContentScreen} 
        options={{headerShown: false}}
      />
      <CrudStackNavigator.Screen 
        name="Update" 
        component={UpdateNoteScreen} 
        options={({ route }) => ({ title: route.params.title })}
      />
    </CrudStackNavigator.Navigator>
  );
};