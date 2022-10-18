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

export async function getNote(noteId) {
  try {
    const res = await axios.get("/note/" + noteId);
    return res.data;
  } catch (error) {
    console.log("Error fetching note: " + error);
    return "Error fetching note!";
  };
};

export async function createNote(payload) {
  try {
    const res = await axios.post("/note", { payload });
    return res.data;
  } catch (error) {
    console.log("Error creating note: " + error);
    return "Error creating note!";
  };
};

export async function updateNote(noteId, payload) {
  try {
    const res = await axios.put("/note/" + noteId, { payload });
    return res.data;
  } catch (error) {
    console.log("Error updating note: " + error);
    return "Error updating note!";
  };
};

export async function deleteNote(noteId) {
  try {
    const res = await axios.delete("/note/" + noteId);
    return res.data;
  } catch (error) {
    console.log("Error updating note: " + error);
    return "Error updating note!";
  };
};