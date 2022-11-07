import React, { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
        unity_price: ''
    })

    return (
        <div className="gap={2} col-md-5 mx-auto mt-5 container">
            
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del articulo:</Form.Label>
                    <Form.Control
                        type='text'
                        name='name'
                        placeholder='Nombre del articulo' 
                        // value={input.number_budget}
                        // onChange={handleChange}
                        className='form-control'
                    />
                </Form.Group>

                <select>
                    <option>Por dimension</option>
                    <option>Por peso</option>
                    <option>Por unidad</option>
                </select>
                

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Precio por peso:</Form.Label>
                        <input
                            type='text'
                            name='weight_price'
                            placeholder='Precio por peso' 
                            // value={input.number_budget}
                            // onChange={handleChange}
                            className='form-control'
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Precio por dimension:</Form.Label>
                        <input
                            type='text'
                            name='area_price'
                            placeholder='Precio por dimension' 
                            // value={input.number_budget}
                            // onChange={handleChange}
                            className='form-control'
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Label>Precio por unidad:</Form.Label>
                        <input
                            type='text'
                            name='unity_price'
                            placeholder='Precio por unidad' 
                            // value={input.number_budget}
                            // onChange={handleChange}
                            className='form-control'
                        />
                    </Form.Group>
                </Row>
                
            </Form>
        </div>
    )
}

export default ArticleCreate;