import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import withApollo from 'next-with-apollo'
import { onError } from '@apollo/link-error'
import { setContext } from '@apollo/client/link/context'

import { GQL_URL } from '../config/config'

function createClient({ headers, initialState }) {
  const httpLink = createHttpLink({
    uri: GQL_URL
  })

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
              `[GraphQl Error]: Message: ${message}, location: ${locations}, Path: ${path}`
            )
          })
        }
        if (networkError) {
          console.log(
            `[Network error]: ${networkError}. Server is not working!!!`
          )
        }
      }),
      authLink,
      httpLink
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            blogs: {
              merge(existing, incoming, { readField }) {
                const blogs = existing ? { ...existing.blogs } : {}
                incoming.blogs.forEach(blog => {
                  blogs[readField('id', blog)] = blog
                })
                return {
                  cursor: incoming.cursor,
                  blogs,
                  hasNextPage: incoming.hasNextPage
                }
              },
              read(existing) {
                if (existing) {
                  // console.log(existing)
                  return {
                    cursor: existing.cursor,
                    blogs: Object.values(existing.blogs),
                    hasNextPage: existing.hasNextPage
                  }
                }
              }
            }
          }
        }
      }
    })
  })
}

export default withApollo(createClient)
