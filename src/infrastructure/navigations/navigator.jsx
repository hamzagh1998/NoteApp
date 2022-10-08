import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { setStoredTheme } from "../../store/theme.slice";
import { setStoredToken } from "../../store/token.slice";

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

  useEffect(() => {
    if (userToken) dispatch(setStoredToken({token: userToken, isLoading: false}));
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