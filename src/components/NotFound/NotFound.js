import React from 'react'
import image from '../../images/404 error.jpg'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt='Resources Not Found'/>
        <h1>Resource Not Found</h1>
    </div>
  )
}
