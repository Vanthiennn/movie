import React from 'react'
import { Helmet } from 'react-helmet'
import './index.scss'
export default function PageNotFound() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Page Not Found</title>
        <meta
          name="description"
          content="Page Not Found"
        />
      </Helmet>
      <div style={{padding:'50px',textAlign:'center'}}>
        <h2>Oops! We can't find the page you're looking for</h2>
        <p style={{marginBottom:20}}> You tried to request a page that doesn't exist. If you believe this to be in error, let us know on the forums.</p>
        <a  href='/' style={{ marginRight: 20, color: '#fff', padding: '10px 20px', borderRadius: '20px', backgroundColor: 'rgb(1, 180, 228)',fontWeight:'bold' }}>Go back to Homepage</a>
      </div>
    </React.Fragment>
  )
}
