import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export default function Navigation() {
  const {currentUser} = useAuth()
  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>Steve's ToDo</Navbar.Brand>
        {/* Hamburger button below */}
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            {/* Links for each page will go here. In this project we are using React router dom which carries
            Link component that will render the anchor tag that is associated with the router in App.js  */}
            <Nav>
                {currentUser &&
                  <Link to='/categories' className='nav-link'>Categories</Link>                  
                }

                <Link to='/todos' className='nav-link'>ToDos</Link>
                <Link to='/' className='nav-link'>Home</Link>                    

                {!currentUser &&
                 <Link to='/login' className='nav-link'>Login</Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
