import axios from "axios";

export async function addNewField ({ 
    formId, 
    type, 
    label, 
    placeholder, 
    required, 
    options }: { 
        formId: 
        string, type: PerformanceServerTiming, 
        label: string, 
        placeholder: string, 
        required: boolean, 
        options: any[] 
    }) {
    
    try {
        const res = await axios.patch(`/api/forms\${formId}`, {formId, type, label, placeholder, required, options});

        return res.data;
    } catch (e) {
        console.log("An error occured while creating form :", e);
    }
}