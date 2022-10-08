import React from "react";

import { RegisterComponent } from "../components/register.component";

import { AuthContainer } from "../../../../components/containers/auth-container";


export function RegisterScreen({navigation}) {

  const onLogin = () => navigation.navigate("Login");

  return (
    <AuthContainer >
      <RegisterComponent
        onLogin={onLogin}
      />
    </AuthContainer>
  );
};
