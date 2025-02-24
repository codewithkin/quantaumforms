import { Badge } from '@/components/ui/badge'
import { Form } from '@prisma/client'
import React, { useState } from 'react'

function ListViewShareableLinkBadge({shareableLink}: {shareableLink: Form["shareableLink"]}) {
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <Badge variant={copied ? "outline" : "default"}>{shareableLink?.slice(0, 10)}</Badge>
  )
}

export default ListViewShareableLinkBadge
