import React from 'react'
import { useRouter } from 'next/router'

const User = () => {
  const router = useRouter()
  return (
    <div>
      AHHHH
      {router.query.userId}
    </div>
  )
}

export default User
