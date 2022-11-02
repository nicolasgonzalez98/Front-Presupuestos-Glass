import Button from 'react-bootstrap/Button';
import React from "react";

import ListGroup from 'react-bootstrap/ListGroup';
import { IoTrash } from "react-icons/io5";

import Form from 'react-bootstrap/Form';

import {useDispatch, useSelector} from 'react-redux'
import { NewArticleForm } from "./NewArticleForm";
import { remove_element_from_list } from '../redux/actions';

const ArticleElement = () => {

    
    const my_products = useSelector(state => state.articles)

    function handleTrash(name){
        dispatch(remove_element_from_list(name))
    }

    const dispatch = useDispatch()

   

    return (
        <>
        {my_products.length > 0 &&
                <>
                    
                
        <ListGroup className='mb-3' as="ol">
                <Form.Label>Articulos: </Form.Label>
                {my_products?.map((e, index) =>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        key={index}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{e.name}</div>
                                Precio: {e.price}
                            </div>
                            <Button className='mt-2 me' variant="secondary" size="sm" onClick={() => handleTrash(e.name)}>
                                <IoTrash />
                            </Button>
                    </ListGroup.Item>
                )}
            
        </ListGroup>
        <hr />
        </>}
        <NewArticleForm 
            articles={my_products}
        />
        
        </>
    )
}

export default ArticleElement