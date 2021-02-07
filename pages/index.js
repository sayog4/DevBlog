import React from 'react'
import { useQuery } from '@apollo/client'
import { Button } from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'
import Blog from '../components/Blog'
import Meta from '../components/Meta'
import { BLOGS } from '../graphql/query'

export default function Home() {
  const { error, loading, data, fetchMore } = useQuery(BLOGS, {
    variables: { cursor: null }
  })

  if (loading) return <Loader />
  if (error) return <Message variant="danger">{error.message}</Message>

  return (
    <React.Fragment>
      <Meta />
      <div className="py-4">
        {data &&
          data.blogs.blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        {data && data.blogs.hasNextPage && (
          <Button
            onClick={async () => {
              await fetchMore({
                variables: {
                  cursor: data.blogs.cursor
                }
              })
            }}
            variant="primary"
          >
            Load More
          </Button>
        )}
      </div>
    </React.Fragment>
  )
}
