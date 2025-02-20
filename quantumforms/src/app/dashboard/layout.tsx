import Topbar from '@/components/shared/dashboard/Topbar'
import React, { ReactNode } from 'react'

function layout({children}: {children: ReactNode}) {
  return (
    <Topbar />
  )
}

export default layout
