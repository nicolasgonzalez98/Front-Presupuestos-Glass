import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { active_loader, approve_budget, deactivate_loader, delete_budget, get_budgets_by_user, unapprove_budget } from "../redux/actions";
import {useSelector} from 'react-redux'
//PDF
import { PDFDownloadLink } from '@react-pdf/renderer';
import BudgetPDF from "./BudgetPDF";
//Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatDate, monto_total } from "../utilities";
import '../styles/budgets.css'
import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
import { FilterBudgets } from "./FilterBudgets";
import Swal from 'sweetalert2'

export function MyBudgets(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(active_loader())
        const user_id = localStorage.getItem('id_user')
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_budgets_by_user(user_id))
        }

        dispatch(deactivate_loader())
    }, [dispatch, approve_budget, unapprove_budget])

    

    const my_budgets = useSelector(state => state.filtered_budgets)

    const [order, setOrder] = useState('desc')
    const [typeOrder, setTypeOrder] = useState('date')

    function ordenar_articulos(articulos){
        let total = []
        let resultado = {}
        articulos?.map(e => {
            resultado.name = e.name
            resultado.quantity = e.budgetArticle.quantity
            resultado.weight = e.budgetArticle.weight
            resultado.width = e.budgetArticle.width
            resultado.height = e.budgetArticle.height
            resultado.price = e.budgetArticle.price
            total.push(resultado)
            resultado = {}
        })
        
        
        return total
    }

    

    function eliminar_presupuesto(id){
        Swal.fire({
            title: `Deseas eliminar el presupuesto?`,
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        })
        .then((result) => {
            if(result.isConfirmed){
                dispatch(active_loader())
                dispatch(delete_budget(id))
                dispatch(deactivate_loader())
                Swal.fire('Eliminado correctamente!', '', 'success')
            }
        })
        
    }
    
    function aprobar_presupuesto(id){
        dispatch(approve_budget(id))
    }

    function desaprobar_presupuesto(id){
        dispatch(unapprove_budget(id))
        
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">

            <FilterBudgets 
                order={order}
                setOrder={setOrder}
                typeOrder={typeOrder}
                setTypeOrder={setTypeOrder}
            />

            {my_budgets?.map(e => 
            
            <>
                <Card className="mx-3 mb-3">
                    <Card.Body>
                        <Card.Title>Presupuesto de {e.client.name + ' ' + e.client.surname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{formatDate(e.createdAt)}</Card.Subtitle>
                        <Card.Text>Articulos</Card.Text>
                        <ListGroup className="list-group-flush mb-3">
                            {e.list_budget?.map(e => 
                                <ListGroup.Item >{`${e.name} ($${e.type === 'quantity' ? parseInt(e.budgetArticle.price)*parseInt(e.budgetArticle.quantity) : e.budgetArticle.price})`}</ListGroup.Item>
                                )}
                        </ListGroup>
                        
                        <Card.Text>Monto total: </Card.Text>
                        <Card.Subtitle>{`$${monto_total(e)}`}</Card.Subtitle>   
                    </Card.Body>
                    <Card.Footer className="align-items-center">
                    <Row>
                    <Col xs='auto'>         
                        <Button variant="success" className="budgets">
                            <PDFDownloadLink 
                                className="budgets"
                                document={
                                <BudgetPDF
                                    number_budget={e.number_budget}
                                    articles={ordenar_articulos(e.list_budget)}
                                    client={e.client}
                                    iva={e.iva}
                                />
                                
                            }
                            >
                                Descargar PDF
                            </PDFDownloadLink> 
                        </Button>
                    </Col>
                    <Col xs='auto'>
                        {
                            e.is_approved ?
                            <Button variant='danger'  onClick={() => desaprobar_presupuesto(e.id)}>Desaprobar</Button>
                            :
                            <Button variant='success'  onClick={() => aprobar_presupuesto(e.id)}>Aprobar</Button>
                        }
                    </Col>
                    <Col xs='auto'>
                        <Button variant='danger' onClick={() => eliminar_presupuesto(e.id)}>Eliminar</Button>
                    </Col>
                    </Row>
                    </Card.Footer>
                </Card>
            </>)}
        </div>
    )
}

export default MyBudgets;
