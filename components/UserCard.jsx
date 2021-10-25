import React from 'react';
import { Card, Button } from 'antd';
import Link from 'next/link';
import Image from 'next/image'; // TODO use next/image, problem with authorized domain
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

const UserCard = ({ user }) => {
  return (
    <>
      <Card hoverable title={user.firstName + ' ' + user.lastName} extra={<Button><UserAddOutlined /></Button>} actions={[
        <UserOutlined key="profile" />,
        <UserAddOutlined key="friendRequest" />,
      ]}>
        <img src={user.avatar} alt='User Avatar' />
        <Link href={`/users/${user._id}`}><a>Profile</a></Link>
      </Card>
    </>
  )
}

export default UserCard
