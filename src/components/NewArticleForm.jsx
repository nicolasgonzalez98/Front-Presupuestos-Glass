import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { add_articles_on_queue, add_product, get_articles_by_user } from "../redux/actions"
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from "react-bootstrap/Modal";
import { capitalizeFirstLetter } from "../utilities";



export function NewArticleForm({articles}){

    const dispatch = useDispatch()

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        dispatch(get_articles_by_user(user_id))
    }, [])

    let misArticulos = useSelector((state) => state.my_articles)
    let articulos_en_cola = useSelector((state) => state.articles_queue)

    let todos_articulos = misArticulos.concat(articulos_en_cola)

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

    const [newProduct, setNewProduct] = useState({
        name: '',
        weight_price: '',
        area_price: '',
        unity_price: '',
        type: 'bulk',
        unity: 'M2',
        userId: localStorage.getItem('id_user')
    })

    
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
            [e.target.name]:e.target.value,
            price: precioProductoAIngresar(newProduct, product, e.target.name, e.target.value)
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
        console.log(elemento_repetido)
        if (Object.keys(errors).length === 0 && product.name && !elemento_repetido) {
            console.log('entro aca?')
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
            setNewProduct({
                name: '',
                weight_price: '',
                area_price: '',
                unity_price: '',
                type: 'bulk',
                unity: 'M2',
                userId: localStorage.getItem('id_user')
            })
        }else{
            
            setCatchErrors(true)
        }
        
    }

    //Datos autocomplete

    function precioProducto(producto){
        if(producto.type === 'bulk'){
            return `$${producto.area_price} p/${producto.unity}`
        }else if(producto.type === 'weight'){
            return `$${producto.weight_price} p/${producto.unity}`
        }else{
            return `$${producto.unity_price} p/${producto.unity}`
        }
    }

    function seleccionarArticulo(e){

        if(!e.target.outerText && !e.target.defaultValue){
            setNewProduct({
                name: '',
                weight_price: '',
                area_price: '',
                unity_price: '',
                type: 'bulk',
                unity: 'M2',
                userId: localStorage.getItem('id_user')
            })

            setProduct({
                    name: '',
                    quantity: '',
                    weight: '',
                    width: '',
                    height: '',
                    price:'',
                    userId: localStorage.getItem('id_user')
            })
        }


        if(e.key !== 'Enter'){
            console.log(e.target.outerText)
            setNewProduct(todos_articulos[e.target.outerText.split(' ')[0]-1])
            
            
            setProduct({
                ...product,
                name: todos_articulos[e.target.outerText.split(' ')[0]-1].name,
                price: precioProductoAIngresar(todos_articulos[e.target.outerText.split(' ')[0]-1], product)
            })
           
            
        }else{
            setTimeout(() => {
                setNewProduct(todos_articulos[e.target.defaultValue.split(' ')[0]-1])
                
                setProduct({
                    ...product,
                    name: todos_articulos[e.target.defaultValue.split(' ')[0]-1].name,
                    price: precioProductoAIngresar(todos_articulos[e.target.defaultValue.split(' ')[0]-1], product)
                })
                
            }, 50)
        }

        
    }

    function precioProductoAIngresar(producto, medidas, key = '', value = ''){
        if(!producto.weight_price && !producto.area_price && !producto.unity_price){
            return '0'
        }

        if(producto.type === 'quantity'){
            return producto.unity_price.toString()
        }

        if(producto.type === 'weight'){
            if(key === 'weight' && producto.weight_price){
                if(!value)return '0'

                let precio_peso = parseInt(producto.weight_price)
                let peso_prod = parseInt(value)

                return (precio_peso*peso_prod).toString()
            }

            if(medidas.weight && producto.weight_price){
                let precio_peso = parseInt(producto.weight_price)
                let peso_prod = parseInt(medidas.weight)

                return (precio_peso*peso_prod).toString()
            }
        }

        if(producto.type === 'bulk'){
            
            if(key === 'width' && producto.area_price){
                if(!value)return '0'

                let precio_area = parseFloat(producto.area_price)
                let ancho_prod = parseFloat(value)

                if(medidas.height){
                    return (precio_area*(ancho_prod*medidas.height).toFixed(2)).toString()
                }else{
                    return '0'
                }


            }else if(key === 'height' && producto.area_price){
                if(!value)return '0'

                let precio_area = parseFloat(producto.area_price)
                let alto_prod = parseFloat(value)
                if(medidas.width){
                    return (precio_area*(alto_prod*medidas.width).toFixed(2)).toString()
                }else{
                    return '0'
                }
            }
        }

        return '0'
    }

    const [showCreateArticle, setShowCreateArticle] = useState(false);

    function handleCloseCreateArticle(){
        setNewProduct({
            name: '',
            weight_price: '',
            area_price: '',
            unity_price: '',
            type: 'bulk',
            unity: 'M2',
            userId: localStorage.getItem('id_user')
        })
        setShowCreateArticle(false)
    }

    function handleOpenCreateArticle(){
        setShowCreateArticle(true)
    }

    //Creacion nuevo articulo
    function handleChangeNewProduct(e){
        setNewProduct({
            ...newProduct,
            [e.target.name]:e.target.value
        })
    }

    function handleType(e){
        
        setNewProduct({
            ...newProduct,
            type:e.target.value,
            unity: e.target.value === 'weight' ? 'KG' : e.target.value === 'bulk' ? 'M2' : 'U'
        })
    }


    function handleUnity(e){
        setNewProduct({
            ...newProduct,
            unity: e.target.value
        })
    }

    function onSubmitNewArticle(){
        let elemento_repetido = todos_articulos.find(e => e.name === capitalizeFirstLetter(newProduct.name))
        if(!newProduct.name){
            console.log('No ingresaste el nombre!')
        }else if(elemento_repetido){
            console.log('Ya esta!')
        }else{
            newProduct.name = capitalizeFirstLetter(newProduct.name)
            dispatch(add_articles_on_queue(newProduct))
            setShowCreateArticle(false)
            setProduct({
                ...product,
                name: newProduct.name
            })
        }
    }
    


    return (
        <div>
            <h5 className="mb-3">Ingresar nuevo articulo</h5>
            
            <Row className="mb-3">
                <Col>
                <Autocomplete
                    size="medium"
                    id="clear-on-escape"
                    clearOnEscape
                    options={todos_articulos.map((option, id) => `${id+1} - ${option.name} (${precioProducto(option)})`)}
                    onChange={(e) => {seleccionarArticulo(e)}}
                    value={(newProduct.name && newProduct.type) ? 
                            `${newProduct.name} - (${precioProducto(newProduct)})`    
                        :''
                    }
                    renderInput={(params) => (
                        <TextField {...params}  variant="standard" />
                    )}
                />
                </Col>
                <Col xs lg="1">
                    <Button size='sm' className='me' variant="primary" onClick={() => {handleOpenCreateArticle()}}>
                        ...
                    </Button>
                </Col>        
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <FloatingLabel label='Nombre del articulo'>
                        <Form.Control 
                            type='text'
                            className="form-control"
                            disabled
                            name='name'
                            value={product.name}
                            //onChange={handleChange}
                            //isInvalid={catchErrors ? (errors.name ? true : false) : false}
                        />
                        {/* {catchErrors ? (errors.name ? 
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name}
                                    </Form.Control.Feedback> : 
                                    false) : 
                        <></>} */}
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
                            disabled
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

            <Modal show={showCreateArticle} onHide={handleCloseCreateArticle}>
                <Modal.Header closeButton>Agregar articulo</Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre del articulo:</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder='Nombre del articulo' 
                            value={newProduct.name}
                            onChange={handleChangeNewProduct}
                            className='form-control'
                        />
                    </Form.Group>

                    <Form.Select 
                        onChange={handleType} 
                        className="mb-3"
                    >
                        <option value={'bulk'} name='bulk'>Por volumen</option>
                        <option value={'weight'} name='weight'>Por peso</option>
                        <option value={'quantity'} name='quantity'>Por unidad</option>
                    </Form.Select>
                    

                    <Row className="mb-3">
                        {newProduct.type === 'bulk' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por dimension:</Form.Label>
                                <input
                                    type='text'
                                    name='area_price'
                                    placeholder='Precio por dimension' 
                                    value={newProduct.area_price}
                                    onChange={handleChangeNewProduct}
                                    className='form-control'
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Unidad:</Form.Label>
                                <Form.Select onChange={handleUnity}>
                                    <option>M2</option>
                                    <option>CM2</option>
                                </Form.Select>
                            </Form.Group>
                        </>
                        }
                        {newProduct.type === 'weight' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por peso:</Form.Label>
                                <input
                                    type='text'
                                    name='weight_price'
                                    placeholder='Precio por peso' 
                                    value={newProduct.weight_price}
                                    onChange={handleChangeNewProduct}
                                    className='form-control'
                                />
                            </Form.Group>
                                <Form.Group as={Col}>
                                <Form.Label>Unidad:</Form.Label>
                                <Form.Select onChange={handleUnity}>
                                    <option>KG</option>
                                    <option>GR</option>
                                </Form.Select>
                            </Form.Group>
                        </>
                        }
                        
                        {newProduct.type === 'quantity' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por unidad:</Form.Label>
                                <input
                                    type='text'
                                    name='unity_price'
                                    placeholder='Precio por unidad' 
                                    value={newProduct.unity_price}
                                    onChange={handleChangeNewProduct}
                                    className='form-control'
                                />
                            </Form.Group>
                            
                            <Form.Group as={Col}>
                                <Form.Label>Unidad:</Form.Label>
                                <Form.Select disabled>
                                    <option>p/ Unidad</option>
                                </Form.Select>
                            </Form.Group>
                        </>
                        }
                        
                        
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={handleCloseCreateArticle}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" onClick={onSubmitNewArticle}> 
                        Guardar cambios
                    </Button>
                </Modal.Footer>

            </Modal> 
            
            
            
            
            <Button variant="primary" type="button" onClick={addProduct}>Agregar</Button>
            <hr />
        </div>
    )
}