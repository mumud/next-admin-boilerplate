'use client'

import { useEffect, useState } from 'react'
import { CreateUserModal } from '@/components/modals/create-user'

export default function ModalPropider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <CreateUserModal />
    </>
  )
}
