import React from "react";
import { useState } from "react";

export function BudgetForm(){

    function validate(){
        return ''
    }

    const [input, setInput] = useState({
        name: '',
        surname: ''
    })

    return (
        <div>
            <label>Nombre: </label>
            <input
                type='text'
                name='name'
                placeholder='Nombre del cliente...' 
                value={input.name}
            />

            <label>Apellido: </label>
            <input
                type='text'
                name='surname'
                placeholder='Apellido del cliente...' 
                value={input.surname}
            />
        </div>
    )
}