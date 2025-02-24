import { Badge } from '@/components/ui/badge';
import { Form } from '@prisma/client'
import React from 'react'
import ListViewShareableLinkBadge from './ListViewShareableLinkBadge';

function FormListItem({forms}: {forms: Form[]}) {
  return (
    <ul className='w-full flex flex-col gap-4'>
      {
        forms.length > 0 ?
        forms.map((form: Form) => {
          const { updatedAt, id, title, description, createdAt, shareableLink, primaryColor, secondaryColor } = form;

          return (
            <li key={id} className="w-full justify-between flex items-center bg-white text-slate-800 shadow-md rounded-xl hover:cursor-pointer transition duration-300 p-4">
              {title}

              {createdAt.toString()}

              <ListViewShareableLinkBadge 
                shareableLink={shareableLink} 
              />
            </li>
          )
        }) : null
      }
    </ul>
  )
}

export default FormListItem
