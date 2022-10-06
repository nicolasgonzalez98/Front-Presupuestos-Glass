import React from "react";


export function ClientInfo({client, setClient, setErrorsClient, validateClient, errorsClient}){

    function handleChange(e){
        

        setClient({
            ...client,
            [e.target.name]:e.target.value
        })

        setErrorsClient(
            validateClient({
                ...client,
                [e.target.name]: e.target.value,
            })
        )

        

        
    }

    return (
        <div>
            
            <label>Nombre: </label>
            <input
                type='text'
                name='name'
                placeholder='Nombre del cliente...' 
                value={client.name}
                onChange={handleChange}
            />

            <label>Apellido: </label>
            <input
                type='text'
                name='surname'
                placeholder='Apellido del cliente...' 
                value={client.surname}
                onChange={handleChange}
            />
            <label>CUIT/DNI: </label>
            <input
                type='text'
                name='dni'
                placeholder='CUIT/DNI del cliente...' 
                value={client.dni}
                onChange={handleChange}
            />
            <label>Direccion: </label>
            <input
                type='text'
                name='address'
                placeholder='Dirección del cliente...' 
                value={client.address}
                onChange={handleChange}
            />

            <label>Descripcion del cliente: </label>
            <input
                type='text'
                name='description'
                placeholder='Descripcion del cliente...' 
                value={client.description}
                onChange={handleChange}
            />

            <label>Telefono: </label>
            <input
                type='text'
                name='phone'
                placeholder='Telefono del cliente...' 
                value={client.phone}
                onChange={handleChange}
            />
        </div>
    )
}