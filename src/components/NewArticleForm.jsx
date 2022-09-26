import React from "react"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { add_product } from "../redux/actions"

export function NewArticleForm(){

    const dispatch = useDispatch()

    const [product, setProduct] = useState({
        name: '',
        quantity: 0,
        width: 0,
        height: 0,
        price:0
    })

    function handleChange(e){
        setProduct({
            ...product,
            [e.target.name]:e.target.value
        })
    }

    function addProduct(){
        dispatch(add_product(product))
        setProduct({
            name: '',
            quantity: 0,
            width: 0,
            height: 0,
            price:0
        })
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
                type='number' 
                placeholder="Ingrese cantidad"
                name='quantity'
                value={product.quantity}
                onChange={handleChange}
            />
            <input 
                type='number' 
                placeholder="Ingrese ancho del producto..."
                name='width'
                value={product.width}
                onChange={handleChange}
            />
            <input 
                type='number' 
                placeholder="Ingrese alto del producto..."
                name='height'
                value={product.height}
                onChange={handleChange}    
            />
            <input 
                type='number' 
                placeholder="Ingrese precio por unidad..." 
                name='price'
                value={product.price}
                onChange={handleChange} 
            />
            <button type="button" onClick={addProduct}>Agregar</button>
        </div>
    )
}