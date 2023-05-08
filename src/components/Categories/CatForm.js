import React from 'react'
import {Formik, Form, Field} from 'formik'
import axios from 'axios'
import {catSchema} from '../../utilities/validationSchema'

export default function CatForm(props) {
    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
            const catToCreate = values

            axios.post(`http://todoapi.sdrogers.net/api/Categories`, catToCreate).then(()=>{
                props.setShowCreate(false)
                props.getCategories()
            })
        }else {
            const catToEdit = {
                categoryId:props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

            axios.put(`http://todoapi.sdrogers.net/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{
                catName: props.category ? props.category.catName : '',
                catDesc: props.category ? props.category.catDesc : '',
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
            
            {({errors, touched}) => (
                <Form id='catFrom' className='row text-center m-auto'>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryName' className='form-control' placeholder='Name'/>
                        {errors.catName && touched.catName &&
                            <div className="text-danger">{errors.catName}</div>
                        }
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Descripiton'/>
                        {errors.catDesc && touched.catDesc &&
                            <div className="text-danger">{errors.catDesc}</div>
                        }
                    </div>
                    <div className="form-group m-1">
                        <button type='submit' className='btn btn-success'>Submit Category to API</button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
  )
}
