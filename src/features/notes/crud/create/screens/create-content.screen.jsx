import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Tab, TabView } from "@rneui/themed";

import { createNote } from "../../../../../api/note";
import { createChecklist } from "../../../../../api/checklist";

import { CreateNoteComponent } from "../components/create-note.component";
import { CreateCheckListComponent } from "../components/create-checklist.component";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";


export function CreateContentScreen({ navigation }) {

  const isFocused = useIsFocused();

  const { id } = useSelector(state => state.user.value);
  const currentTheme = useSelector(state => state.theme.currentTheme);
  const color = currentTheme.colors.primary;
  const indicator = currentTheme.colors.secondary;
  const bgColor = currentTheme.bgColors.primary;

  const [note, setNote] = useState({title: "", content: ""});
  const [checklist, setChecklist] = useState({title: "", items: []});
  const [value, setValue] = useState(0);

  const onSaveNote = async () => {
    const data = await createNote({...note, owner: id});
    data.error
      ? console.log(data.detail)
      : navigation.navigate("Notes", {screen: "All"});
  };

  const onSaveChecklist = async () => {
    const data = await createChecklist({...checklist, owner: id});
    data.error
      ? console.log(data.detail)
      : navigation.navigate("Notes", {screen: "All"});
  };

  const reset = () => {
    setNote({title: "", content: ""});
    setChecklist({title: "", items: []});
  };

  useEffect(() => {
    reset();
  }, [isFocused]);

  return (
    <SafeAreaContainer>
      <Tab 
        value={value} 
        onChange={(value => value === 0 ? setValue(0) : setValue(1))}
        indicatorStyle={{backgroundColor: indicator}}
      >
        <Tab.Item 
          title="Note" 
          titleStyle={{color: color}}
          containerStyle={{backgroundColor: bgColor}}
          icon={{ name: "document", type: "ionicon", color: color}}
        >
        </Tab.Item>
        <Tab.Item 
          title="Checklist"
          titleStyle={{color: color}}
          containerStyle={{backgroundColor: bgColor}}
          icon={{ name: "checkmark", type: "ionicon", color: color}}
        ></Tab.Item>
      </Tab>
      <TabView value={value} onChange={() => value === 0 ? setValue(1) : setValue(0)}>
        <TabView.Item width="100%">
          <CreateNoteComponent
            note={note}  
            setNote={setNote}
            onSaveNote={onSaveNote}
          />
        </TabView.Item>
        <TabView.Item width="100%">
          <CreateCheckListComponent 
            checklist={checklist}
            setChecklist={setChecklist}
            onSaveChecklist={onSaveChecklist}
          />
        </TabView.Item>
      </TabView>
    </SafeAreaContainer>
  );
};