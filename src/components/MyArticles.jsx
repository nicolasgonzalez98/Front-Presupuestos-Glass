import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { delete_article, edit_article, get_articles_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { IoTrash, IoOptions, IoDocumentAttachOutline } from "react-icons/io5";
import Modal  from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Swal from 'sweetalert2'

export function MyArticles(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_articles_by_user(user_id))
        }
        
    },[dispatch,navigate])

    
    

    const my_articles = useSelector(state => state.my_articles)

    function what_is_the_price(articulo){
        if(articulo.type === 'quantity')return `$${articulo.unity_price} p/${articulo.unity}`

        if(articulo.type === 'bulk')return `$${articulo.area_price} p/${articulo.unity}`

        if(articulo.type === 'weight')return `$${articulo.weight_price} p/${articulo.unity}`
    }

    //Editar
    const [showEdit, setShowEdit] = useState(false);
    const [editArticle, setEditArticle] = useState({});
    const [errorsArticle, setErrorsArticle] = useState({});

    function handleClose(){
        setShowEdit(false)
        setEditArticle({})
        setErrorsArticle({})
    }

    function handleShow(article){
        setEditArticle(article)
        setShowEdit(true)
    }

    function validateArticle(input){

    }

    function handleChange(e){

        setEditArticle({
            ...editArticle,
            [e.target.name]:e.target.value
        })
    }

    function handleType(e){
        console.log(e.target.value)
        setEditArticle({
            ...editArticle,
            type:e.target.value,
            unity: e.target.value === 'weight' ? 'KG' : e.target.value === 'bulk' ? 'M2' : 'U'
        })
    }

    function handleUnity(e){
        setEditArticle({
            ...editArticle,
            unity: e.target.value
        })
    }

    function handleSubmit(){
        Swal.fire({
            title: 'Deseas guardar los cambios?',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.isConfirmed) {
                setEditArticle({
                    ...editArticle,
                    area_price: editArticle.type !== 'bulk' ? 0 : parseInt(editArticle.area_price),
                    weight_price: editArticle.type !== 'weight' ? 0 : parseInt(editArticle.weight_price),
                    unity_price: editArticle.type !== 'quantity' ? 0 : parseInt(editArticle.unity_price)
                })
                dispatch(edit_article(editArticle.id,editArticle))
                .then(setEditArticle({}))
                .then(Swal.fire('Articulo editado correctamente!', '', 'success'))

                setShowEdit(false)
            }
        })
    }
    
    //Eliminar
    function handleDelete(articulo){
        Swal.fire({
            title: `Deseas eliminar ${articulo.name}?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if (result.isConfirmed) {
                dispatch(delete_article(articulo.id))
                .then(Swal.fire('Articulo eliminado correctamente!', '', 'success'))
            }
        })
    }

    return (
        <div className="col-md-5 mx-auto mt-5 container">
            {
                my_articles.length > 0 ?
                <>
                    <ListGroup>
                    {my_articles?.map(e => 
                        <ListGroup.Item 
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                        <div>
                            <div className="fw-bold">{e.name}</div>
                            <p>{what_is_the_price(e)}</p>
                        </div>

                        <Stack direction="horizontal" gap={2}>
                            <Button className='mt-2 me' variant="primary" size="sm" onClick={() => {handleShow(e)}}>
                                <IoOptions className='me'/>
                            </Button>
                            <Button className='mt-2 me' variant="danger" size="sm" onClick={() => {handleDelete(e)}}>
                                    <IoTrash className='me'/>
                            </Button>
                        </Stack>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                </>
                :
                'No posees articulos actualmente.'
            }
            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar articulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                        <Form.Label>Nombre del articulo:</Form.Label>
                        <Form.Control
                            type='text'
                            name='name'
                            placeholder='Nombre del articulo' 
                            value={editArticle.name}
                            onChange={handleChange}
                            className='form-control'
                            disabled
                        />
                    </Form.Group>

                    <Form.Select onChange={handleType} className="mb-3">
                        <option value={'bulk'} name='bulk'>Por volumen</option>
                        <option value={'weight'} name='weight'>Por peso</option>
                        <option value={'quantity'} name='quantity'>Por unidad</option>
                    </Form.Select>
                    

                    <Row className="mb-3">
                        {editArticle.type === 'bulk' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por dimension:</Form.Label>
                                <input
                                    type='text'
                                    name='area_price'
                                    placeholder='Precio por dimension' 
                                    value={editArticle.area_price}
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
                        {editArticle.type === 'weight' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por peso:</Form.Label>
                                <input
                                    type='text'
                                    name='weight_price'
                                    placeholder='Precio por peso' 
                                    value={editArticle.weight_price}
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
                        
                        {editArticle.type === 'quantity' &&
                        <>
                            <Form.Group as={Col}>
                                <Form.Label>Precio por unidad:</Form.Label>
                                <input
                                    type='text'
                                    name='unity_price'
                                    placeholder='Precio por unidad' 
                                    value={editArticle.unity_price}
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
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" type="button" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MyArticles;