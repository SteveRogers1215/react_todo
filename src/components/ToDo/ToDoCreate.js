import React from 'react'
import ToDoForm from './ToDoForm'

export default function ToDoCreate(props) {
  return (
    <article className="createToDo m-2 text-white justify-content-center">
      <ToDoForm getToDo={props.getToDo} setShowCreate={props.setShowCreate}/>
    </article>
  )
}