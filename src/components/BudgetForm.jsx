import React from "react";
import { useState } from "react";
import ArticleElement from "./ArticleElement";
import {useSelector} from 'react-redux'

export function BudgetForm(){

    const articulos = useSelector(state => state.articles)

    function validate(){
        return ''
    }

    const [input, setInput] = useState({
        number_budget: 0,
        name: '',
        surname: '',
        articles: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        input.articles = articulos
        setInput({
            number_budget: 0,
            name: '',
            surname: '',
            articles: []
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Nro. de presupuesto: </label>
            <input
                type='number'
                name='number_budget'
                placeholder='Presupuesto N°: ' 
                value={input.number_budget}
                onChange={handleChange}
            />

            <label>Nombre: </label>
            <input
                type='text'
                name='name'
                placeholder='Nombre del cliente...' 
                value={input.name}
                onChange={handleChange}
            />

            <label>Apellido: </label>
            <input
                type='text'
                name='surname'
                placeholder='Apellido del cliente...' 
                value={input.surname}
                onChange={handleChange}
            />

            <div>
                <label>Articulos: </label>
                <ArticleElement />
            </div>
            
            <input type='submit' value='Crear presupuesto'/>
        </form>
    )
}