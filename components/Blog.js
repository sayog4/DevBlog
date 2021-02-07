import React from 'react'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import Image from 'next/image'
import renderHtml from 'react-render-html'
import { Card, Row, Col, Button } from 'react-bootstrap'
import moment from 'moment'

import { DELETE_BLOG_POST } from '../graphql/mutation'
import { MY_BLOG_POSTS } from '../graphql/query'
import Message from './Message'

const Blog = ({ blog, myPosts = false }) => {
  const [delteteBlogPost, { error, loading }] = useMutation(DELETE_BLOG_POST, {
    refetchQueries: [{ query: MY_BLOG_POSTS }]
  })

  const deletePost = async () => {
    if (window.confirm('Are you sure to DELETE this Post??')) {
      await delteteBlogPost({ variables: { id: blog.id } })
    }
  }

  return (
    <Card className="my-3 p-2">
      <Card.Title as="h2" className="text-center display-5">
        <Link href={`/${blog.slug}`}>{blog.title}</Link>
      </Card.Title>
      <p className="lead justify">
        Written By: {blog.author.name} | Published On:{' '}
        {moment(blog.createdAt).fromNow()}
      </p>
      <Row>
        <Col md={4}>
          <Image
            className="text-center"
            src={blog.image}
            alt={blog.Title}
            width="535px"
            height="290px"
          />
        </Col>
        <Col md={8}>
          <div className="lead py-3">{renderHtml(blog.excerpt)}</div>
          <Link href={`/${blog.slug}`}>
            <Button variant="info">Read More</Button>
          </Link>
          {myPosts && (
            <React.Fragment>
              {error && <Message variant="danger">{error.message}</Message>}
              <Button
                className="mx-3"
                onClick={deletePost}
                variant="danger"
                disabled={loading}
              >
                Delete Post
              </Button>
              <Link href={`/edit/${blog.slug}`}>
                <Button variant="success">Edit Blog</Button>
              </Link>
            </React.Fragment>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default Blog
