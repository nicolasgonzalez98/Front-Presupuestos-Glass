import axios from 'axios'



export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_CLIENT= 'ADD_CLIENT'
export const CREATE_CLIENT = 'CREATE_CLIENT'
export const CREATE_BUDGET = 'CREATE_BUDGET'
export const GET_BUDGETS_BY_USER = 'GET_BUDGETS_BY_USER'
export const GET_CLIENTS_BY_USER = 'GET_CLIENTS_BY_USER'
export const GET_ARTICLES_BY_USER = 'GET_ARTICLES_BY_USER'
export const REMOVE_ELEMENT_FROM_LIST = 'REMOVE_ELEMENT_FROM_LIST'
export const DELETE_CLIENT = 'DELETE_CLIENT'
export const EDIT_CLIENT = 'EDIT_CLIENT'
export const GET_BUDGETS_BY_CLIENT = 'GET_BUDGETS_BY_CLIENT'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const ADD_ARTICLE_ON_QUEUE = 'ADD_ARTICLE_ON_QUEUE'
export const DELETE_BUDGET = 'DELETE_BUDGET'
export const APPROVE_BUDGET = 'APPROVE_BUDGET'
export const UNAPPROVE_BUDGET = 'UNAPPROVE_BUDGET'
export const FILTER_CLIENTS_BY_NAME = 'FILTER_CLIENTS_BY_NAME'
export const FILTER_CLIENTS_BY_TYPE = 'FILTER_CLIENTS_BY_TYPE'
export const FILTER_ARTICLES_BY_TYPE = 'FILTER_ARTICLES_BY_TYPE'
export const FILTER_ARTICLE_BY_NAME = 'FILTER_ARTICLE_BY_NAME'
export const FILTER_BUDGETS_BY_TYPE = 'FILTER_BUDGETS_BY_TYPE'
export const ACTIVE_LOADER = 'ACTIVE_LOADER'
export const DISACTIVE_LOADER = 'DISACTIVE_LOADER'
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

export function edit_article(id, payload){
    return function(dispatch){
        return axios.put(`articles/edit_article/${id}`, payload)
        .then(data => {
            dispatch({
                type: EDIT_ARTICLE,
                payload: data
            })
        })
    }
}

export function delete_article(id){
    return function(dispatch){
        return axios.delete(`articles/delete_article/${id}`)
        .then(data => {
            dispatch({
                type: DELETE_ARTICLE,
                payload: id
            })
        })
    }
}

export function add_articles_on_queue(article){
    return function(dispatch){
        dispatch({
            type: ADD_ARTICLE_ON_QUEUE,
            payload: article
        })
    }
}

export function filter_article_by_name(name){
    return function(dispatch){
        return dispatch({
            type: FILTER_ARTICLE_BY_NAME,
            payload: name
        })
    }
}

export function filter_by_type_articles(data){
    return function(dispatch){
        return dispatch({
            type: FILTER_ARTICLES_BY_TYPE,
            payload: data
        })
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

export function delete_client(id){
    return function(dispatch){
        return axios.delete(`clients/delete/${id}`)
        .then(data => {
            console.log(data)
            dispatch({
                type: DELETE_CLIENT,
                payload: id
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

export function edit_client(id, info){
    return function(dispatch){
        return axios.put(`clients/update/${id}`, info)
        .then(data => {
            dispatch({
                type: EDIT_CLIENT,
                payload: data
            })
        })
    }
}

export function filter_clients_by_name(name){
    return function(dispatch){
        return dispatch({
            type: FILTER_CLIENTS_BY_NAME,
            payload: name
        })
    }
}

export function filter_by_type_clients(data){
    return function(dispatch){
        return dispatch({
            type: FILTER_CLIENTS_BY_TYPE,
            payload: data
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

export function get_budgets_by_client(id){
    return function(dispatch){
        return axios.get(`budgets/client/${id}`)
        .then(data => {
            dispatch({
                type: GET_BUDGETS_BY_CLIENT,
                payload: data
            })
        })
    }
}

export function delete_budget(id){
    return function(dispatch){
        return axios.delete(`budgets/delete_budget/${id}`)
        .then(data => {
            
            dispatch({
                type: DELETE_BUDGET,
                payload: id
            })
        })
    }
}

export function approve_budget(id){
    return function(dispatch){
        return axios.put(`budgets/approve_budget/${id}`)
        .then(() => {
            dispatch({
                type: APPROVE_BUDGET,
                payload: id
            })
        })
    }
}

export function unapprove_budget(id){
    return function(dispatch){
        return axios.put(`budgets/unapprove_budget/${id}`)
        .then(() => {
            dispatch({
                type: UNAPPROVE_BUDGET,
                payload: id
            })
        })
    }
}

export function filter_by_type_budgets(data){
    return function(dispatch){
        return dispatch({
            type: FILTER_BUDGETS_BY_TYPE,
            payload: data
        })
    }
}

//Loader

export function active_loader(){
    return function(dispatch){
        return dispatch({
            type: ACTIVE_LOADER
        })
    }
}

export function deactivate_loader(){
    return function(dispatch){
        return dispatch({
            type: DISACTIVE_LOADER
        })
    }
}