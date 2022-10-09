import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
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
      if (idToken) {
        setToken(idToken);
        dispatch(setStoredToken({token: idToken}));
      } else {
        console.log("Something went wrong obtaining access token");
      };
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error sign in with google:", error.message);
    };
  };

  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        console.log("User cancelled the login process");
      }

      // Once signed in, get the users AccesToken
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (accessToken) {
        setToken(accessToken);
        dispatch(setStoredToken({token: accessToken}));
      } else {
        console.log("Something went wrong obtaining access token");
      };

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);
      const credential = await auth().signInWithCredential(facebookCredential);

      // Sign-in the user with the credential
      return credential;
    } catch (error) {
      console.log("error sign in with facebook", error.message);
    };
  };

  return (
    <AuthContainer >
      <LoginComponent
        onRegister={onRegister}
        onGoogleButtonPress={onGoogleButtonPress}
        onFacebookButtonPress={onFacebookButtonPress}
      />
    </AuthContainer>
  );
};
