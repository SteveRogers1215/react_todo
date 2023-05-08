import React from 'react'
//In this Login component we need access to the Login function stored in our AuthContext.
//There are always three steps to implementing any of our context values
//Step 1: Import the useAuth function
import { useAuth } from '../../contexts/AuthContext'
import {Container, Card} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function LoginLanding() {
    
    const {login} = useAuth()
    
    const navigate = useNavigate()

    
    async function handleAuth(){
        await login()        
        return navigate('/')
    }


  return (
    
    <div className='login'>
        <article className="bg-info mb-5 p-5 text-dark">
            <h1 className="text-center">Welcome to Steve's ToDo!</h1>
        </article>
        <Container>
            <Card className='m-2 border-dark text-center'>
                <Card.Header className='bg-dark text-white'>
                    <h2>Login for full access to functionality</h2>
                </Card.Header>
                <Card.Body>
                    <button className="btn btn-success" onClick={()=> handleAuth()}>
                        Login with GitHub
                    </button>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}