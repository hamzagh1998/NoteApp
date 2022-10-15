import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (token) setUserToken(token);
  }, [token]);

  const onRegister = () => navigation.navigate("Register");
  
  const onGoogleButtonPress = async () => {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
      if (!idToken) {
        console.log("Something went wrong obtaining access token!");
      } else {
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const credential = await auth().signInWithCredential(googleCredential);
        const { name, email, picture: photoUrl } = credential.additionalUserInfo.profile;
        const data = await signIn({ name, email, photoUrl });
        if (data.error) {
          console.log(data.detail);
        } else {
          const decoded = jwt_decode(data.detail);
          if (decoded) {
            dispatch(setUserData({userData: decoded}));
            setToken(data.detail);
            dispatch(setStoredToken({token: data.detail}));
          } else {
            console.log("error decoding tokin!");
          };
        };
        
        // Sign-in the user with the credential
        return credential // return credential to fire firebase event but you don't need to!
      };
    } catch (error) {
      console.log("error sign in with google:", error);
    };
  };

  const onFacebookButtonPress = async () => {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(["public_profile", "email"]);

      if (result.isCancelled) {
        console.log("User cancelled the login process!");
      }
      // Once signed in, get the users AccesToken
      const { accessToken } = await AccessToken.getCurrentAccessToken();
      if (!accessToken) {
        console.log("Something went wrong obtaining access token!");
      } else {
        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(accessToken);
        const credential = await auth().signInWithCredential(facebookCredential);
        const { displayName: name, email, photoURL: photoUrl } = credential.user;
        const data = await signIn({ name, email, photoUrl });
        if (data.error) {
          console.log(data.detail);
        } else {
          const decoded = jwt_decode(data.detail);
          if (decoded) {
            dispatch(setUserData({userData: decoded}));
            setToken(data.detail);
            dispatch(setStoredToken({token: data.detail}));
          } else {
            console.log("error decoding tokin!");
          };
        };
        // Sign-in the user with the credential
        return credential; // return credential to fire firebase event but you don't need to!
      };
    } catch (error) {
      console.log("error sign in with facebook", error);
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
