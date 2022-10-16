import React from "react";
import { Dimensions, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Icon } from "@rneui/base";
import { SearchBar } from "@rneui/themed";

import { Spacer } from "../../../../../components/spacer/spacer";
import { Label, Body } from "../../../../../components/typography/text";


const screenWidth = Dimensions.get("window").width;

export function AllNotesComponent({ notes, checklists, search, setSearch }) {

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const theme = useSelector(state => state.theme.mode);
  const iconColor = currentTheme.colors.primary;
  const color = currentTheme.colors.trinary;
  const bgColor = currentTheme.bgColors.trinary;

  const ContentBox = () => (
    <View style={styles(bgColor).boxContainer}>
      <View style={styles().starIconContainer}>
        <TouchableOpacity>
          <Icon name="star-outline" type="ionicon" color={iconColor} size={26} />
        </TouchableOpacity>
      </View>
      <View style={styles().documentTypeIconContainer}>
        <Icon name="document" type="ionicon" color={iconColor} size={26} />
      </View>
      <Label text="Hello, Note!" /> 
    </View>
  );

  return (
    <>
      {
        notes.length
          ? <View style={styles().contentContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <SearchBar 
                  round
                  value={search}
                  onChangeText={text => setSearch(text)} 
                  lightTheme={theme === "light"}
                  placeholder="Search for something!"
                />
                  <Spacer />
                <View style={styles().boxesContainer}>
                  <ContentBox />
                  <Spacer position="right"/>
                  <ContentBox />
                </View>
              </ScrollView>
            </View>
          : <View style={styles().iconContainer}>
              <Icon name="file-tray" type="ionicon" color={color} size={85} />
            </View>
      }
    </>
  );
};

const styles = (bgColor="") => (
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
      justifyContent: "center",
      alignItems: "center",
      width: (screenWidth*47)/100,
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
    boxesContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);
