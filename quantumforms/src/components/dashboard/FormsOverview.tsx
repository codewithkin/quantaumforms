import React from 'react'
import { Button } from '../ui/button'

function FormsOverview() {
  return (
    <article className="w-full flex py-8 justify-between items-center">
        <h2 className="text-2xl font-semibold">My Forms</h2>

        {/* Form filters */}
        <article className="flex gap-4 items-centerjustify-center">
            <Button variant="default" color="primary">
                Most Reponses
            </Button>
            <Button variant="outline" color="primary">
                Date
            </Button>
            <Button variant="outline" color="primary">
                Date
            </Button>
            <Button variant="outline" color="primary">
                AI Created
            </Button>
            <Button variant="outline" color="primary">
                Manual Forms
            </Button>
        </article>
    </article>
  )
}

export default FormsOverview
