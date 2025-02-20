import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar } from '@heroui/avatar'
import React from 'react'

function Topbar() {
  return (
    <article className="p-4 border-b border-white flex w-full justify-between items-center">
        {/* Avatar and Search Input */}
        <article className="flex gap-4 items-center">
            <Avatar
                size="sm"
                color="primary"
            />

            <Input
                placeholder="Search for a form..."
                color="primary"
                className='max-w-[400px'
            />
        </article>

        {/* Create new form btn */}
        <article>
            <Button variant="ghost" color="primary" className="btn btn-primary">Create New Form</Button>
        </article>
    </article>
  )
}

export default Topbar
