import React from 'react'
import Head from 'next/head'
const Meta = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'DevBlog',
  description:
    'Place where you can find article about differnt web technologies'
}

export default Meta
