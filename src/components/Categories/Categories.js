//Below we bring in useState to write a hook to store Categories and useEffect to automatically retrieve them.
import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
//Axios handles API so we need to npm install axios
import axios from 'axios'
import SingleCategory from './SingleCategory'
import {useAuth} from '../../contexts/AuthContext'
import CatCreate from './CatCreate'
import ProtectedRoute from '../ProtectedRoute'
import './Categories.css'

//Steps to Read functionality
//1. add useState and useEffect to the React import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen (also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

export default function Categories() {
    //This hook stores data returned from API
    const [categories, setCategories] = useState([])
    //Above we pass [] into the params of useState so .map will not error out (needs a collection to work)
    const {currentUser} = useAuth()
    const [showCreate, setShowCreate] = useState(false);

    const getCategories = () => {
        axios.get(`http://todoapi.sdrogers.net/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, []);


  return (
    <section className="categories">
        <article className="bg-primary p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>
        {/* CREATE UI */}
        <ProtectedRoute>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                {showCreate ?
                    <>
                        <button onClick={()=> setShowCreate(false)} className='btn btn-warning'>Cancel</button>
                        <CatCreate setShowCreate={setShowCreate}
                        getCategories={getCategories}/>
                    </>
                : <button onClick={()=> setShowCreate(true)}
                className='btn btn-success'>Create Category</button>
                }
            </div>
        }
        </ProtectedRoute>
        {/* END OF CREATE UI */}
        <Container className='p-2'>
            <table className="table bg-info table-dark my-3">
                <thead className="table-secondary text-uppercase">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <ProtectedRoute>
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                            <th>Actions</th>
                        }
                        </ProtectedRoute>
                    </tr>
                </thead>
                <tbody>
                    {/* Below is our READ UI */}
                    {categories.map(c => 
                        <SingleCategory key={c.categoryId} category={c} getCategories={getCategories}/>
                    )}
                </tbody>
            </table>
        </Container>
    </section>
  )
}