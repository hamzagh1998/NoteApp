import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";

import { AllNotesComponent } from "../components/all-notes.component";

import { getNotes, updateNote, deleteNote } from "../../../../../api/note";
import { getNote } from "../../../../../api/note";
import { getChecklists } from "../../../../../api/checklist";


export function AllNotesScreen({ navigation }) {

  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [content, setContent] = useState([]);
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

  const onStarNote = async (noteId, screenName) => {
    const data = await getNote(noteId);
    if (data.error) {
      setError(data.detail);
    } else {
      const { _id, favorite } = data.detail;
      data.detail.favorite = !favorite;
      const res = await updateNote(_id, data.detail);
      if (res.error) {
        setError(res.detail);
      } else {
        const { _id, secure, favorite } = res.detail;
        const note = notes.filter(note => note._id === noteId)[0];
        note.favorite = favorite;
        setNotes(notes);
        navigation.navigate(
          screenName, 
          {noteId: _id, secure, favorite, onStarNote, onLockNote, onDeleteNote}
        );
      };
    };
  };

  const onLockNote = async (noteId, password) => {
    const data = await getNote(noteId);
    if (data.error) {
      setError(data.detail);
    } else {
      const { _id, secure } = data.detail;
      data.detail.secure = !secure;
      if (password) data.detail.password = password;
      else data.detail.password = "";
      const res = await updateNote(_id, data.detail);
      if (res.error) {
        setError(res.detail);
      } else {
        const { _id, favorite, secure } = res.detail;
        const note = notes.filter(note => note._id === noteId)[0];
        note.secure = secure;
        setNotes(notes);
        navigation.navigate(
          "DetailNote", 
          {noteId: _id, secure, favorite, onStarNote, onLockNote, onDeleteNote}
        );
      };
    };
  };

  const onDeleteNote = async noteId => {
    const data = await deleteNote(noteId);
    data.error
      ? setError(data.detail)
      : navigation.navigate("All");
  };
  // checklist
  const onStarChecklist = async (checklistId, screenName) => {

  };

  const onLockChecklist = async checklistId => {

  };

  const onDeleteChecklist = async checklistId => {

  };

  useEffect(() => {
    setFilter("all");
    getAllNotes();
    getAllChecklists();
  }, [isFocused]);

  useEffect(() => {
    filter === "all" 
      ? setContent([...notes, ...checklists])
      : filter === "notes"
        ? setContent([...notes])
        : setContent([...checklists]);
  }, [filter, notes, checklists]);

  const onContentDetail = (contentId, type, secure, favorite) => {
    type === "note"
      ? navigation.navigate(
          "DetailNote", 
          {noteId: contentId, secure, favorite, onStarNote, onLockNote, onDeleteNote}
        )
      : navigation.navigate(
          "DetailChecklist", 
          {checklistId: contentId, secure, favorite, onStarChecklist, onLockChecklist, onDeleteChecklist}
        );
  };


  return (
    <SafeAreaContainer>
      {
        isLoading
          ? <SpinnerIndicator />
          : <AllNotesComponent 
              content={content}
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
              onContentDetail={onContentDetail}
              onStarNote={onStarNote}
              onStarChecklist={onStarChecklist}
            />
      }
    </SafeAreaContainer>
  );
};
