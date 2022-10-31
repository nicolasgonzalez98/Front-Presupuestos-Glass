import { ADD_PRODUCT, CREATE_BUDGET, CREATE_CLIENT, GET_ARTICLES_BY_USER, GET_BUDGETS_BY_USER, GET_CLIENTS_BY_USER } from "../actions";

const initialState = {
    articles: [],
    my_articles: [],
    clients: [],
    budgets: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        //ARTICULOS
        case ADD_PRODUCT:
            return {
                ...state,
                articles: state.articles.concat(action.payload)
            }
        case GET_ARTICLES_BY_USER:
            return {
                ...state,
                my_articles: action.payload.data
            }
        ///////////////////////
        //CLIENTES
        case CREATE_CLIENT:
            return {
                ...state,
            }
        case GET_CLIENTS_BY_USER:
            return {
                ...state,
                clients: action.payload.data
            }
        ///////////////////////
        //PRESUPUESTOS
        case CREATE_BUDGET:
            return {
                ...state
            }
        case GET_BUDGETS_BY_USER: 
            return {
                ...state,
                budgets: action.payload.data
            }
        default:
            return state
    }
}

export default rootReducer;