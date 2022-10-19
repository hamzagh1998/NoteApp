import React from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { Input, Button, Icon } from "@rneui/themed";

import { Spacer } from "../../../../../components/spacer/spacer";


const screenWidth = Dimensions.get("window").width;

export function UpdateNoteComponent({ note, setNote, onUpdate }) {

  const { title, content } = note;

  return (
    <View style={styles.container}>
      <Spacer size="large" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewStyle}
      >
       <Input 
          value={title}
          onChangeText={text => setNote({...note, title: text})}
          placeholder="Enter note title"
        />
        <Input 
          value={content}
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
                onPress={onUpdate}
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