import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { REGISTER_MUTAION } from '../graphql/mutation'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import FormContainer from '../components/FormContainer'
import { setLS, isLoggedIn } from '../lib/auth'

const register = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    isLoggedIn() && router.push('/')
  }, [])

  const [signup, { data, error, loading }] = useMutation(REGISTER_MUTAION, {
    variables: {
      data: {
        name,
        email,
        password
      }
    }
  })

  if (data && data.signUp.token) {
    setLS(data.signUp.token)
    router.push('/')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await signup()
  }

  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Meta title="SignUp | DevBlog" />
      <FormContainer>
        <Form onSubmit={handleSubmit} className="mt-5">
          <Form.Group controlId="name">
            {error && <Message variant="danger">{error.message}</Message>}
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required={true}
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required={true}
              placeholder="Enter Your Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required={true}
              placeholder="Enter Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-block">
            Submit
          </Button>
          <p className="lead my-3">
            Already have an account??
            <Link href="/login">Click here</Link> to log in.
          </p>
        </Form>
      </FormContainer>
    </React.Fragment>
  )
}

export default register
