import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Input, Button, Icon, CheckBox, Dialog } from "@rneui/themed";
import { useSelector } from "react-redux";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { Label } from "../../../../../components/typography/text";
import { Spacer } from "../../../../../components/spacer/spacer";


const screenWidth = Dimensions.get("window").width;

export function CreateCheckListComponent({ checklist, setChecklist, onSaveChecklist }) {

  const { title, items } = checklist;
  
  const currentTheme = useSelector(state => state.theme.currentTheme);

  const bgColor = currentTheme.bgColors.secondary;
  const color = currentTheme.colors.primary;

  const [visible, setVisible] = useState(false);
  const [itemValue, setItemValue] = useState("");

  const onCreateItem = () => {
    setVisible(false);
    const newItems = items;
    const item = {id: uuidv4(), title: itemValue, checked: false};
    newItems.push(item);

    setChecklist({...checklist, items: newItems});
    setItemValue("");
  };

  const onChecked = itemId => {
    const newItems = items;
    const item = newItems.filter(item => item.id === itemId)[0];
    item.checked = !item.checked;

    setChecklist({...checklist, items: newItems});
  };

  const onDeleteItem = itemId => {
    const newItems = items.filter(item => item.id !== itemId);

    setChecklist({...checklist, items: newItems});
  };

  return (
    <View style={styles().container}>
      <Spacer size="large" />
      <Label text="Create new checklist" />
      <Spacer />
      <Input 
        inputStyle={{color: color}}
        value={title}
        onChangeText={text => setChecklist({...checklist, title: text})}
        placeholder="Enter checklist title"
      />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles().scrollViewStyle}
      >
        {
          items.length
          ? items.map(item => (
              <View style={styles().itemsContainer}>
                <CheckBox 
                  key={item.id}
                  title={item.title}
                  checked={item.checked}
                  onPress={() => onChecked(item.id)}
                  containerStyle={styles(bgColor, "").checkBoxContainerStyle}
                  textStyle={styles("", color).checkBoxtextStyle}
                />
                <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
                  <Icon name="trash" type="ionicon" color="#f33" />
                </TouchableOpacity>
              </View>
              ))
            : null
        }
      </ScrollView>
      <View style={styles().buttonContainer}>
        <Button 
          color="secondary" 
          containerStyle={styles().buttonStyle}
          onPress={() => setVisible(true)}
        >
          <Icon name="add" type="ionicon" color="#fff" size={28} />
        </Button>
        <Spacer />
        {
          (title.length && items.length)
            ? <Button 
                containerStyle={styles().buttonStyle}
                onPress={onSaveChecklist}
              >
                <Icon name="save" type="ionicon" color="#fff" size={26} />
              </Button>
            : null
        }
      </View>
      <Dialog
        overlayStyle={styles(bgColor).dialogStyle}
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
          setItemValue("");
        }}
      >
        <Dialog.Title title="Add new item!"/>
        <Input 
          inputStyle={{color: color}}
          value={itemValue}
          onChangeText={text => setItemValue(text)}
          placeholder="Enter item value"
        />
        {
          itemValue
            ? <Button onPress={onCreateItem}>Add</Button>
            : null
        }
      </Dialog>
    </View>
  );
};

const styles = (bgColor="", color="") => (StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }, 
  buttonStyle: {
    width: (screenWidth*90)/100,
  },
  scrollViewStyle: {
    flex: 4,
    width: "100%",
    marginBottom: "36%",
  },  
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },  
  checkBoxContainerStyle: {
    width: "85%",
    backgroundColor: bgColor,
    alignSelf: "center",
    justifyContent: "center",
  },
  checkBoxtextStyle: {
    color: color, 
    fontSize: 18
  },
  buttonContainer: {
    position: "absolute",
    bottom: "4%",
  }, 
  dialogStyle: {
    backgroundColor: bgColor,
    borderRadius: 12,
  }
}));