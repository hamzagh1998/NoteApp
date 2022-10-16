import axios from "axios";

export async function getNotes() {
  try {
    const res = await axios.get("/note");
    return res.data;
  } catch (error) {
    console.log("Error fetching notes: " + error);
    return "Error fetching notes!";
  };
};

export async function createNote(payload) {
  try {
    const res = await axios.post("/note", {payload});
    return res.data;
  } catch (error) {
    console.log("Error creating note: " + error);
    return "Error creating note!" ;
  }
};