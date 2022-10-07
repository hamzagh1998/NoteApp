import React from "react";

import { Title, Label, Body, Tiny,Error } from "../../../../../components/typography/text"
import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";

export function AllNotesScreen() {

  return (
    <SafeAreaContainer>
      <Title text="All notes!" />
      <Label text="All notes!" />
      <Body text="All notes!" />
      <Tiny text="All notes!" />
      <Error text="All notes!" />
    </SafeAreaContainer>
  );
};
