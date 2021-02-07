import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useQuery, useMutation } from '@apollo/client'
import { Form, Button } from 'react-bootstrap'

import { ME_QUERY } from '../graphql/query'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { UPDATE_USER } from '../graphql/mutation'
import { isLoggedIn } from '../lib/auth'

const profile = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { data, error, loading } = useQuery(ME_QUERY, {
    onCompleted: ({ me }) => {
      setEmail(me.email)
      setName(me.name)
    }
  })

  const [
    update,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UPDATE_USER, { refetchQueries: [{ query: ME_QUERY }] })

  useEffect(() => {
    !isLoggedIn() && router.push('/')
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await update({
      variables: {
        data: {
          name,
          password
        }
      }
    })
  }

  if (loading) return <Loader />

  return (
    <React.Fragment>
      <Meta title={`${name} | Profile`} />
      <FormContainer>
        {error && <Message>{error.message}</Message>}
        <Form onSubmit={handleSubmit} className="mt-5">
          {updateError && <Message>{updateError.message}</Message>}

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Your Email"
              disabled={true}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Your Password"
            />
          </Form.Group>
          <Button
            className="btn-block"
            variant="primary"
            type="submit"
            disabled={updateLoading}
          >
            Update
          </Button>
        </Form>
      </FormContainer>
    </React.Fragment>
  )
}

export default profile
