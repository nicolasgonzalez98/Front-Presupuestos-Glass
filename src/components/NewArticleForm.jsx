import React from "react"
import { useState } from "react"
import { useDispatch } from 'react-redux'
import { add_product } from "../redux/actions"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { capitalizeFirstLetter } from "../utilities";



export function NewArticleForm({articles}){

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
            errors.weight = 'No ingresaste peso del producto'
        }else if(Number.isNaN(parseInt(input.weight))){
            errors.weight = 'No ingresaste un numero valido de "peso"'
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
        price:'',
        userId: localStorage.getItem('id_user')
    })

    const [errors, setErrors] = useState({});
    const [catchErrors, setCatchErrors] = useState(false)

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
        
        let elemento_repetido = articles.find(e => e.name === capitalizeFirstLetter(product.name))
        
        if (Object.keys(errors).length === 0 && product.name && !elemento_repetido) {
            setCatchErrors(false)
            product.name = capitalizeFirstLetter(product.name)
            dispatch(add_product(product))
            setProduct({
                name: '',
                quantity: '',
                width: '',
                weight: '',
                height: '',
                price:'',
                userId: localStorage.getItem('id_user')
            })
        }else{
            setCatchErrors(true)
        }
        
    }

    return (
        <div>
            <h5 className="mb-3">Ingresar nuevo articulo</h5>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <FloatingLabel label='Nombre del articulo'>
                        <Form.Control 
                            type='text'
                            className="form-control"
                            //placeholder='Nombre del articulo...'
                            name='name'
                            value={product.name}
                            onChange={handleChange}
                            isInvalid={catchErrors ? (errors.name ? true : false) : false}
                        />
                        {catchErrors ? (errors.name ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>}
                    </FloatingLabel>
                    
                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel label='Cantidad del articulo'>
                    <Form.Control 
                        type='text'
                        className="form-control"
                        isInvalid={catchErrors ? (errors.quantity ? true : false) : false}
                        name='quantity'
                        value={product.quantity}
                        onChange={handleChange}
                    />
                    {catchErrors ? (errors.quantity ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.quantity}
                                    </Form.Control.Feedback> : 
                                    false) : 
                    <></>}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel label='Peso del articulo'>
                        <Form.Control 
                            type='text'
                            className="form-control" 
                            isInvalid={catchErrors ? (errors.weight ? true : false) : false}
                            name='weight'
                            value={product.weight}
                            onChange={handleChange}
                        />
                        {catchErrors ? (errors.weight ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.weight}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>}
                    </FloatingLabel>
                </Form.Group>
                
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>

                <FloatingLabel  label='Ancho del articulo'>
                    <Form.Control 
                        type='text'
                        className="form-control"
                        isInvalid={catchErrors ? (errors.width ? true : false) : false}
                        name='width'
                        value={product.width}
                        onChange={handleChange}
                    />
                    {catchErrors ? (errors.width ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.width}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>}
                </FloatingLabel>

                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel label='Alto del articulo'>
                        <Form.Control 
                            type='text'
                            className="form-control"
                            isInvalid={catchErrors ? (errors.height ? true : false) : false}
                            name='height'
                            value={product.height}
                            onChange={handleChange}    
                        />
                        {catchErrors ? (errors.height ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.height}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>}
                    </FloatingLabel>
                </Form.Group>
                <Form.Group as={Col}>
                    <FloatingLabel label='Precio del articulo'> 
                        <Form.Control 
                            type='text' 
                            className="form-control"
                            name='price'
                            value={product.price}
                            isInvalid={catchErrors ? (errors.price ? true : false) : false}
                            onChange={handleChange} 
                        />
                        {catchErrors ? (errors.price ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.price}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>}
                    </FloatingLabel>
                </Form.Group>
            </Row>
            
            
            
            
            <Button variant="primary" type="button" onClick={addProduct}>Agregar</Button>
            <hr />
        </div>
    )
}