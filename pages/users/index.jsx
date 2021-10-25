import React from 'react';
import UserCard from '../../components/UserCard';
import { Typography, Row, Col } from 'antd';
import useSWR from 'swr';
import useUser from '../../lib/useUser'

const { Title } = Typography;

const fetcher = (url) => fetch(url).then((res) => res.json());

const Users = () => {
  const { data: usersData, error: usersError } = useSWR("/api/users", fetcher);

  const { user } = useUser({ redirectTo: '/auth/login' })

  if (!user || user.isLoggedIn === false) {
    return 'User Auth Loading...'
  }

  if (usersError) return "An error has occurred.";
  if (!usersData) return "Loading...";

  return (
    <div>
      <Title>Users</Title>
      <Row gutter={[32, 32]}>
          {usersData?.data.users.map(user => {
            return (
              <Col key={user._id} xs={24} sm={12} lg={6}>
                <UserCard user={user} />
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default Users;