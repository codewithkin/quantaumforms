import React from 'react'
import QuantumForms from './QuantumForms'

function LogoPlusHeading() {
  return (
    <article className="flex gap-2 items-center justify-center w-fit p-4">
        <QuantumForms />
        <h2 className='text-xl font-semibold text-purple-600'>QuantumForms</h2>
    </article>
  )
}

export default LogoPlusHeading
