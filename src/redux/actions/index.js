import axios from 'axios'

export const ADD_PRODUCT = 'ADD_PRODUCT'

export function add_product(payload){
    return {
        type: ADD_PRODUCT,
        payload
    }
}