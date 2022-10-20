import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { getNote } from "../../../../../api/note";

import { NoteDetailComponent } from "../components/note-detail.component";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";


export function NoteDetailScreen({ navigation, route }) {
  
  const { noteId } = route.params;

  const isFocused = useIsFocused();

  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNoteDetail = async () => {
    const data = await getNote(noteId);
    data.error 
      ? setError(data.detail) 
      : setNote(data.detail);
    setIsLoading(false);
  };

  useEffect(() => {
    getNoteDetail();
  }, [isFocused]);

  
  return (
    <SafeAreaContainer>
      {
        isLoading
          ? <SpinnerIndicator />
          : <NoteDetailComponent note={note} />
      }
      { error ? Alert.alert("Error", error) : null}
    </SafeAreaContainer>
  );
};