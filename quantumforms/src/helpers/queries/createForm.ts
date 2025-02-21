import axios from "axios";

export const createForm = async (router: any, title: string, description: string) => {
    if (!title.trim()) return alert("Form title is required!");

    const response = await axios.post("/api/forms", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    return response
};