import { gql } from '@apollo/client'

export const LOGIN_MUTAION = gql`
  mutation LOGIN_MUTAION($data: LogInInput!) {
    logIn(data: $data) {
      user {
        name
      }
      token
    }
  }
`
export const REGISTER_MUTAION = gql`
  mutation REGISTER_MUTAION($data: SignUpInput!) {
    signUp(data: $data) {
      token
      user {
        name
      }
    }
  }
`
export const UPDATE_USER = gql`
  mutation UPDATE_USER($data: UpdateUserInput!) {
    updateUser(data: $data) {
      name
    }
  }
`

export const CREATE_BLOG_POST = gql`
  mutation CREATE_BLOG_POST($data: CreateBlogPostInput!) {
    createBlogPost(data: $data) {
      id
      title
      slug
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation CREATE_COMMENT($data: CreateCommentInput!) {
    createComment(data: $data) {
      text
    }
  }
`

export const DELETE_BLOG_POST = gql`
  mutation DELETE_BLOG_POST($id: ID!) {
    deleteBlogPost(id: $id)
  }
`
export const UPDATE_BLOG_POST = gql`
  mutation UPDATE_BLOG_POST($id: ID!, $data: UpdateBlogPostInput!) {
    updateBlogPost(id: $id, data: $data) {
      id
      slug
    }
  }
`
