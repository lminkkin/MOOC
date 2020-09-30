import React from 'react'
import Person from './Person'

const PersonList = ({ persons, handleDelete }) => {
    return (
        <div>
            <ul>
                {persons.map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}
            </ul>
        </div>
    )
}


export default PersonList