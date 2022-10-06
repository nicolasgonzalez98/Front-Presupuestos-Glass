//import axios from 'axios'

export const ADD_PRODUCT = 'ADD_PRODUCT'
export const ADD_CLIENT= 'ADD_CLIENT'

export function add_product(payload){
    return {
        type: ADD_PRODUCT,
        payload
    }
}

export function add_client(payload){
    return {
        type: ADD_CLIENT,
        payload
    }
}