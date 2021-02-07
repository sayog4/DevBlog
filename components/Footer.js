import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-primary py-2">
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; DevBlog</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
