import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import Image from 'next/image'
import { useMutation } from '@apollo/client'

import { CREATE_BLOG_POST } from '../graphql/mutation'

import Loader from '../components/Loader'
import RQuill from '../components/RQuill'
import Message from '../components/Message'
import { useRouter } from 'next/router'
import { MY_BLOG_POSTS } from '../graphql/query'
import Meta from '../components/Meta'
import { isLoggedIn } from '../lib/auth'
import { C_URL } from '../config'

const createpost = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    !isLoggedIn() && router.push('/login')
  }, [])

  const uploadFile = e => {
    const file = e.target.files[0]
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'gql_blog')

    return fetch(C_URL, {
      method: 'POST',
      body: data
    })
      .then(res => res.json())
      .then(res => setImage(res.secure_url))
      .catch(err => console.log(err))
  }
  const [createBlog, { error, loading, data }] = useMutation(CREATE_BLOG_POST, {
    refetchQueries: [{ query: MY_BLOG_POSTS }]
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await createBlog({
      variables: {
        data: {
          title,
          image,
          body
        }
      }
    })
    router.push(`/${data.createBlogPost.slug}`)
  }
  if (loading) return <Loader />
  return (
    <Container>
      <Meta title="Create new Post | DevBlog" />
      <h1 className="display-3 text-center">Create a new blog post!!!</h1>

      <Form onSubmit={handleSubmit}>
        {error && <Message>{error.message}</Message>}
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
          <Form.File
            required={true}
            id="file"
            label="Choose File"
            onChange={uploadFile}
          />
        </Form.Group>
        {image && <Image src={image} alt="preview" width="200" height="200" />}
        <Form.Group>
          <RQuill body={body} setBody={setBody} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Create +
        </Button>
      </Form>
    </Container>
  )
}

export default createpost
