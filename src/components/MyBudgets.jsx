import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { approve_budget, delete_budget, get_budgets_by_user, unapprove_budget } from "../redux/actions";
import {useSelector} from 'react-redux'

//PDF
import { PDFDownloadLink } from '@react-pdf/renderer';
import BudgetPDF from "./BudgetPDF";
//Bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { formatDate } from "../utilities";


export function MyBudgets(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_budgets_by_user(user_id))
        }
    }, [dispatch, approve_budget, unapprove_budget])

    

    const my_budgets = useSelector(state => state.budgets)

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

    function monto_total(articulos){
        let monto = 0

        articulos.map(e => monto += (e.type === 'quantity' ? parseInt(e.budgetArticle.price)*parseInt(e.budgetArticle.quantity) : parseInt(e.budgetArticle.price)))

        return monto
    }

    function eliminar_presupuesto(id){
        dispatch(delete_budget(id))
    }
    
    function aprobar_presupuesto(id){
        dispatch(approve_budget(id))
    }

    function desaprobar_presupuesto(id){
        dispatch(unapprove_budget(id))
        
    }

    return (
        <div gap={2} className="col-md-5 mx-auto mt-5 container">
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
                        <Card.Subtitle>{`$${monto_total(e.list_budget)}`}</Card.Subtitle>   
                    </Card.Body>
                    <Card.Footer className="d-flex justify-content-between align-items-start">

                        <Button style={{textDecoration: 'none'}}>
                            <PDFDownloadLink 
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
                        

                        {
                            e.is_approved ?
                            <Button variant='danger' onClick={() => desaprobar_presupuesto(e.id)}>Desaprobar</Button>
                            :
                            <Button variant='success' onClick={() => aprobar_presupuesto(e.id)}>Aprobar</Button>
                        }

                        <Button variant='danger' onClick={() => eliminar_presupuesto(e.id)}>Eliminar</Button>
                    </Card.Footer>
                </Card>
            </>)}
        </div>
    )
}

export default MyBudgets;
