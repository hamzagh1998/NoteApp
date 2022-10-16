import axios from "axios";

export async function signIn(payload) {
  try {
    const res = await axios.post("/auth/signin", payload);
    return res.data;
  } catch (error) {
    console.log("Error signIn: " + error);
    return "Error signIn!" ;
  };
};