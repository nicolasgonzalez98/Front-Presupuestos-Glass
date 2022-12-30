//Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { useDispatch } from 'react-redux';
import { filter_by_type_budgets } from '../redux/actions';

export function FilterBudgets({order, setOrder, typeOrder, setTypeOrder}){

    const dispatch = useDispatch()

    function handleSort(e){
        setOrder(e.target.value)
        dispatch(filter_by_type_budgets([e.target.value, typeOrder]))
    }

    function handleTypeSort(e){
        setTypeOrder(e.target.value)
        dispatch(filter_by_type_budgets([order, e.target.value]))
    }

    return (
        <Form>
            <Row className="mb-3">
                
                <Form.Group as={Col}>
                        <Form.Label>Filtrar:</Form.Label>
                        <Form.Select onChange={e => handleTypeSort(e)}>
                            <option value='date'>Fecha de modificacion</option> 
                            <option value='price'>Costo</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Ordenar por:</Form.Label>
                        <Form.Select onChange={e => handleSort(e)}>
                            <option value='desc'>Descendente</option>
                            <option value='asc'>Ascendente</option>
                            
                        </Form.Select>
                    </Form.Group>
                
            </Row>
        </Form>
    )
}