export const createForm = async (router: any, title: string, description: string) => {
    if (!title.trim()) return alert("Form title is required!");

    const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        const newForm = await response.json();
        router.push(`/forms/${newForm.id}`); // Redirect to form edit page
    } else {
        alert("Failed to create form");
    }
};