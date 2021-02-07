import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => (
  <Spinner
    animation="border"
    role="status"
    style={{
      width: '80px',
      height: '80px',
      margin: 'auto',
      marginTop: '200px',
      display: 'block'
    }}
  >
    <span className="sr-only">Loading...</span>
  </Spinner>
)
export default Loader
