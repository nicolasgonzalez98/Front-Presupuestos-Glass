import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { delete_client, edit_client, get_budgets_by_client, get_budgets_by_user, get_clients_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import { IoTrash, IoOptions, IoDocumentAttachOutline } from "react-icons/io5";
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import { FilterClients } from "./FilterClients";



export function MyClients(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_clients_by_user(user_id))
        }
        
    },[dispatch, navigate])


    let my_clientes = useSelector(state => state.filtered_clients)

    const [order, setOrder] = useState('asc')
    const [typeOrder, setTypeOrder] = useState('alph')

    function handleDelete(id, name, surname){
        Swal.fire({
            title: `Deseas eliminar a ${name} ${surname}?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if(result.isConfirmed){
                dispatch(delete_client(id))
                Swal.fire('Eliminado correctamente!', '', 'success')
            }
        })
    }

    

    

    //EDITAR CLIENTES
    const [showEdit, setShowEdit] = useState(false);
    const [editClient, setEditClient] = useState({});

    function handleClose(){
        setShowEdit(false)
        setEditClient({})
        setErrorsClient({})
        setCatchErrorsClient(false)
    }
    function handleShow(client){
        setEditClient(client)
        setShowEdit(true)
        setCatchErrorsClient(false)
    }

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

        setEditClient({
            ...editClient,
            [e.target.name]:e.target.value
        })

        setErrorsClient(
            validateClient({
                ...editClient,
                [e.target.name]: e.target.value,
            })
        )

    }

    function handleSubmit(){
        
        if(Object.keys(errorsClient).length === 0 && editClient.name){
            setCatchErrorsClient(false)
            dispatch(edit_client(editClient.id, editClient))
            .then(
                setEditClient({
                })
            )
            .then(
                Swal.fire(
                    'Cliente editado correctamente!',
                    '',
                    'success'
                )
            )
            
            setShowEdit(false)
        }else{
            setCatchErrorsClient(true)
        }
    }
    //
    //Mostrar sus presupuestos
    const [showPersonalBudgets, setShowPersonalBudgets] = useState(false);

    function handleShowBudgets(id){
        setShowPersonalBudgets(true)
        console.log(id)
        dispatch(get_budgets_by_client(id))
    }

    function handleCloseBudgets(){
        setShowPersonalBudgets(false)
    }

    return (
        <div className="col-md-5 mx-auto mt-5 container">
            <FilterClients 
                order = {order}
                setOrder={setOrder}
                typeOrder = {typeOrder}
                setTypeOrder = {setTypeOrder}
            />
            {
                my_clientes.length > 0 ?
                <>
                    <ListGroup>
                    {my_clientes?.map(e => 
                        <ListGroup.Item key={e.id} action className="d-flex justify-content-between align-items-start">
                            <div className="mt-2 me">{e.surname}, {e.name}</div>
                            <Stack direction="horizontal" gap={2}>
                                <Button className='mt-2 me' variant="primary" size="sm" onClick={() => handleShow(e)}>
                                    <IoOptions className='me'/>
                                </Button>
                                <Button className='mt-2 me' variant="success" size="sm" onClick={() => handleShowBudgets(e.id)}>
                                    <IoDocumentAttachOutline className='me'/>
                                </Button>
                                <Button className='mt-2 me' variant="danger" size="sm" onClick={() => handleDelete(e.id, e.name, e.surname)}>
                                    <IoTrash className='me'/>
                                </Button>
                            </Stack>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                </>
                :
                'No posees clientes actualmente.'
            }
        <Modal show={showEdit} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Col>
                            <Form.Group>
                                <Form.Label>Nombre:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='name'
                                    isInvalid={catchErrorsClient ? (errorsClient.name ? true : false) : false}
                                    value={editClient.name}
                                    placeholder={editClient.name}
                                    onChange={handleChange}
                                    className='form-control'
                                />
                                {catchErrorsClient ? (errorsClient.name ? 
                                        <Form.Control.Feedback type="invalid">
                                            {errorsClient.name}
                                        </Form.Control.Feedback> : 
                                        false) : 
                                <></>}
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Apellido:</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='surname'
                                    isInvalid={catchErrorsClient ? (errorsClient.surname ? true : false) : false}
                                    value={editClient.surname}
                                    placeholder={editClient.surname}
                                    onChange={handleChange}
                                    className='form-control'
                                />
                                {catchErrorsClient ? (errorsClient.surname ? 
                                        <Form.Control.Feedback type="invalid">
                                            {errorsClient.surname}
                                        </Form.Control.Feedback> : 
                                        false) : 
                                <></>}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                                <Form.Group as={Col}>
                                        <Form.Label>DNI/CUIT del cliente</Form.Label>
                                        <Form.Control
                                            className="form-control"
                                            type='text'
                                            name='dni'
                                            isInvalid={catchErrorsClient ? (errorsClient.dni ? true : false) : false}
                                            value={editClient.dni}
                                            onChange={handleChange}
                                        />
                                        {catchErrorsClient ? (errorsClient.dni ? 
                                            <Form.Control.Feedback type="invalid">
                                                {errorsClient.dni}
                                            </Form.Control.Feedback> : 
                                            false) : 
                                        <></>}
                                    
                                </Form.Group>
                                <Form.Group as={Col}>
                                    
                                    <Form.Label>Telefono: </Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='phone'
                                        className="form-control"
                                        value={editClient.phone}
                                        onChange={handleChange}
                                    />
                                        
                                    
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Dirección:</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='address'
                                        className="form-control"
                                        
                                        value={editClient.address}
                                        onChange={handleChange}
                                    />
                                    
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
                                    value={editClient.description}
                                    onChange={handleChange}
                                />
                                {catchErrorsClient ? (errorsClient.description ? 
                                            <Form.Control.Feedback type="invalid">
                                                {errorsClient.description}
                                            </Form.Control.Feedback> : 
                                            false) : 
                                <></>}
                            </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showPersonalBudgets} onHide={handleCloseBudgets}>
            <Modal.Header closeButton>
                <Modal.Title>Presuspuestos del usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            </Modal.Body>
        </Modal>
        </div>

    )
}

export default MyClients;