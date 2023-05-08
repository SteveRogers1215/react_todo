import React from 'react'
import '../Login/Landing.css'
//React-Bootstrap
import { Carousel, Col, Container, Row } from 'react-bootstrap'
//Images
import picture from '../../images/david-pupaza-epcndI4sds8-unsplash.jpg'
import picture2 from '../../images/edvin-johansson-Mmjkm_ueuDM-unsplash.jpg'
import picture3 from '../../images/maria-lupan-OkuM6V9m9l0-unsplash.jpg'
import photo from '../../images/thumbnail_1516674192871.jpg'

export default function Landing() {
  return (
    <section className="bootstrap">
        <main>
            <Carousel controls={false} fade>
                <Carousel.Item>
                    <img src={picture} alt='Bucharest' className='d-block w-100'/>                    
                </Carousel.Item>
                <Carousel.Item>
                    <img src={picture2} alt='Gothenburg' className='d-block w-100'/>                    
                </Carousel.Item>
                <Carousel.Item>
                    <img src={picture3} alt='Tenerife' className='d-block w-100'/>                    
                </Carousel.Item>
            </Carousel>
            <section className="about">
                <article className="bg-primary p-4 mb-5 text-white">
                    <h1 className='text-center'>About the Developer</h1>
                </article>
                <Container>
                    <Row>
                        <Col lg={6} className='mt-5'>
                            <img src={photo} alt="Steve Rogers, Site Developer" className='profilePic'/>
                        </Col>
                        <Col lg={6} className='about-text mt-5'>
                        <p><strong>
                        Hello, I'm Steve Rogers. Thank you for checking out my ToDo application! The app is written in <a href='https://reactjs.org/' target='_blank' rel='noreferrer' className='p-link'>ReactJS 18 </a>
                         and communicates using T-SQL database via ASP.NET Core 6 Web API.
                         I used different npm packages in the app to improve functionality, such as, React Router DOM, Axios, Google Firebase, Formik and Yup.
                         My full source code is<a href='https://github.com/SteveRogers1215' target='_blank' rel='noreferrer' className='p-link'> available on GitHub</a>.
                         </strong></p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    </section>
    
  )
    
}

