import React, { useState } from "react";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from "react-bootstrap/FloatingLabel";


export function ClientInfo({client, setClient, setErrorsClient, validateClient, errorsClient, catchErrorsClient, setCatchErrorsClient}){

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
                    <Form.Group>
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
                        
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <FloatingLabel label='Apellido del cliente'>
                            <Form.Control
                                type='text'
                                name='surname'
                                value={client.surname}
                                isInvalid={catchErrorsClient ? (errorsClient.surname ? true : false) : false}
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
                        
                    </Form.Group>
                </Col>
            </Row>
            
            <p>Mas datos del cliente</p>
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
                                        isInvalid={catchErrorsClient ? (errorsClient.phone ? true : false) : false}
                                    />
                                    {catchErrorsClient ? (errorsClient.phone ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errorsClient.phone}
                                    </Form.Control.Feedback> : 
                                    false) : 
                                <></>}
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
                                        isInvalid={catchErrorsClient ? (errorsClient.address ? true : false) : false}
                                        value={client.address}
                                        onChange={handleChange}
                                    />
                                    {catchErrorsClient ? (errorsClient.address ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errorsClient.address}
                                    </Form.Control.Feedback> : 
                                    false) : 
                                <></>}
                                </FloatingLabel>
                                
                            </Form.Group>
                        </Row>
                        
                        

                        

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripcion del cliente: </Form.Label>
                            
                            <Form.Control
                                as='textarea'
                                className="form-control"
                                type='text'
                                rows={3} 
                                name='description'
                                value={client.description}
                                isInvalid={catchErrorsClient ? (errorsClient.description ? true : false) : false}
                                onChange={handleChange}
                            />
                            {catchErrorsClient ? (errorsClient.description ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errorsClient.description}
                                    </Form.Control.Feedback> : 
                                    false) : 
                                <></>}
                        </Form.Group>
                        
                
            

            
        </div>
    )
}