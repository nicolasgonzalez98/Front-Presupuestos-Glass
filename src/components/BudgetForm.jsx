import React from "react";
import { useState } from "react";
import ArticleElement from "./ArticleElement";
import {useSelector} from 'react-redux'
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPDF from "./BudgetPDF";
import { ClientInfo } from "./ClientInfo";

//Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function BudgetForm(){

    const articulos = useSelector(state => state.articles)
    const [finished, setFinished] = useState(false)
    const [client, setClient] = useState({
        name: '',
        surname: '',
        dni: '',
        address: '',
        description: '',
        phone: ''
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

    const [input, setInput] = useState({
        number_budget: '',
        client: {},
        articles: []
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
            input.articles = articulos
            input.client = client
            setFinished(!finished)
        }else{
            console.log('No entro')
        }
        
        
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
                            <input
                                type='text'
                                name='number_budget'
                                placeholder='Presupuesto N°: ' 
                                value={input.number_budget}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </Form.Group>
                        
                        

                        <div className="mb-3">
                            <Form.Label>Cliente: </Form.Label>
                            <ClientInfo 
                                client={client}
                                setClient={setClient}
                                setErrorsClient={setErrorsClient}
                                validateClient={validateClient}
                                errorsClient={errorsClient}
                            />
                        </div>
                        <hr />

                        <div className="mb-3">
                            
                            <ArticleElement />
                        </div>
                        
                        <Button type='submit' variant="success">Crear presupuesto</Button>
                    </Form>
                </> : 
                <>  

                    <PDFDownloadLink 
                        document={
                        <BudgetPDF 
                            number_budget={input.number_budget}
                            articles={input.articles}
                            client={client}
                        />
                    }
                    >
                        Descargar PDF
                    </PDFDownloadLink>
                </>
            }
        </div>    
    )
}

export default BudgetForm;