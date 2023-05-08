import React, {useState, useEffect} from 'react'
import {Formik, Form, Field} from 'formik'
import { toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    const [categories, setCategories] = useState([])

    const getCategories = () => {
        axios.get(`http://todoapi.sdrogers.net/api/Categories`).then(response => setCategories(response.data))
    }

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.toDo){
            const newToDo = {
                name: values.name,
                done: false,
                categoryId: values.categoryId
            } 
            axios.post(`http://todoapi.sdrogers.net/api/ToDo`, newToDo).then(() => {
                props.getToDo()
                props.setShowCreate(false)
            })
        }else {
            const taskToEdit = {
                toDoId: props.toDo.toDoId,
                name: values.name,
                done: props.toDo.done,
                categoryId: values.categoryId
            }

            axios.put(`http://todoapi.sdrogers.net/api/ToDo/${props.toDo.toDoId}`, taskToEdit).then(() => {
                props.getToDo()
                props.setShowEdit(false)
            })
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

  return (
    <Formik
        initialValues={{
            name: props.toDo ? props.toDo.name : '',            
            categoryId: props.toDo ? props.toDo.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}>
        {({errors, touched}) => (
            <Form id='toDoForm'>
                <div className="form-group m-3">
                    <Field name='name' className='form-control' placeholder='New Task'/>
                    {errors.name && touched.name ? (
                        <div className="text-danger">{errors.linkText}</div>
                    ): null}                    
                </div>
                <div className="form-group m-3">
                   <Field name='categoryId' as='select' className='form-control'>
                    <option value='' disabled>[---Choose a Category---]</option>
                    {categories.map(cat => 
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.catName}
                        </option>
                        
                        )}                    
                    </Field>                  
                </div>
                <div className="from-group m-3">
                    <button className="btn btn-success m-3" type='submit'>Submit</button>
                </div>
            </Form>
        )}
        
    </Formik>
  )
}
