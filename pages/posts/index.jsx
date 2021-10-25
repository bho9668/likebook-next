import React from 'react';
import PostCard from '../../components/PostCard'
import { Typography } from 'antd';

const { Title } = Typography;

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Posts = () => {
  const { data: postsData, error: postsError } = useSWR('/api/posts', fetcher);

  if (postsError) return "An error (posts) has occurred.";
  if (!postsData) return "Loading Posts...";
  console.log(postsData);
  return (
    <>
      <Title>Post Timeline</Title>
      {postsData?.data.map(post => {
        return (
          <PostCard key={post._id} post={post} />
        )
      })}
    </>
  )
}

export default Posts
