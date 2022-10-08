import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useDispatch } from "react-redux";

import { setStoredToken } from "../../../../store/token.slice";

import { LoginComponent } from "../components/login.component";

import { AuthContainer } from "../../../../components/containers/auth-container";

import { useAsyncStorage } from "../../../../hooks/use-async-storage";


export function LoginScreen({navigation}) {

  const dispatch = useDispatch();
  const [_, setUserToken] = useAsyncStorage("@token");
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) setUserToken(token);
  }, [token]);

  const onRegister = () => navigation.navigate("Register");
  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      setToken(idToken);
      // setToken(idToken);
      dispatch(setStoredToken({token: idToken}));
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error:", error.message);
    };
  };

  return (
    <AuthContainer >
      <LoginComponent
        onRegister={onRegister}
        onGoogleButtonPress={onGoogleButtonPress}
      />
    </AuthContainer>
  );
};
