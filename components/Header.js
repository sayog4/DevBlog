import React, { useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import Link from 'next/link'

import { removeFromLS, isLoggedIn } from '../lib/auth'

const Header = () => {
  // changing nav links
  const [isUser, setIsUser] = useState(false)
  return (
    <Navbar bg="primary" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand style={{ cursor: 'pointer' }}>DevBlog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!isLoggedIn() ? (
              <React.Fragment>
                <Link href="/signup">
                  <Nav.Link as="a" href="/signup">
                    Sign Up
                  </Nav.Link>
                </Link>
                <Link href="/login">
                  <Nav.Link as="a" href="/login">
                    Log In
                  </Nav.Link>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link href="/myposts">
                  <Nav.Link as="a" href="/myposts">
                    My Posts
                  </Nav.Link>
                </Link>
                <Link href="/createpost">
                  <Nav.Link as="a" href="/createpost">
                    Create Post
                  </Nav.Link>
                </Link>
                <NavDropdown
                  title="Profile"
                  id="basic-nav-dropdown"
                  className="mr-5"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      removeFromLS()
                      setIsUser(true)
                    }}
                    style={{ cursor: 'pointer' }}
                    as="span"
                  >
                    Log Out
                  </NavDropdown.Item>
                  <Link href="/profile">
                    <NavDropdown.Item as="a" href="/profile">
                      Profile
                    </NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
