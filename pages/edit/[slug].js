import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

import Loader from '../../components/Loader'
import Message from '../../components/Message'
import RQuill from '../../components/RQuill'

import { Container, Form, Button } from 'react-bootstrap'
import Image from 'next/image'

import { useRouter } from 'next/router'
import { BLOG_BY_SLUG_EDIT } from '../../graphql/query'
import { UPDATE_BLOG_POST } from '../../graphql/mutation'
import Meta from '../../components/Meta'
import { isLoggedIn } from '../../lib/auth'

const editPost = ({ query }) => {
  const router = useRouter()

  useEffect(() => {
    !isLoggedIn && router.push('/')
  })

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')

  const uploadFile = e => {
    const file = e.target.files[0]
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'gql_blog')

    return fetch(process.env.NEXT_PUBLIC_C_URL, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(res => setImage(res.secure_url))
      .catch(err => console.log(err))
  }
  const { data, error, loading } = useQuery(BLOG_BY_SLUG_EDIT, {
    variables: { slug: query.slug },
    onCompleted: ({ blogBySlug }) => {
      setTitle(blogBySlug.title)
      setImage(blogBySlug.image)
      setBody(blogBySlug.body)
    }
  })

  const [
    updateBlogPost,
    { error: updateError, loading: updateLoading }
  ] = useMutation(UPDATE_BLOG_POST)

  const handleSubmit = async e => {
    e.preventDefault()
    const updated = await updateBlogPost({
      variables: {
        id: data.blogBySlug.id,
        data: {
          title,
          image,
          body
        }
      }
    })
    router.push(`/${updated.data.updateBlogPost.slug}`)
  }
  if (loading) return <Loader />
  if (error) return <Message>{error.message}</Message>
  return (
    <Container>
      <Meta title={`Edit | ${title}`} />
      <h1 className="display-4 text-center">Edit blog!!</h1>
      <Form onSubmit={handleSubmit}>
        {updateError && (
          <Message variant="danger">{updateError.message}</Message>
        )}
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            placeholder="Enter title for blog"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            required={true}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.File id="file" label="Choose File" onChange={uploadFile} />
        </Form.Group>
        {image && <Image src={image} alt="preview" width="200" height="200" />}
        <Form.Group>
          <RQuill body={body} setBody={setBody} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mb-3"
          disabled={updateLoading}
        >
          Update
        </Button>
      </Form>
    </Container>
  )
}

export default editPost
