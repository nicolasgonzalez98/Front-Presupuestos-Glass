import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { get_clients_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import { IoTrash, IoOptions, IoDocumentAttachOutline } from "react-icons/io5";



export function MyClients(){

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_clients_by_user(user_id))
        }
        
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let my_clientes = useSelector(state => state.clients)

    function handleDelete(id){
        console.log(id)
    }

    return (
        <div className="col-md-5 mx-auto mt-5 container">
            {
                my_clientes.length > 0 ?
                <>
                    <ListGroup>
                    {my_clientes?.map(e => 
                        <ListGroup.Item action className="d-flex justify-content-between align-items-start">
                            {e.surname}, {e.name}
                            <Stack direction="horizontal" gap={2}>
                                <Button className='mt-2 me' variant="primary" size="sm" >
                                    <IoOptions />
                                </Button>
                                <Button className='mt-2 me' variant="success" size="sm" >
                                    <IoDocumentAttachOutline />
                                </Button>
                                <Button className='mt-2 me' variant="danger" size="sm" onClick={() => handleDelete(e.id)}>
                                    <IoTrash />
                                </Button>
                            </Stack>
                        </ListGroup.Item>
                    )}
                    </ListGroup>
                </>
                :
                'No posees clientes actualmente.'
            }
        </div>
    )
}

export default MyClients;