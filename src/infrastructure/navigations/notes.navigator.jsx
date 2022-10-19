import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Icon, Dialog, Input, Button } from "@rneui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { toggleTheme } from "../../store/theme.slice";
import { setStoredToken } from "../../store/token.slice";

import { useAsyncStorage } from "../../hooks/use-async-storage";

import { AllNotesScreen } from "../../features/notes/presentation/all/screens/all-notes.screen";
import { NoteDetailScreen } from "../../features/notes/presentation/detail/screens/note-detail.screen";
import { ChecklistDetailScreen } from "../../features/notes/presentation/detail/screens/checklist-detail.screen";

import { Spacer } from "../../components/spacer/spacer";


export function NotesNavigator() {
  const NotesStackNavigator = createNativeStackNavigator();

  const [_, setTheme] = useAsyncStorage("@theme");

  const dispatch = useDispatch();

  const themeMode = useSelector(state => state.theme.mode);
  const theme = useSelector(state => state.theme.currentTheme);

  const {name, photoUrl} = useSelector(state => state.user.value);

  const [lockCallback, setLockCallback] = useState(null);
  const [visible, setVisible] = useState(false);
  const [notePassword, setNotePassword] = useState("");

  const onSave = () => {
    const { callback, args } = lockCallback;
    args.push(notePassword);
    callback(...args);
    setVisible(false);
  };

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
    <>
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
            () => ({
              title: name,
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
                    source={{ uri: photoUrl }}
                    size={44}
                    rounded
                  />
                </Spacer>
              )
          })}
        />
        <NotesStackNavigator.Screen 
          name="DetailNote" 
          component={NoteDetailScreen} 
          options={
            ({ 
              navigation,
              route: { params: { noteId, secure, favorite, onStarNote, onLockNote, onDeleteNote } } 
            }) => ({ 
              title: "Note detail",
              headerRight: () => (
                <>
                  <TouchableOpacity onPress={
                    () => 
                    navigation.navigate("_", {screen: "UpdateNote", params: {
                      noteData: { noteId, secure, favorite, onStarNote, onLockNote, onDeleteNote }
                    }})
                  }>
                    <Icon 
                      name="pencil" 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => onStarNote(noteId, "DetailNote")}>
                    <Icon 
                      name={favorite ? "star" : "star-outline"} 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => {
                    if (!secure) {
                      setVisible(true);
                      setLockCallback({callback: onLockNote, args: [noteId]});
                    } else {
                      onLockNote(noteId, null);
                    };
                    setNotePassword("");
                  }}>
                    <Icon 
                      name={secure ? "lock-closed" : "lock-open"} 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => onDeleteNote(noteId)}>
                    <Icon 
                      name="trash" 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                </>
              )
            })
          }
        />
        <NotesStackNavigator.Screen 
          name="DetailChecklist" 
          component={ChecklistDetailScreen} 
          options={
            ({ 
              navigation, 
              route: { params: { checklistId, secure, favorite, onStarChecklist, onLockChecklist, onDeleteChecklist } }
            }) => ({ 
              title: "Checklist detail",
              headerRight: () => (
                <>
                  <TouchableOpacity onPress={
                    () => 
                    navigation.navigate("_", {screen: "UpdateChecklist", params: {
                      checklistData: { checklistId, secure, favorite, onStarChecklist, onLockChecklist, onDeleteChecklist }
                    }})
                  }>
                    <Icon 
                      name="pencil" 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => onStarChecklist(checklistId, "DetailChecklist")}>
                    <Icon 
                      name={favorite ? "star" : "star-outline"} 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => {
                      if (!secure) {
                        setVisible(true);
                        setLockCallback({callback: onLockChecklist, args: [checklistId]});
                      } else {
                        onLockChecklist(checklistId, null);
                      };
                      setNotePassword("");
                    }  
                  }>
                    <Icon 
                      name={secure ? "lock-closed" : "lock-open"} 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                  <Spacer position="right" size="large" />
                  <TouchableOpacity onPress={() => onDeleteChecklist(checklistId)}>
                    <Icon 
                      name="trash" 
                      type="ionicon" 
                      size={26} 
                      color={theme.colors.primary}
                      />
                  </TouchableOpacity>
                </>
              )
            })
          }
          />
      </NotesStackNavigator.Navigator>
      <Dialog
        overlayStyle={styles(theme.bgColors.secondary).dialogStyle}
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
          // setNotePassword("");
        }}
      >
        <Dialog.Title title="Set new password!"/>
            <Input 
              inputStyle={{color: theme.colors.primary}}
              value={notePassword}
              onChangeText={text => setNotePassword(text)}
              placeholder="Enter password value"
              secureTextEntry
            />
            {
              notePassword
                ? <Button onPress={onSave}>Add</Button>
                : null
            }
      </Dialog>
    </>
  );
};

const styles = (bgColor="", color="") => (StyleSheet.create({
  dialogStyle: {
    backgroundColor: bgColor,
    borderRadius: 12,
  }
}));