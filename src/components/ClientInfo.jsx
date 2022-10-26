import React from "react";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from "react-bootstrap/FloatingLabel";


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
                                className="form-control"
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
            

            
        </div>
    )
}