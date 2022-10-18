import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getChecklist } from "../../../../../api/checklist";

import { CheckDetailComponent } from "../components/checklist-detail.component";

import { SafeAreaContainer } from "../../../../../components/containers/safe-area-container";
import { SpinnerIndicator } from "../../../../../components/activity-indicator/spinner-indicator";


export function ChecklistDetailScreen({ navigation, route }) {

  const { checklistId } = route.params;

  const isFocused = useIsFocused();

  const [checklist, setChecklist] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getNoteDetail = async () => {
    const data = await getChecklist(checklistId);
    data.error 
      ? setError(data.detail) 
      : setChecklist(data.detail);
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
          : <CheckDetailComponent checklist={checklist} />
      }
    </SafeAreaContainer>
  );
};