import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
//import { useNavigate } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Button from 'react-bootstrap/Button';
import { create_client } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export function ClientCreate(){
    
    useEffect(() => {
        let user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null){
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

    

    function validateClient(input){
        let errors = {}

        if(!input.name){
            errors.name = 'No ingresaste el nombre del cliente'
        }

        if(!input.surname){
            errors.name = 'No ingresaste el apellido del cliente'
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
            dispatch(create_client(client))
            
            setClient({
                name: '',
                surname: '',
                dni: '',
                address: '',
                description: '',
                phone: ''
            })
        }else{
            console.log('error')
        }
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <FloatingLabel label='Nombre del cliente'>
                            <input
                                type='text'
                                name='name'
                                
                                value={client.name}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label='Apellido del cliente'>
                            <input
                                type='text'
                                name='surname'
                                value={client.surname}
                                onChange={handleChange}
                                className='form-control'
                            />
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
                                        <input
                                            className="form-control"
                                            type='text'
                                            name='dni'
                                            value={client.dni}
                                            onChange={handleChange}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <FloatingLabel label='Telefono'>
                                    
                                        <input
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
                                        <input
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
                                
                                <textarea
                                    class="form-control"
                                    type='text'
                                    rows={3} 
                                    name='description'
                                    value={client.description}
                                    onChange={handleChange}
                                />
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