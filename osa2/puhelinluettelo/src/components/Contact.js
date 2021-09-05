import axios from 'axios'
import React from 'react'




const Contact = ({person}) => {

    const deletePerson = () => {
        if (window.confirm(`Delete  '${person.name}'`)) {
            axios.delete('http://localhost:3001/persons/' + person.id)
            window.alert('Contact was deleted!')
            window.location.reload()
        }               
    }

    return (
        <li>
            {person.name} {person.number} <button onClick={deletePerson}>Delete</button>
        </li>
    )
}

export default Contact