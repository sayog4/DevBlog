import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import Blog from '../components/Blog'
import { MY_BLOG_POSTS } from '../graphql/query'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { isLoggedIn } from '../lib/auth'

const myposts = () => {
  const router = useRouter()
  useEffect(() => {
    !isLoggedIn && router.push('/')
  })
  const { data, error, loading } = useQuery(MY_BLOG_POSTS)

  if (loading) return <Loader />
  if (error) return <Message variant="danger">{error.message}</Message>
  return (
    <React.Fragment>
      <Meta title={`${data.myBlogPosts[0].author.name}'s Post | DevBlog`} />
      {data &&
        data.myBlogPosts &&
        data.myBlogPosts.map(blog => (
          <Blog myPosts={true} key={blog.id} blog={blog} />
        ))}
    </React.Fragment>
  )
}

export default myposts
