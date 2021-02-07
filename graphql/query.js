import { gql } from '@apollo/client'

export const ME_QUERY = gql`
  query {
    me {
      name
      email
    }
  }
`

export const MY_BLOG_POSTS = gql`
  query {
    myBlogPosts {
      id
      title
      slug
      excerpt
      image
      createdAt
      author {
        name
      }
    }
  }
`

export const BLOG_BY_SLUG = gql`
  query BLOG_BY_SLUG($slug: String!) {
    blogBySlug(slug: $slug) {
      id
      title
      body
      image
      slug
      excerpt
      mtitle
      mdesc
      author {
        name
      }
      comment {
        id
        createdAt
        text
        author {
          name
        }
      }
      createdAt
    }
  }
`

export const BLOG_BY_SLUG_EDIT = gql`
  query BLOG_BY_SLUG_EDIT($slug: String!) {
    blogBySlug(slug: $slug) {
      id
      title
      body
      image
      slug
    }
  }
`
export const BLOGS = gql`
  query BLOG($cursor: String) {
    blogs(cursor: $cursor) {
      blogs {
        id
        title
        slug
        excerpt
        image
        createdAt
        author {
          name
        }
      }
      cursor
      hasNextPage
    }
  }
`
