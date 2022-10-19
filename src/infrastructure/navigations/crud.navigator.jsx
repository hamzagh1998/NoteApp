import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CreateContentScreen } from "../../features/notes/crud/create/screens/create-content.screen";
import { UpdateNoteScreen } from "../../features/notes/crud/update/screens/update-note.screen";
import { UpdateChecklistScreen } from "../../features/notes/crud/update/screens/update-checklist.screen";

import { Icon } from "@rneui/themed";
import { Spacer } from "../../components/spacer/spacer";

export function CrudNavigator() {

  const CrudStackNavigator = createNativeStackNavigator();

  const theme = useSelector(state => state.theme.currentTheme);

  return (
    <CrudStackNavigator.Navigator
      screenOptions={{
        headerTitleStyle: {fontWeight: "bold", color: theme.colors.primary},
        headerStyle: {backgroundColor: theme.bgColors.primary}
      }}
    >
      <CrudStackNavigator.Screen 
        name="Create" 
        component={CreateContentScreen} 
        options={{headerShown: false}}
      />
      <CrudStackNavigator.Screen 
        name="UpdateNote" 
        component={UpdateNoteScreen} 
        options={({ navigation, route: { params: { noteData } } }) => ({
          title: "Update note",
          headerLeft: () => (
            <Spacer position="right" size="xxl">
              <Icon
                name="arrow-back"
                type="ionicon"
                color="#000"
                onPress={
                  () => navigation.navigate("Notes", { screen: "DetailNote", params: { ...noteData } })
                }
              />
            </Spacer>
          )
        })}
      />
      <CrudStackNavigator.Screen 
        name="UpdateChecklist" 
        component={UpdateChecklistScreen} 
        options={({ navigation, route: { params: { checklistData } } }) => ({
          title: "Update checklist",
          headerLeft: () => (
            <Spacer position="right" size="xxl">
              <Icon
                name="arrow-back"
                type="ionicon"
                color="#000"
                onPress={
                  () => navigation.navigate("Notes", { screen: "DetailChecklist", params: { ...checklistData } })
                }
              />
            </Spacer>
          )
        })}
      />
    </CrudStackNavigator.Navigator>
  );
};