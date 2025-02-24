import { Form } from '@prisma/client';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

function FormsTable({forms}: {forms: Form[]}) {
    const [rowData, setRowData] = useState<Form[]>(forms);

    const [colDefs, setColDefs] = useState([
        {
            field: "title"
        },
        {
            field: "createdAt"
        },
        {
            field : "shareableLink"
        }
    ])

  return (
    
  )
}

export default FormsTable
