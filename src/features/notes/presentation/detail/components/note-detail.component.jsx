import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import { useSelector } from "react-redux";

import { Title, Body } from "../../../../../components/typography/text";
import { Spacer } from "../../../../../components/spacer/spacer";


export function NoteDetailComponent({ note }) {

  const { title, content } = note;

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const color = currentTheme.colors.primary;

  return (
    <View style={styles().container}>
      <Title text={title} />
      <Spacer size="large" />
      <View style={styles(color).hr} />
      <Spacer size="large" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <Body text={content} />
        <Spacer position="bot" size="xxl" />
        <Spacer position="bot" size="xxl" />
        <Spacer position="bot" size="xxl" />
        <Spacer position="bot" size="xxl" />
      </ScrollView>
    </View>
  );
};

const styles = (color="") => (
  StyleSheet.create({
    container: {
      padding: 8
    },
    hr: {
      width: "100%",
      height: 2,
      backgroundColor: color
    }
}));