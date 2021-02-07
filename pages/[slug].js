import React, { useState } from 'react'
import { Col, Form, Container, Row, Card, Button } from 'react-bootstrap'
import moment from 'moment'
import renderHtml from 'react-render-html'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery, useMutation } from '@apollo/client'
import { BLOG_BY_SLUG } from '../graphql/query'
import { CREATE_COMMENT } from '../graphql/mutation'
import Loader from '../components/Loader'
import { isLoggedIn } from '../lib/auth'
import Message from '../components/Message'
import Meta from '../components/Meta'

const Slug = ({ query }) => {
  const [comment, setComment] = useState('')

  const { data, error, loading } = useQuery(BLOG_BY_SLUG, {
    variables: {
      slug: query.slug
    }
  })
  const [
    createComment,
    { error: createdCommentError, loading: createdCommentLoading }
  ] = useMutation(CREATE_COMMENT, {
    refetchQueries: [{ query: BLOG_BY_SLUG, variables: { slug: query.slug } }]
  })

  if (loading) return <Loader />
  if (error) return <Error variant="danger">{error.message}</Error>
  const { blogBySlug } = data

  const submitComment = async e => {
    e.preventDefault()
    await createComment({
      variables: {
        data: {
          text: comment,
          post: blogBySlug.id
        }
      }
    })
  }
  return (
    <React.Fragment>
      <Meta title={blogBySlug.mtitle} description={blogBySlug.mdesc} />
      <article>
        <Container>
          <h1 className="display-4 text-center py-4">{blogBySlug.title}</h1>
          <Image
            width="960"
            height="500"
            src={blogBySlug.image}
            alt={blogBySlug.title}
          />
          <p className="lead py-4">
            Published By: {blogBySlug.author.name} | Published On:{' '}
            {moment(blogBySlug.createdAt).fromNow()}
          </p>
          <section>{renderHtml(blogBySlug.body)}</section>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="display-5">Comments</h2>
              {isLoggedIn() ? (
                <Form onSubmit={submitComment}>
                  {createdCommentError && (
                    <Message variant="danger">
                      {createdCommentError.message}
                    </Message>
                  )}
                  <Form.Group controlId="comment">
                    <Form.Label>Create Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      row={3}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={createdCommentLoading}
                  >
                    Create Comment +
                  </Button>
                </Form>
              ) : (
                <p className="lead">
                  Please <Link href="/login">Login</Link> to create comment.
                </p>
              )}
              {blogBySlug.comment.length > 0 ? (
                blogBySlug.comment.map(c => (
                  <Card className="my-4" key={c.id}>
                    <Card.Body>
                      <Card.Title>{c.text}</Card.Title>
                      <Card.Body>
                        By: {c.author.name} | {moment(c.createdAt).fromNow()}
                      </Card.Body>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p className="lead my-3">No comments for this post</p>
              )}
            </Col>
          </Row>
        </Container>
      </article>
    </React.Fragment>
  )
}

export default Slug
