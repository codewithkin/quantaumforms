import axios from "axios";

export const createForm = async (
  router: any,
  title: string,
  description: string,
) => {
  try {
    if (!title.trim()) return alert("Form title is required!");

    const response = await axios.post("/api/forms", {
      title,
      description,
    });

    return response;
  } catch (e) {
    console.log("An error occured inside createForm: ", e);
  }
};
