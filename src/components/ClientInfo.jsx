import React from "react";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Accordion from 'react-bootstrap/Accordion';


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
            <Row className="mb-3">
                <Col>
                    <input
                        type='text'
                        name='name'
                        placeholder='Nombre del cliente' 
                        value={client.name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </Col>
                <Col>
                    <input
                        type='text'
                        name='surname'
                        placeholder='Apellido del cliente' 
                        value={client.surname}
                        onChange={handleChange}
                        className='form-control'
                    />
                </Col>
            </Row>
            
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Mas datos del cliente</Accordion.Header>
                    <Accordion.Body>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>CUIT/DNI: </Form.Label>
                                <input
                                    className="form-control"
                                    type='text'
                                    name='dni'
                                    placeholder='CUIT/DNI del cliente...' 
                                    value={client.dni}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Telefono: </Form.Label>
                                <input
                                    type='text'
                                    name='phone'
                                    className="form-control"
                                    placeholder='Telefono del cliente...' 
                                    value={client.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Direccion: </Form.Label>
                                <input
                                    type='text'
                                    name='address'
                                    className="form-control"
                                    placeholder='Dirección del cliente...' 
                                    value={client.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Row>
                        
                        

                        

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripcion del cliente: </Form.Label>
                            <textarea
                                class="form-control"
                                type='text'
                                rows={3} 
                                name='description'
                                placeholder='Descripcion del cliente...' 
                                value={client.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            

            
        </div>
    )
}