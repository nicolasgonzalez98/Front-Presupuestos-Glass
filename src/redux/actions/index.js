import axios from 'axios'



export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_CLIENT= 'ADD_CLIENT'
export const CREATE_CLIENT = 'CREATE_CLIENT'
export const CREATE_BUDGET = 'CREATE_BUDGET'
export const GET_BUDGETS_BY_USER = 'GET_BUDGETS_BY_USER'
export const GET_CLIENTS_BY_USER = 'GET_CLIENTS_BY_USER'
export const GET_ARTICLES_BY_USER = 'GET_ARTICLES_BY_USER'
export const REMOVE_ELEMENT_FROM_LIST = 'REMOVE_ELEMENT_FROM_LIST'

//Productos

export function add_product(payload){
    return {
        type: ADD_PRODUCT,
        payload
    }
}

export function get_articles_by_user(id){
    return function(dispatch){
        return axios.get(`articles/${id}`)
        .then(data => {
            dispatch({
                type: GET_ARTICLES_BY_USER,
                payload: data
            })
        })
    }
}

export function remove_element_from_list(payload){
    return {
        type: REMOVE_ELEMENT_FROM_LIST,
        payload
    }
}

//Clientes

export function add_client(payload){
    return {
        type: ADD_CLIENT,
        payload
    }
}

export function create_client(payload){
    return function(dispatch){
        return axios.post('clients/add_client', payload)
        .then(data => {
            dispatch({
                type: CREATE_CLIENT,
                payload: data
            })
        })
    }
}

export function get_clients_by_user(id){
    return function(dispatch){
        return axios.get(`clients/${id}`)
        .then(data => {
            dispatch({
                type: GET_CLIENTS_BY_USER,
                payload: data
            })
        })
    }
}

//Presupuestos

export function create_budget(payload){
    return function(dispatch){
        return axios.post('budgets/add_budget', payload)
        .then(data => {
            dispatch({
                type: CREATE_BUDGET,
                payload: data
            })
        })
    }
}

export function get_budgets_by_user(id){
    return function(dispatch){
        return axios.get(`budgets/${id}`)
        .then(data => {
            dispatch({
                type: GET_BUDGETS_BY_USER,
                payload: data
            })
        })
    }
}