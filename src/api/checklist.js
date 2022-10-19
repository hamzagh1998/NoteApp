import axios from "axios";

export async function getChecklists() {
  try {
    const res = await axios.get("/checklist");
    return res.data;
  } catch (error) {
    console.log("Error fetching checklists: " + error);
    return "Error fetching checklists!";
  };
};

export async function getChecklist(checklistId) {
  try {
    const res = await axios.get("/checklist/" + checklistId);
    return res.data;
  } catch (error) {
    console.log("Error fetching checklist: " + error);
    return "Error fetching checklist!";
  };
};

export async function createChecklist(payload) {
  try {
    const res = await axios.post("/checklist", { payload });
    return res.data;
  } catch (error) {
    console.log("Error creating checklist: " + error);
    return "Error creating checklist!" ;
  };
};

export async function updateChecklist(checklistId, payload) {
  try {
    const res = await axios.put("/checklist/" + checklistId, { payload });
    return res.data;
  } catch (error) {
    console.log("Error updating checklist: " + error);
    return "Error updating checklist!";
  };
};

export async function deleteChecklist(checklistId) {
  try {
    const res = await axios.delete("/checklist/" + checklistId);
    return res.data;
  } catch (error) {
    console.log("Error updating checklist: " + error);
    return "Error updating checklist!";
  };
};