import React from 'react';
import { Card } from 'antd';
import Link from 'next/link'

const UserCard = ({ user }) => {
  return (
    <>
    <Link href={`/users/${user._id}`}>
    <a>
      <Card hoverable title={user.firstName + ' ' + user.lastName}>
        <img src={user.avatar} />
      </Card>
    </a>
    </Link>
    </>
  )
}

export default UserCard
