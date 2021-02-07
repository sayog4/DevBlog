import React, { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import Link from 'next/link'
import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'

import { LOGIN_MUTAION } from '../graphql/mutation'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Meta from '../components/Meta'

import { setLS, isLoggedIn } from '../lib/auth'

const login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { data, loading, error }] = useMutation(LOGIN_MUTAION, {
    variables: {
      data: {
        email,
        password
      }
    }
  })
  useEffect(() => {
    isLoggedIn() && router.push('/')
  }, [])

  if (data && data.logIn.token) {
    setLS(data.logIn.token)
    router.push('/')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await login()
    setEmail('')
    setPassword('')
  }
  if (loading) return <Loader />
  return (
    <React.Fragment>
      <Meta title="LogIn | DevBlog" />

      <FormContainer>
        <Form onSubmit={handleSubmit} className="mt-5">
          {error && <Message variant="danger">{error.message}</Message>}
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
            New User??
            <Link href="/signup">Click here</Link> to sign up.
          </p>
        </Form>
      </FormContainer>
    </React.Fragment>
  )
}

export default login
