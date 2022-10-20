import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";

import { Label } from "../../../../../components/typography/text";
import { Spacer } from "../../../../../components/spacer/spacer";


const screenWidth = Dimensions.get("window").width;

export function CreateNoteComponent({ note, setNote, onSaveNote }) {

  const { title, content } = note;

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const color = currentTheme.colors.primary;

  return (
    <View style={styles.container}>
      <Spacer size="large" />
      <Label text="Create new note" />
      <Spacer />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
        <Input 
          value={title}
          inputStyle={{color}}
          onChangeText={text => setNote({...note, title: text})}
          placeholder="Enter note title"
        />
        <Input 
          value={content}
          inputStyle={{color}}
          onChangeText={text => setNote({...note, content: text})}
          multiline
          numberOfLines={4}
          placeholder="Enter note content"
        />
        <Spacer />
        {
          title.length
            ? <Button 
                containerStyle={styles.buttonStyle}
                onPress={onSaveNote}
              >
                <Icon name="save" type="ionicon" color="#fff" size={26} />
              </Button>
            : null
        }
        <Spacer position="bot" size="xxl" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  buttonContainer: {
    position: "absolute",
    bottom: "4.5%"
  },
  buttonStyle: {
    alignSelf: "center",
    width: (screenWidth*90)/100,
  },
  scrollViewStyle: {
    flex: 1,
    width: "100%",
  }
});