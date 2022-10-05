import React from "react";
import { useState } from "react";
import ArticleElement from "./ArticleElement";
import {useSelector} from 'react-redux'
import { PDFDownloadLink } from "@react-pdf/renderer";
import BudgetPDF from "./BudgetPDF";

export function BudgetForm(){

    const articulos = useSelector(state => state.articles)
    const [finished, setFinished] = useState(false)

    function validate(input){
        let errors = {}

        if(!input.number_budget){
            errors.number_budget = 'No ingresaste N° de presupuesto!'
        }


        return errors
    }

    const [input, setInput] = useState({
        number_budget: '',
        articles: []
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

    function handleSubmit(e){
        e.preventDefault()
        input.articles = articulos
        setFinished(!finished)
        
    }

    return (
        <div className="BudgetForm">
            {
                !finished ?
                <>
                    <form onSubmit={handleSubmit}>
                        <label>Nro. de presupuesto: </label>
                        <input
                            type='text'
                            name='number_budget'
                            placeholder='Presupuesto N°: ' 
                            value={input.number_budget}
                            onChange={handleChange}
                        />

                        

                        <div>
                            <label>Articulos: </label>
                            <ArticleElement />
                        </div>
                        
                        <input type='submit' value='Crear presupuesto'/>
                    </form>
                </> : 
                <>  

                    <PDFDownloadLink 
                        document={
                        <BudgetPDF 
                            number_budget={input.number_budget}
                            articles={input.articles}
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