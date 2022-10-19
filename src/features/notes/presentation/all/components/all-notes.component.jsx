import React, { useState } from "react";
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/base";
import { SearchBar, CheckBox, Dialog, Input, Button } from "@rneui/themed";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Label, Error } from "../../../../../components/typography/text";


const screenWidth = Dimensions.get("window").width;

export function AllNotesComponent({ content, search, setSearch, setFilter, onContentDetail, onStarNote, onStarChecklist }) {

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const theme = useSelector(state => state.theme.mode);
  const iconColor = currentTheme.colors.primary;
  const color = currentTheme.colors.trinary;
  const bgColor = currentTheme.bgColors.trinary;
  const checkBoxbgColor = currentTheme.bgColors.secondary;
  const checkBoxColor = currentTheme.colors.primary;

  const [filters, setFilters] = useState({all: true, notes: false, checklists: false});
  const [visible, setVisible] = useState(false);
  const [lockCallback, setLockCallback] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const onDetail = (contentId, contentType, secure, favorite, password) => {
    if (secure) {
      setVisible(true);
      setLockCallback({onContentDetail, args: [contentId, contentType, secure, favorite], contentPswrd: password});
    } else {
      onContentDetail(contentId, contentType, secure, favorite);
    };
  };

  const ContentBox = ({content}) => (
    <TouchableOpacity 
      style={styles(bgColor).boxContainer}
      onPress={
        () => 
        onDetail(content._id, content.items ? "checklist" : "note", content.secure, content.favorite, content.password)
      }
    >
      <View style={styles().starIconContainer}>
        <TouchableOpacity 
          onPress={() => {
            content.items 
              ? onStarChecklist(content._id, "All")
              : onStarNote(content._id, "All") ;
          }}
        >
          <Icon name={content.favorite ? "star" : "star-outline"} type="ionicon" color={iconColor} size={26} />
        </TouchableOpacity>
      </View>
      <View style={styles().documentTypeIconContainer}>
        <Icon name={content.items ? "checkmark": "document"} type="ionicon" color={iconColor} size={26} />
      </View>
      {
        content.secure 
          ? <View style={styles().lockIconContainer}>
              <Icon name="lock-closed" type="ionicon" color={iconColor} size={26} />
            </View>
          : null
      }
      <Label 
        text={content.title.length > 17 ? content.title.slice(0, 17) + "...": content.title} 
      /> 
    </TouchableOpacity>
  );

  const FilterBox = () => (
    <View style={styles().filterContainer}>
      <CheckBox 
        title="All"
        checked={filters.all}
        onPress={() => {
          if (filters.notes || filters.checklists) {
            setFilters({all: true, notes: false, checklists: false});
            setFilter("all");
          }
        }}
        containerStyle={styles(checkBoxbgColor, "").checkBoxContainerStyle}
        textStyle={styles("", checkBoxColor).checkBoxtextStyle}
      />
      <CheckBox 
        title="Notes"
        checked={filters.notes}
        onPress={() => {
          if (filters.all || filters.checklists) {
            setFilters({all: false, notes: true, checklists: false});
            setFilter("notes");
          }
        }}
        containerStyle={styles(checkBoxbgColor, "").checkBoxContainerStyle}
        textStyle={styles("", checkBoxColor).checkBoxtextStyle}
      />
      <CheckBox 
        title="Checklists"
        checked={filters.checklists}
        onPress={() => {
          if (filters.all || filters.notes) {
            setFilters({all: false, notes: false, checklists: true});
            setFilter("checklists");
          }
        }}
        containerStyle={styles(checkBoxbgColor, "").checkBoxContainerStyle}
        textStyle={styles("", checkBoxColor).checkBoxtextStyle}
      />
    </View>
  );

  return (
    <>
      {
        content && content.length
          ? <View style={styles().contentContainer}>
              <SearchBar 
                round
                value={search}
                onChangeText={text => setSearch(text)} 
                lightTheme={theme === "light"}
                placeholder="Search for something!"
              />
              <Spacer />
              <FilterBox />
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles().boxesContainer}>
                  {
                    content.map(c => (
                      <ContentBox content={c} key={c._id} />
                    ))
                  }
                </View>
              </ScrollView>
            </View>
          : <>
              <FilterBox />
              <View style={styles().iconContainer}>
                <Icon name="file-tray" type="ionicon" color={color} size={85} />
              </View>
            </>
      }
      <Dialog
        overlayStyle={styles(currentTheme.bgColors.secondary).dialogStyle}
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
          setPassword("");
          setError(null);
        }}
      >
        <Dialog.Title title="Password verification!"/>
            <Input 
              inputStyle={{color: currentTheme.colors.primary}}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Enter password value"
              secureTextEntry
            />
            {
              error 
                ? <Error text={error} />
                : null
            }
            {
              password
                ? <Button onPress={() => {
                  const { onContentDetail, args, contentPswrd } = lockCallback;
                  if (password === contentPswrd) onContentDetail(...args);
                  else setError("Invalid password!")
                }}>Enter</Button>
                : null
            }
      </Dialog>
    </>
  );
};

const styles = (bgColor="", color="") => (
  StyleSheet.create({
    iconContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      opacity: .3
    },
    contentContainer: {
      flex: 1,
    },
    boxContainer: {
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: "#7f8c8d",
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      width: (screenWidth*45)/100,
      height: (screenWidth*45)/100,
      padding: 10,
      backgroundColor: bgColor,
      borderRadius: 12
    },
    starIconContainer: {
      position: "absolute",
      top: 10,
      left: 5
    },
    documentTypeIconContainer: {
      position: "absolute",
      bottom: 10,
      left: 5
    },
    lockIconContainer: {
      position: "absolute",
      top: 10,
      right: 5
    },
    boxesContainer: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    filterContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    checkBoxContainerStyle: {
      backgroundColor: bgColor,
      alignSelf: "center",
      justifyContent: "center",
    },
    checkBoxtextStyle: {
      color: color, 
    },
    dialogStyle: {
      backgroundColor: bgColor,
      borderRadius: 12,
    }
  })
);
