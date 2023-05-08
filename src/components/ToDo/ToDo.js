import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleToDo from './SingleToDo';
import FilterToDo from './FilterToDo';
import { useAuth } from '../../contexts/AuthContext';
import ToDoCreate from './ToDoCreate'
import ProtectedRoute from '../ProtectedRoute';
import './ToDo.css'


//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen (also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)
//Instead of using ResourceAPI info this should use ToDoAPI info for ToDo

export default function ToDo() {
    const [toDo, setToDo] = useState([]);
    const {currentUser} = useAuth()
    const [showCreate, setShowCreate] = useState(false)

    const [filter, setFilter] = useState(0);
    const [showDone, setShowDone] = useState(false);

    const getToDo = () => {
        axios.get(`http://todoapi.sdrogers.net/api/ToDo`).then(response => {
            console.log(response)
            setToDo(response.data)
        })
    }

    useEffect(() => {
        getToDo()
    }, []);


    return (
      <section className="todos">
        <article className="bg-primary p-5  text-dark">
            <h1 className="text-center">Steve's ToDo Dashboard</h1>
        </article>

            {/* Create UI begins */}
            
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <div className="p-2 mb-3 text-center bg-dark">
                    {!showCreate ? 
                        <>
                          <button onClick={() => setShowCreate(true)} className="btn btn-success p-3 mb-3">Create New Task</button>
                            
                        </>
                    : <> <button onClick={() => setShowCreate(false)} className="btn btn-danger p-3 mb-3">Close Form</button>
                    
                    
                      <div className="createContainer w-75 m-auto">
                        <ToDoCreate setShowCreate={setShowCreate} getToDo={getToDo} />
                      </div> </>
                    }
                </div>
            }
            
            {/* End of Create UI */}
        <FilterToDo setFilter={setFilter} showDone={showDone}setShowDone={setShowDone}/>
        {/* <Container>
          <article className="todoGallery row justify-content-center">
              {/* {filter === 0 ? toDo.map(t => 
                <SingleToDo key={t.toDoId} toDo={t}/>
              ):
              toDo.filter(t => t.toDoId === filter).map(t =>
                <SingleToDo key={t.toDoId} toDo={t}/>
                
              )} */}
              {/* {filter !== 0 && toDo.filter(t => t.toDoId === filter).length === 0 &&
                <h2 className="alert alert-warning text-dark">
                  There are no results for this category.
                </h2>
              } */}
          
        
        
        <Container className='p-2'>
            <table className="bg-dark text-white striped bordered hover variant='dark'">
                <thead>
                    <tr>
                        <th>Done?</th>
                        <th>Task</th>
                        <th>Category</th>
                        <ProtectedRoute>
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                            <th>Actions</th>
                        }
                        </ProtectedRoute>
                    </tr>
                </thead>
                <tbody>
             {!showDone ?
               <>                      
                {filter === 0 ? toDo.filter(t => t.done === false).map(t =>
                  <SingleToDo key={t.toDoId} toDo={t} getToDo={getToDo}/>
              ):
                toDo.filter(t => t.done=== false && t.categoryId === filter).map(t =>
                  <SingleToDo key={t.toDoId} toDo={t} getToDo={getToDo}/>                
              )}
              </>:
              <>
                {filter === 0 ? toDo.map(t => 
                  <SingleToDo key={t.toDoId} toDo={t} getToDo={getToDo}/>
                ):
                toDo.filter(t => t.categoryId === filter).map(t =>
                  <SingleToDo key={t.toDoId} toDo={t} getToDo={getToDo}/>                
                )}
              </>
              }
                </tbody>
            </table>
              {!showDone ?
                <>
                {filter !== 0 && toDo.filter(t => t.done === false && t.categoryId === filter).length === 0 &&
                    <h2 className="alert alert-warning text-dark">
                      There are no incomplete items for this category.
                    </h2>
                }
                </> :
                <>
                {filter !== 0 && toDo.filter(t => t.categoryId === filter).length === 0 &&
                    <h2 className="alert alert-warning text-dark">
                    There are no ToDo items in this category.
                  </h2>
                }
                </>
              }
        </Container>        
    </section>
  )
}
      
    

