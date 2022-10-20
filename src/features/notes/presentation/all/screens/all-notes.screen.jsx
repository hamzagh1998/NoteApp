import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";

import { AllNotesComponent } from "../components/all-notes.component";

import { getNotes, getNote, updateNote, deleteNote } from "../../../../../api/note";
import { getChecklists, getChecklist, updateChecklist, deleteChecklist } from "../../../../../api/checklist";


export function AllNotesScreen({ navigation, route }) {

  const isFocused = useIsFocused();

  const { route: { name } } = { route };

  const [notes, setNotes] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [content, setContent] = useState([]);
  const [error, setError] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);

  const getAllNotes = async () => {
    const data = await getNotes();
    if (data.error) {
      setError(data.detail);
    } else {
      name === "All"
        ? setNotes(data.detail)
        : setNotes(data.detail.filter(note => note.favorite));
    }
    
    setIsLoading(false);
  };

  const getAllChecklists = async () => {
    setIsLoading(true);
    const data = await getChecklists();
    if (data.error) {
      setError(data.detail)
    } else {
      name === "All"
        ? setChecklists(data.detail)
        : setChecklists(data.detail.filter(note => note.favorite));
    };
    setIsLoading(false);
  };

  const updateContent = () => {
    filter === "all"
      ? setContent([...notes, ...checklists].filter(c => c.title.toLowerCase().includes(search.toLowerCase())))
      : filter === "notes"
        ? setContent([...notes].filter(c => c.title.toLowerCase().includes(search.toLowerCase())))
        : setContent([...checklists].filter(c => c.title.toLowerCase().includes(search.toLowerCase())));
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
    const data = await getChecklist(checklistId);
    if (data.error) {
      setError(data.detail);
    } else {
      const { _id, favorite } = data.detail;
      data.detail.favorite = !favorite;
      const res = await updateChecklist(_id, data.detail);
      if (res.error) {
        setError(res.detail);
      } else {
        const { _id, secure, favorite } = res.detail;
        const checklist = checklists.filter(checklist => checklist._id === checklistId)[0];
        checklist.favorite = favorite;
        setChecklists(checklists);
        navigation.navigate(
          screenName, 
          {checklistId: _id, secure, favorite, onStarChecklist, onLockChecklist, onDeleteChecklist}
        );
      };
    };
  };

  const onLockChecklist = async (checklistId, password) => {
    const data = await getChecklist(checklistId);
    if (data.error) {
      setError(data.detail);
    } else {
      const { _id, secure } = data.detail;
      data.detail.secure = !secure;
      if (password) data.detail.password = password;
      else data.detail.password = "";
      const res = await updateChecklist(_id, data.detail);
      if (res.error) {
        setError(res.detail);
      } else {
        const { _id, favorite, secure } = res.detail;
        const checklist = checklists.filter(checklist => checklist._id === checklistId)[0];
        checklist.secure = secure;
        setChecklists(checklists);
        navigation.navigate(
          "DetailChecklist", 
          {checklistId: _id, secure, favorite, onStarChecklist, onLockChecklist, onDeleteChecklist}
        );
      };
    };
  };

  const onDeleteChecklist = async checklistId => {
    const data = await deleteChecklist(checklistId);
    data.error
      ? setError(data.detail)
      : navigation.navigate("All");
  };

  useEffect(() => {
    setSearch("");
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
    updateContent();
  }, [filter, notes, checklists]);

  useEffect(() => {
    updateContent();
  },[search]);

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
              name={name}
              content={content}
              search={search}
              setSearch={setSearch}
              setFilter={setFilter}
              onContentDetail={onContentDetail}
              onStarNote={onStarNote}
              onStarChecklist={onStarChecklist}
            />
      }
      { error ? Alert.alert("Error", error) : null}
    </SafeAreaContainer>
  );
};
