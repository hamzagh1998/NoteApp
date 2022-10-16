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

export async function createChecklist(payload) {
  try {
    const res = await axios.post("/checklist", {payload});
    return res.data;
  } catch (error) {
    console.log("Error creating checklist: " + error);
    return "Error creating checklist!" ;
  }
};