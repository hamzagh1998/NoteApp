import React, { useState } from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { Card, Button, Icon } from "@rneui/themed";

import { Title } from "../typography/text";
import { Spacer } from "../spacer/spacer";

const width = Dimensions.get("window").width;

export function AuthCard({title, onGoogleButtonPress, onFacebookButtonPress, children}) {

  const [isLoadingG, setIsLoadingG] = useState(false);
  const [isLoadingF, setIsLoadingF] = useState(false);

  return (
      <Card>
        <View style={style.cardContainer}>
          <Image 
            source={require("../../assets/notes.png")}
            style={{width: 150, height: 150}}
            width={150}
            height={150}
          />
          <Text style={style.textStyle}>NoteApp</Text>
         <Title text={title} />
        </View>
        <Spacer position="top" size="large" />
        <View style={style.divider} />
        <Spacer size="large" />
        <View style={style.cardContainer}>
          <Button 
            onPress={async () => {
              setIsLoadingG(true);
              await onGoogleButtonPress();
              setIsLoadingG(false);
            }}
            buttonStyle={{...style.buttonStyle, backgroundColor: "#ea4335"}} 
            size="lg"
            loading={isLoadingG}
          >
            <Spacer position="right">
              <Icon name="logo-google" type="ionicon" color="#fff" />
            </Spacer>
            {title} with Google
          </Button>
          <Spacer />
          <Button 
            onPress={async () => {
              setIsLoadingF(true);
              await onFacebookButtonPress();
              setIsLoadingF(false);
            }}
            buttonStyle={{...style.buttonStyle, backgroundColor: "#3b5998"}} 
            loading={isLoadingF}
            size="lg"
          >
            <Spacer position="right">
              <Icon name="logo-facebook" type="ionicon" color="#fff" />
            </Spacer>
            {title} with Facebook
          </Button>
          <Spacer />
          {children}
        </View>
      </Card>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 20, 
    fontWeight: "800", 
    color: "#ff6f00"
  },
  buttonStyle: {
    padding: 10,
    height: 55,
    width: (width*75)/100,
    borderRadius: 12.5,
  },
  divider: {
    height: 1,
    width: (width*75)/100,
    alignSelf: "center",
    backgroundColor: "#000"
  }
})
