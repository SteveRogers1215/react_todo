import React from 'react'
import {Modal} from 'react-bootstrap'
import ToDoForm from './ToDoForm'

export default function ToDoEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}>
            <Modal.Header className='bg-purple' closeButton>
                <h3>Editing {props.toDo.name}</h3>
            </Modal.Header>
            <Modal.Body>
                <ToDoForm getToDo={props.getToDo} setShowEdit={props.setShowEdit} toDo={props.toDo}/>
            </Modal.Body>

    </Modal>
  )
}
