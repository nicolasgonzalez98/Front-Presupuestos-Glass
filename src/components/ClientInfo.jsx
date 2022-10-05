import React from "react";
import { useState } from "react";

export function ClientInfo(){

    function validate(input){
        let errors = {}

        return errors
    }

    const [input, setInput] = useState({
        name: '',
        surname: '',
        dni: '',
        address: '',
        description: '',
        phone: ''
    })

    const [errors, setErrors] = useState({});

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    return (
        <div>
            <label>Nombre: </label>
            <input
                type='text'
                name='name'
                placeholder='Nombre del cliente...' 
                value={input.name}
                onChange={handleChange}
            />

            <label>Apellido: </label>
            <input
                type='text'
                name='surname'
                placeholder='Apellido del cliente...' 
                value={input.surname}
                onChange={handleChange}
            />
            <label>CUIT/DNI: </label>
            <input
                type='text'
                name='dni'
                placeholder='CUIT/DNI del cliente...' 
                value={input.dni}
                onChange={handleChange}
            />
            <label>CUIT/DNI: </label>
            <input
                type='text'
                name='address'
                placeholder='Dirección del cliente...' 
                value={input.address}
                onChange={handleChange}
            />

            <label>Informacion del cliente: </label>
            <input
                type='text'
                name='description'
                placeholder='Dirección del cliente...' 
                value={input.description}
                onChange={handleChange}
            />

            <label>Informacion del cliente: </label>
            <input
                type='text'
                name='phone'
                placeholder='Telefono del cliente...' 
                value={input.phone}
                onChange={handleChange}
            />
        </div>
    )
}