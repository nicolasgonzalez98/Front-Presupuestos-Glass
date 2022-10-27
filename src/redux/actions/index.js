import axios from 'axios'



export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_CLIENT= 'ADD_CLIENT'
export const CREATE_CLIENT = 'CREATE_CLIENT'
export const CREATE_BUDGET = 'CREATE_BUDGET'

//Productos

export function add_product(payload){
    return {
        type: ADD_PRODUCT,
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