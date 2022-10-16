import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setStoredTheme } from "../../store/theme.slice";
import { setStoredToken } from "../../store/token.slice";
import { setUserData } from "../../store/user.slice"; 

import { useAsyncStorage } from "../../hooks/use-async-storage";

import { AuthNavigator } from "./auth.navigator";
import { MainNavigator } from "./main.navigator";

import { SpinnerIndicator } from "../../components/activity-indicator/spinner-indicator";

export function Navigator() {

  const token = useSelector(state => state.token.value);
  const isLoading = useSelector(state => state.token.isLoading);
  const dispatch = useDispatch();
  
  const [theme, _] = useAsyncStorage("@theme", "light");
  const [userToken, __] = useAsyncStorage("@token");

  axios.defaults.baseURL = "http://192.168.1.20:4000/api";
  if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  useEffect(() => {
    if (userToken) {
      const decoded = jwt_decode(userToken);
      dispatch(setUserData({userData: decoded}));
      dispatch(setStoredToken({token: userToken, isLoading: false}));
    }
    else dispatch(setStoredToken({token: null, isLoading: false}));
  }, [userToken]);

  useEffect(() => {
    dispatch(setStoredTheme({theme}));
  }, [theme]);

  return (
    <NavigationContainer>
      {
        isLoading 
          ? <SpinnerIndicator />
          : token 
            ? <MainNavigator />
            : <AuthNavigator />
      }
    </NavigationContainer>
  );
};