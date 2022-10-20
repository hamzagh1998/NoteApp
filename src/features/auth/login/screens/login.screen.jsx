import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import jwt_decode from "jwt-decode";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { useDispatch } from "react-redux";

import { setStoredToken } from "../../../../store/token.slice";
import { setUserData } from "../../../../store/user.slice";

import { LoginComponent } from "../components/login.component";

import { AuthContainer } from "../../../../components/containers/auth-container";

import { useAsyncStorage } from "../../../../hooks/use-async-storage";

import { signIn } from "../../../../api/auth";


export function LoginScreen({navigation}) {

  const dispatch = useDispatch();
  const [_, setUserToken] = useAsyncStorage("@token");

  const [token, setToken] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    if (token) setUserToken(token);
  }, [token]);
  
  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      if (!idToken) {
        setError("Something went wrong obtaining access token!");
        console.log("Something went wrong obtaining access token!");
      } else {
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const credential = await auth().signInWithCredential(googleCredential);
        // we"ll send this token to our backend via HTTPS
        const token = await auth().currentUser.getIdToken(true);
        const { name, email, picture: photoUrl } = credential.additionalUserInfo.profile;
        const data = await signIn(token, { name, email, photoUrl });
        if (data.error) {
          setError(data.error);
          console.log(data.detail);
        } else {
          const decoded = jwt_decode(data.detail);
          if (decoded) {
            dispatch(setUserData({userData: decoded}));
            setToken(data.detail);
            dispatch(setStoredToken({token: data.detail}));
          } else {
            setError("error decoding token!");
            console.log("error decoding token!");
          };
        };
        
        // Sign-in the user with the credential
        return credential // return credential to fire firebase event but you don't need to!
      };
    } catch (error) {
      setError("error sign in with google!");
      console.log("error sign in with google:", error);
    };
  };

  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        setError("User cancelled the login process!")
        console.log("User cancelled the login process!");
      }
      // Once signed in, get the users AccesToken
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        setError("Something went wrong obtaining access token!")
        console.log("Something went wrong obtaining access token!");
      } else {
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);
        const credential = await auth().signInWithCredential(facebookCredential);
        // we"ll send this token to our backend via HTTPS
        const token = await auth().currentUser.getIdToken(true);
        const { displayName: name, email, photoURL: photoUrl } = credential.user;
        const data = await signIn(token, { name, email, photoUrl });
        if (data.error) {
          setError(data.error);
          console.log(data.detail);
        } else {
          const decoded = jwt_decode(data.detail);
          if (decoded) {
            dispatch(setUserData({userData: decoded}));
            setToken(data.detail);
            dispatch(setStoredToken({token: data.detail}));
          } else {
            setError("error decoding token!");
            console.log("error decoding token!");
          };
        };
        // Sign-in the user with the credential
        return credential; // return credential to fire firebase event but you don't need to!
      };
    } catch (error) {
      setError("error sign in with facebook!");
      console.log("error sign in with facebook", error);
    };

  };

  return (
    <>
      <AuthContainer >
        <LoginComponent
          onGoogleButtonPress={onGoogleButtonPress}
          onFacebookButtonPress={onFacebookButtonPress}
        />
      </AuthContainer>
      { error ? Alert.alert("Error", error) : null}
    </>
  );
};
