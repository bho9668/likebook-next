import React from 'react'
import { Card } from 'antd'
import { CommentOutlined, LikeOutlined } from '@ant-design/icons';
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const PostCard = ({ post }) => {

  const { data: commentsData } = useSWR(`/api/posts/${post._id}/comments`, fetcher);
  console.log(commentsData)

  return (
    <>
      <Card title={post.author} actions={[
        <CommentOutlined key="comment" />,
        <LikeOutlined key="like" />,
      ]}>
        <p>{post.textContent}</p>
      </Card>
    </>
  )
}

export default PostCard
