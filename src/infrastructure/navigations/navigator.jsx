import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { setStoredTheme } from "../../store/theme.slice";
import { useAsyncStorage } from "../../hooks/use-async-storage";

import { AuthNavigator } from "./auth.navigator";
import { MainNavigator } from "./main.navigator";

import { SpinnerIndicator } from "../../components/activity-indicator/spinner-indicator";

export function Navigator() {

  const token = useSelector(state => state.token.value);
  const dispatch = useDispatch();
  
  const [theme, _] = useAsyncStorage("@theme", "light");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setStoredTheme({theme}));
    setLoading(false);
  }, [theme]);

  return (
    <NavigationContainer>
      {
        loading 
          ? <SpinnerIndicator />
          : token 
            ? <MainNavigator />
            : <AuthNavigator />
      }
    </NavigationContainer>
  );
};