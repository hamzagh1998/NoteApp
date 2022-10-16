import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";

import { AllNotesComponent } from "../components/all-notes.component";

import { getNotes } from "../../../../../api/note";
import { getChecklists } from "../../../../../api/checklist";


export function AllNotesScreen() {

  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const getAllNotes = async () => {
    const data = await getNotes();
    data.error ? setError(data.detail) : setNotes(data.detail);
    setIsLoading(false);
  };

  const getAllChecklists = async () => {
    setIsLoading(true);
    const data = await getChecklists();
    data.error ? setError(data.detail) : setChecklists(data.detail);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllNotes();
    getAllChecklists();
  }, [isFocused]);

  return (
    <SafeAreaContainer>
      {
        isLoading
          ? <SpinnerIndicator />
          : <AllNotesComponent 
              notes={notes} 
              checklists={checklists}
              search={search}
              setSearch={setSearch}
            />
      }
    </SafeAreaContainer>
  );
};
