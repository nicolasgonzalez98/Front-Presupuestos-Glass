import React from "react"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { add_product } from "../redux/actions"

export function NewArticleForm(){

    function validate(input){
        let errors = {}

        if(!input.name){
            errors.name = 'Tu articulo no tiene nombre.'
        }

        if(!input.quantity){
            errors.quantity = 'No ingresaste cantidad del producto'
        }else if(Number.isNaN(parseInt(input.quantity))){
            errors.quantity = 'No ingresaste un numero valido de "cantidad"'
        }else if(parseInt(input.quantity) < 0){
            errors.quantity = 'La cantidad no puede ser menor a 0'
        }

        if(!input.weight){
            errors.weight = 'No ingresaste ancho del producto'
        }else if(Number.isNaN(parseInt(input.weight))){
            errors.weight = 'No ingresaste un numero valido de "ancho"'
        }else if(parseInt(input.weight) < 0){
            errors.weight = 'El peso no puede ser menor a 0'
        }

        if(!input.width){
            errors.width = 'No ingresaste ancho del producto'
        }else if(Number.isNaN(parseInt(input.width))){
            errors.width = 'No ingresaste un numero valido de "ancho"'
        }else if(parseInt(input.width) < 0){
            errors.width = 'El ancho no puede ser menor a 0'
        }

        if(!input.height){
            errors.height = 'No ingresaste alto del producto'
        }else if(Number.isNaN(parseInt(input.height))){
            errors.height = 'No ingresaste un numero valido de "alto"'
        }else if(parseInt(input.height) < 0){
            errors.height = 'La altura no puede ser menor a 0'
        }

        if(!input.price){
            errors.price = 'No ingresaste precio del producto'
        }else if(Number.isNaN(parseInt(input.price))){
            errors.price = 'No ingresaste un numero valido de "precio"'
        }else if(parseInt(input.price) < 0){
            errors.price = 'El precio no puede ser menor a 0'
        }

        return errors
    }

    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: '',
        quantity: '',
        weight: '',
        width: '',
        height: '',
        price:''
    })

    const [errors, setErrors] = useState({});

    function handleChange(e){
        setProduct({
            ...product,
            [e.target.name]:e.target.value
        })

        setErrors(
            validate({
                ...product,
                [e.target.name]: e.target.value,
            })
        );
    }

    function addProduct(){
        let log_error;
        if (Object.keys(errors).length === 0 && product.name) {
            dispatch(add_product(product))
            setProduct({
                name: '',
                quantity: '',
                width: '',
                weight: '',
                height: '',
                price:''
            })
        }else{
            log_error = 'Faltan datos obligatorios.'
        }
        
    }

    return (
        <div>
            <input 
                type='text' 
                placeholder='Nombre del articulo...'
                name='name'
                value={product.name}
                onChange={handleChange}
            />
            <input 
                type='text' 
                placeholder="Ingrese cantidad"
                name='quantity'
                value={product.quantity}
                onChange={handleChange}
            />
            <input 
                type='text' 
                placeholder="Ingrese peso"
                name='weight'
                value={product.weight}
                onChange={handleChange}
            />
            <input 
                type='text' 
                placeholder="Ingrese ancho del producto..."
                name='width'
                value={product.width}
                onChange={handleChange}
            />
            <input 
                type='text' 
                placeholder="Ingrese alto del producto..."
                name='height'
                value={product.height}
                onChange={handleChange}    
            />
            <input 
                type='text' 
                placeholder="Ingrese precio por unidad..." 
                name='price'
                value={product.price}
                onChange={handleChange} 
            />
            <button type="button" onClick={addProduct}>Agregar</button>
        </div>
    )
}