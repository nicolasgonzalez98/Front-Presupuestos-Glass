import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { get_budgets_by_user } from "../redux/actions";
import {useSelector} from 'react-redux'

export function MyBudgets(){

    useEffect(() => {
        const user_id = localStorage.getItem('id_user')
        console.log(user_id)
        if(user_id === null || user_id === '0'){
            navigate('/')
        }else{
            dispatch(get_budgets_by_user(user_id))
        }
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const my_budgets = useSelector(state => state.budgets)
}

export default MyBudgets;
