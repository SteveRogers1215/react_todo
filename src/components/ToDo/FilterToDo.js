import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ImEye, ImEyeBlocked } from 'react-icons/im'

export default function FilterToDos(props) {
    //We need to access and store Categories from the API for this component to work
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`http://todoapi.sdrogers.net/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }, []);


  return (
    <div className='text-center mt-5'>
        <button onClick={()=> props.setFilter(0)} className="btn btn-outline-primary bg-dark m-1">
            All
        </button>
        {/* Below we map all our categories to a button that will filter resources for that category */}
        {categories.map(c => 
            <button key={c.categoryId} className="btn btn-outline-primary bg-dark m-1"
             onClick={()=> props.setFilter(+c.categoryId)}>
                {c.catName}
            </button>
        )}

        {!props.showDone ?
            <button className="btn btn-outline-primary bg-dark m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Show Complete &ensp;<ImEye/>
            </button>:
            <button className="btn btn-warning m-1" onClick={() => props.setShowDone(!props.showDone)}>
                Hide Complete &ensp;<ImEyeBlocked/>
            </button>
        
        }
    </div>
  )
}
