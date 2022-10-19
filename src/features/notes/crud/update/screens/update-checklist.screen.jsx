import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getChecklist, updateChecklist } from "../../../../../api/checklist";

import { UpdateChecklistComponent } from "../components/update-checklist.component";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";


export function UpdateChecklistScreen({ navigation, route }) {

  const isFocused = useIsFocused();

  const { checklistData } = route.params;
  const { checklistId } = checklistData;

  const [checklist, setChecklist] = useState({title: "", items: ""});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getChecklistDetail = async () => {
    const data = await getChecklist(checklistId);
    data.error  
      ? setError(data.detail)
      : setChecklist(data.detail);
      
    setIsLoading(false);
  };

  const onUpdate = async () => {
    const data = await updateChecklist(checklistId, checklist);
    data.error
      ? setError(data.detail)
      : navigation.navigate("Notes", { screen: "DetailChecklist", params: { ...checklistData } });
  };

  useEffect(() => {
    getChecklistDetail();
  } ,[isFocused]);

  return (
    <SafeAreaContainer>
      {
        isLoading
          ? <SpinnerIndicator />
          : <UpdateChecklistComponent 
              checklist={checklist}
              setChecklist={setChecklist}
              onUpdate={onUpdate}
            />
      }
    </SafeAreaContainer>
  );
};