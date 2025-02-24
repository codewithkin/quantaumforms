import { Form } from '@prisma/client';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

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
    <article className="w-full" style={{ height: 500 }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
        />
    </article>
  )
}

export default FormsTable
