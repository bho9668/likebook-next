import React from 'react';
import { Layout, Menu, Breadcrumb, Card, Typography } from 'antd';

const { Title } = Typography;

const Me = ({ me }) => {
  console.log(me)
  return (
    <div>
      <Title>My Profile</Title>
      <p>{me.firstName + ' ' + me.lastName}</p>
    </div>
  )
}

export default Me
