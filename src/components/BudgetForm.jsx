import React from "react";
import { useState } from "react";
import ArticleElement from "./ArticleElement";

export function BudgetForm(){

    

    function validate(){
        return ''
    }

    const [input, setInput] = useState({
        number_budget: 0,
        name: '',
        surname: '',
        articles: []
    })

    return (
        <div>
            <label>Nro. de presupuesto: </label>
            <input
                type='number'
                name='number_budget'
                placeholder='Presupuesto N°: ' 
                value={input.number_budget}
            />

            <label>Nombre: </label>
            <input
                type='text'
                name='name'
                placeholder='Nombre del cliente...' 
                value={input.name}
            />

            <label>Apellido: </label>
            <input
                type='text'
                name='surname'
                placeholder='Apellido del cliente...' 
                value={input.surname}
            />

            <div>
                <label>Articulos: </label>
                <ArticleElement />
            </div>
            
        </div>
    )
}