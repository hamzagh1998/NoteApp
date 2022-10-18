import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Icon } from "@rneui/base";
import { useSelector } from "react-redux";

import { Title, Label } from "../../../../../components/typography/text";
import { Spacer } from "../../../../../components/spacer/spacer";

export function CheckDetailComponent({checklist}) {

  const { title, items } = checklist;

  const currentTheme = useSelector(state => state.theme.currentTheme);
  const color = currentTheme.colors.primary;

  return (
    <View style={styles().container}>
      {
        checklist
          ? <ScrollView showsVerticalScrollIndicator={false}>
              <Title text={title} />
              <Spacer size="large" />
              <View style={styles(color).hr} />
              <Spacer size="large" />
              {
                items.map(item => (
                  <View key={item.id}>
                    <View style={styles().rowContainer}>
                      {
                        item.checked
                          ? <Icon name="checkmark" type="ionicon" size={26} color="#0f0" />
                          : <Icon name="dots-three-horizontal" type="entypo" size={26} color="#7f8c8d" />
                      }
                      <Spacer position="left" />
                      <Label text={item.title} />
                    </View>
                    <Spacer size="xxl" />
                  </View>
                ))
              }
            </ScrollView>
          : null
      }
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
    },
    rowContainer: {
      flexDirection: "row",
    }
}));