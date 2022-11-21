import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

export function ArticleCreate(){

    const navigate = useNavigate()

    useEffect(() => {
        let user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }


    }, [])

    const [article, setArticle] = useState({
        name: '',
        weight_price: '',
        area_price: '',
        unity_price: '',
        type: 'bulk',
        unity: 'M2',
        userId: localStorage.getItem('id_user')
    })

    function handleChange(e){
        setArticle({
            ...article,
            [e.target.name]:e.target.value
        })
    }

    function handleType(e){
        console.log(e.target.value)
        setArticle({
            ...article,
            type:e.target.value,
            unity: e.target.value === 'weight' ? 'KG' : e.target.value === 'bulk' ? 'M2' : 'U'
        })
    }

    function handleUnity(e){
        setArticle({
            ...article,
            unity: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        if(!article.name){
            console.log('No ingresaste el nombre!')
        }else{
            setArticle({
                ...article,
                area_price: article.type !== 'bulk' ? 0 : parseInt(article.area_price),
                weight_price: article.type !== 'weight' ? 0 : parseInt(article.weight_price),
                unity_price: article.type !== 'quantity' ? 0 : parseInt(article.unity_price)
            })

            axios.post('articles/add_article', article)
            .then(data => {
                console.log('Subido correctamente!')
            })
            .catch(err => {
                console.log('No se subio nada')
                console.log(err)
            })
        }



    }

    return (
        <div className="gap={2} col-md-5 mx-auto mt-5 container">
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del articulo:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder='Nombre del articulo' 
                        value={article.name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </Form.Group>

                <Form.Select onChange={handleType} className="mb-3">
                    <option value={'bulk'} name='bulk'>Por volumen</option>
                    <option value={'weight'} name='weight'>Por peso</option>
                    <option value={'quantity'} name='quantity'>Por unidad</option>
                </Form.Select>
                

                <Row className="mb-3">
                    {article.type === 'bulk' &&
                    <>
                        <Form.Group as={Col}>
                            <Form.Label>Precio por dimension:</Form.Label>
                            <input
                                type='text'
                                name='area_price'
                                placeholder='Precio por dimension' 
                                value={article.area_price}
                                onChange={handleChange}
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
                    {article.type === 'weight' &&
                    <>
                        <Form.Group as={Col}>
                            <Form.Label>Precio por peso:</Form.Label>
                            <input
                                type='text'
                                name='weight_price'
                                placeholder='Precio por peso' 
                                value={article.weight_price}
                                onChange={handleChange}
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
                    
                    {article.type === 'quantity' &&
                    <>
                        <Form.Group as={Col}>
                            <Form.Label>Precio por unidad:</Form.Label>
                            <input
                                type='text'
                                name='unity_price'
                                placeholder='Precio por unidad' 
                                value={article.unity_price}
                                onChange={handleChange}
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
                
                <Button variant="success" type="submit">Enviar</Button>
            </Form>
        </div>
    )
}

export default ArticleCreate;