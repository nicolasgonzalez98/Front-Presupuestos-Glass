import React, { useState, useEffect } from "react";
import ArticleElement from "./ArticleElement";
import {useSelector} from 'react-redux'
import BudgetPDF from "./BudgetPDF";
import { ClientInfo } from "./ClientInfo";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useDispatch } from 'react-redux';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { create_budget } from "../redux/actions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "../utilities";


export function BudgetForm(){

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }


    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const articulos = useSelector(state => state.articles)
    //ERRORES
    const [catchErrors, setCatchErrors] = useState(false)
    const [catchErrorsClient, setCatchErrorsClient] = useState(false)
    //////
    const [finished, setFinished] = useState(false)
    const [client, setClient] = useState({
        name: '',
        surname: '',
        dni: '',
        address: '',
        description: '',
        phone: '',
        userId: localStorage.getItem('id_user')
    })

    function validate(input){
        let errors = {}

        if(!input.number_budget){
            errors.number_budget = 'No ingresaste N° de presupuesto!'
        }

        return errors
    }

    

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

    const [input, setInput] = useState({
        number_budget: '',
        client: {},
        articles: [],
        iva: '0',
        userId: localStorage.getItem('id_user'),
        clientId: null,
        createdAt: formatDate(Date.now())
    })

    const [errors, setErrors] = useState({});
    const [errorsClient, setErrorsClient] = useState({});
    
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

    function handleSubmit(e){
        e.preventDefault()
        if (Object.keys(errors).length === 0 && Object.keys(errorsClient).length === 0
            && client.name && input.number_budget
        ){  
            setCatchErrors(false)
            setCatchErrorsClient(false)
            input.articles = articulos
            input.client = client
            setFinished(!finished)
        }else{
            if(Object.keys(errors).length > 0){
                setCatchErrors(true)
            }

            if(Object.keys(errorsClient).length > 0){
                console.log('entre aca')
                setCatchErrorsClient(true)
            }
            console.log(errorsClient)
            console.log('si aca')
        }
        
        
    }

    function handleIva(e){
        console.log(e.target.value)
        setInput({
            ...input,
            iva:e.target.value
        })
    }
        
    

    function confirmBudget(client){
        axios.post('clients/add_client', client)
        .then(res => {
            input.clientId = res.data.id
            dispatch(create_budget(input))
        })
        
        
    
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-3 container mb-3">
            {
                !finished ?
                <>
                    <Form onSubmit={handleSubmit}>
                        <h4 className="mb-3">Crear nuevo presupuesto</h4>
                        <Form.Group className="mb-3">
                            <Form.Label>Nro. de presupuesto:</Form.Label>
                            <Form.Control 
                                type='text'
                                name='number_budget'
                                placeholder='Presupuesto N°: ' 
                                value={input.number_budget}
                                onChange={handleChange}
                                className='form-control'
                                isInvalid={catchErrors ? (errors.number_budget ? true : false) : false}
                            />
                            {catchErrors ? (errors.number_budget ? 
                                <Form.Control.Feedback type="invalid">
                                    {errors.number_budget}
                                </Form.Control.Feedback> : 
                                false) : 
                            <></>}
                        </Form.Group>
                        
                        

                        <div className="mb-3">
                            <Form.Label>Cliente: </Form.Label>
                            <ClientInfo 
                                client={client}
                                setClient={setClient}
                                setErrorsClient={setErrorsClient}
                                validateClient={validateClient}
                                errorsClient={errorsClient}
                                catchErrorsClient={catchErrorsClient}
                                setCatchErrorsClient={setCatchErrorsClient}
                            />
                        </div>
                        <hr />

                        <div className="mb-3">
                            
                            <ArticleElement />
                        </div>

                        <Form.Group className="mb-3">
                            <FloatingLabel
                                controlId="floatingSelectGrid"
                                label="Desea aplicar IVA?"
                            >
                            <Form.Select size='sm'  onChange={handleIva} defaultValue='Monto IVA...'>
                                
                                <option value={'0'} name='0'>No</option>
                                <option value={'10.5'} name='10.5'>10.5%</option>
                                <option value={'21'} name='21'>21%</option>
                            </Form.Select>
                            </FloatingLabel>
                        </Form.Group>
                        
                        <Button type='submit' variant="success">Crear presupuesto</Button>
                    </Form>
                </> : 
                <>  
                <div className="col-md-5 mx-auto mt-5 container">
                    <h4>Vista previa</h4>
                    <PDFViewer width={'500px'} height={'500px'} position={'center'} className='mt-3 '>
                        <BudgetPDF
                            number_budget={input.number_budget}
                            articles={input.articles}
                            client={client}
                            iva={input.iva}
                            
                        />
                    </PDFViewer>
                    <PDFDownloadLink 
                        document={
                        <BudgetPDF
                            number_budget={input.number_budget}
                            articles={input.articles}
                            client={client}
                            iva={input.iva}
                        />
                    }
                        onClick={() => confirmBudget(client)}
                    >
                        Descargar PDF
                    </PDFDownloadLink>
                    <Button variant="primary" type="button" onClick={() => setFinished(!finished)}>Editar presupuesto</Button>
                </div>
                </>
            }
        </div>    
    )
}

export default BudgetForm;