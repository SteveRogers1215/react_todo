import React, {useState} from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import ToDoEdit from './ToDoEdit';

export default function SingleToDo(props) {
    const {currentUser} = useAuth()

    const [showEdit, setShowEdit] = useState(false);
    
    const flipBox = () => {
        let updatedToDo = {
            toDoId: props.toDo.toDoId,
            name: props.toDo.name,
            done: !props.toDo.done,
            categoryId: props.toDo.categoryId
        }
        axios.put(`http://todoapi.sdrogers.net/api/ToDo/${props.toDo.toDoId}`, updatedToDo).then(response => {
            console.log(response)
            props.getToDo()
        })
    }

    const removeToDo = (id) => {
        if(window.confirm(`Do you wish to remove ${props.toDo.name}?`)) {
            axios.delete(`http://todoapi.sdrogers.net/api/ToDo/${id}`).then(() => {props.getToDo()})
        }
    }
  return (
    
        <tr className='flex-container text-white'>
            <td >
                <input className='checkbox' type='checkbox' checked={props.toDo.done} onChange={() => flipBox()}/>
            </td>
            <td >{props.toDo.name}</td>
            <td >{props.toDo.category ? props.toDo.category.catName : 'No category available'}</td>
            
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <td className='text-center'>
                    <button className="btn btn-dark" id='editLink' onClick={() => setShowEdit(true)}>
                        <FaEdit/>
                    </button>
                    &emsp;
                    <button className="btn btn-secondary" id='deleteLink' onClick={() => removeToDo(props.toDo.toDoId)}>
                        <FaTrashAlt/>
                    </button>
                    {showEdit &&
                        <ToDoEdit
                            toDo={props.toDo}
                            getToDo={props.getToDo}
                            showEdit={showEdit}
                            setShowEdit={setShowEdit}/>
                    }                    
                </td>
            }
            
        </tr>
    
  )
}