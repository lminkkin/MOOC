import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.addPerson}>
                <div>
                  Name: <input value={props.newName} onChange={props.handleNameChange} />  
                </div>
                <div>
                    Number: <input value={props.newNumber} onChange={props.handleNumberChange} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )

}

export default PersonForm