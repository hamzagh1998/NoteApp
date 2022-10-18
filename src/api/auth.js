import axios from "axios";

export async function signIn(token, payload) {
  const headers = {Authorization: "Bearer " + token};

  try {
    const res = await axios.post("/auth/signin", payload, {headers});
    return res.data;
  } catch (error) {
    console.log("Error signIn: " + error);
    return "Error signIn!" ;
  };
};