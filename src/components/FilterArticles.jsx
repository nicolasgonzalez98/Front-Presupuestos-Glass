import { useState } from "react";
import { useDispatch } from "react-redux";

//Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { filter_article_by_name, filter_by_type_articles } from "../redux/actions";

export function FilterArticles({order, setOrder, typeOrder, setTypeOrder}){
    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    function handleOnChangeSearch(e){
        e.preventDefault()
        setSearch(e.target.value)
        dispatch(filter_article_by_name(e.target.value))
    }

    function handleSort(e){
        setOrder(e.target.value)
        dispatch(filter_by_type_articles([e.target.value, typeOrder]))
    }

    function handleTypeSort(e){
        setTypeOrder(e.target.value)
        dispatch(filter_by_type_articles([order, e.target.value]))
    }

    return (
        <Form>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Buscar por nombre</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={handleOnChangeSearch}
                            value={search}
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Filtrar:</Form.Label>
                        <Form.Select onChange={e => handleTypeSort(e)}>
                            <option value='alph'>Alfabeticamente</option>
                            <option value='date'>Fecha de modificacion</option>
                            <option value='price'>Precio</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Ordenar por:</Form.Label>
                        <Form.Select onChange={e => handleSort(e)}>
                            <option value='asc'>Ascendente</option>
                            <option value='desc'>Descendente</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
        </Form>
    )
}