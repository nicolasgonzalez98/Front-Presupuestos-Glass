import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';


import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Button from 'react-bootstrap/Button';
import { create_client } from "../redux/actions";
import { useNavigate } from "react-router-dom";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// CommonJS


export function ClientCreate(){
    
    useEffect(() => {
        let user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }


    }, [])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const [client, setClient] = useState({
        name: '',
        surname: '',
        dni: '',
        address: '',
        description: '',
        phone: '',
        userId: localStorage.getItem('id_user')
    })

    const [catchErrorsClient, setCatchErrorsClient] = useState(false)

    function validateClient(input){
        let errors = {}

        if(!input.name){
            errors.name = 'No ingresaste el nombre del cliente'
        }

        if(!input.surname){
            errors.surname = 'No ingresaste el apellido del cliente'
        }

        if(!input.dni){
            errors.dni = 'No ingresaste el DNI del cliente'
        }

        if(input.description.length > 1000){
            errors.description = 'Su descripcion es demasiado larga'
        }

        return errors
    }

    const [errorsClient, setErrorsClient] = useState({});

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

    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(errorsClient).length === 0 && client.name){
            setCatchErrorsClient(false)
            dispatch(create_client(client))
            .then(
                setClient({
                    name: '',
                    surname: '',
                    dni: '',
                    address: '',
                    description: '',
                    phone: '',
                    userId: localStorage.getItem('id_user')
                })
            )
            .then(
                Swal.fire(
                    'Cliente creado correctamente!',
                    '',
                    'success'
                )
            )
            
        }else{
            setCatchErrorsClient(true)
        }
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label='Nombre del cliente'>
                            <Form.Control
                                type='text'
                                name='name'
                                isInvalid={catchErrorsClient ? (errorsClient.name ? true : false) : false}
                                value={client.name}
                                onChange={handleChange}
                                className='form-control'
                            />
                            {catchErrorsClient ? (errorsClient.name ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errorsClient.name}
                                    </Form.Control.Feedback> : 
                                    false) : 
                            <></>}
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label='Apellido del cliente'>
                            <Form.Control
                                type='text'
                                name='surname'
                                isInvalid={catchErrorsClient ? (errorsClient.surname ? true : false) : false}
                                value={client.surname}
                                onChange={handleChange}
                                className='form-control'
                            />
                            {catchErrorsClient ? (errorsClient.surname ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errorsClient.surname}
                                    </Form.Control.Feedback> : 
                                    false) : 
                            <></>}
                        </FloatingLabel>
                    </Col>
                </Row>
                
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Mas datos del cliente</Accordion.Header>
                        <Accordion.Body>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <FloatingLabel label='Cuit/DNI del cliente'>
                                        <Form.Control
                                            className="form-control"
                                            type='text'
                                            name='dni'
                                            isInvalid={catchErrorsClient ? (errorsClient.dni ? true : false) : false}
                                            value={client.dni}
                                            onChange={handleChange}
                                        />
                                        {catchErrorsClient ? (errorsClient.dni ? 
                                            <Form.Control.Feedback type="invalid">
                                                {errorsClient.dni}
                                            </Form.Control.Feedback> : 
                                            false) : 
                                        <></>}
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FloatingLabel label='Telefono'>
                                    
                                        <Form.Control
                                            type='text'
                                            name='phone'
                                            className="form-control"
                                            value={client.phone}
                                            onChange={handleChange}
                                        />
                                        
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <FloatingLabel label='Direccion'>
                                        <Form.Control
                                            type='text'
                                            name='address'
                                            className="form-control"
                                            
                                            value={client.address}
                                            onChange={handleChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            
                            

                            

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descripcion del cliente: </Form.Label>
                                
                                <Form.Control
                                    as='textarea'
                                    class="form-control"
                                    type='text'
                                    rows={3} 
                                    name='description'
                                    isInvalid={catchErrorsClient ? (errorsClient.description ? true : false) : false}
                                    value={client.description}
                                    onChange={handleChange}
                                />
                                {catchErrorsClient ? (errorsClient.description ? 
                                            <Form.Control.Feedback type="invalid">
                                                {errorsClient.description}
                                            </Form.Control.Feedback> : 
                                            false) : 
                                <></>}
                            </Form.Group>
                            
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Button className="mt-3" variant="primary" type="submit">
                    Agregar cliente
                </Button>
            </Form>

            
        
        </div>
    )
}

export default ClientCreate;