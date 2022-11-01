import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { get_articles_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'

export function MyArticles(){

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_articles_by_user(user_id))
        }
        
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const my_articles = useSelector(state => state.my_articles)

    return (
        <div>
            {
                my_articles.length > 0 ?
                <>
                    <ul>
                    {my_articles?.map(e => 
                        <li>{e.name}</li>
                    )}
                    </ul>
                </>
                :
                'No posees articulos actualmente.'
            }
        </div>
    )
}

export default MyArticles;