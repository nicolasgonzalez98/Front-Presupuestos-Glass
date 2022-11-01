import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { get_clients_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'

export function MyClients(){

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_clients_by_user(user_id))
        }
        
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let my_clientes = useSelector(state => state.clients)

    return (
        <div>
            {
                my_clientes.length > 0 ?
                <>
                    <ul>
                    {my_clientes?.map(e => 
                        <li>{e.surname}, {e.name}</li>
                    )}
                    </ul>
                </>
                :
                'No posees articulos actualmente.'
            }
        </div>
    )
}

export default MyClients;