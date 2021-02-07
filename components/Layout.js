import React from 'react'
import { Container } from 'react-bootstrap'
import dynamic from 'next/dynamic'
// import Header from './Header'
const MyDynamicComponent = dynamic(() => import('./Header'), {
  ssr: false
})
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <>
      <MyDynamicComponent />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
