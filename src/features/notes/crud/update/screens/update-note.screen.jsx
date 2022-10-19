import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getNote, updateNote } from "../../../../../api/note";

import { UpdateNoteComponent } from "../components/update-note.component";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";

export function UpdateNoteScreen({ navigation, route }) {

  const isFocused = useIsFocused();

  const { noteData } = route.params;
  const { noteId } = noteData;

  const [note, setNote] = useState({title: "", content: ""});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNoteDetail = async () => {
    const data = await getNote(noteId);
    data.error  
      ? setError(data.detail)
      : setNote(data.detail);
      
    setIsLoading(false);
  };

  const onUpdate = async () => {
    const data = await updateNote(noteId, note);
    data.error
      ? setError(data.detail)
      : navigation.navigate("Notes", { screen: "DetailNote", params: { ...noteData } });
  };

  useEffect(() => {
    getNoteDetail();
  } ,[isFocused]);

  return (
    <SafeAreaContainer>
      {
        isLoading
          ? <SpinnerIndicator />
          : <UpdateNoteComponent 
              note={note}
              setNote={setNote}
              onUpdate={onUpdate}
            />
      }
    </SafeAreaContainer>
  );
};