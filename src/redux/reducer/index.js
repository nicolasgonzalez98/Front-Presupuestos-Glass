import { ADD_PRODUCT, CREATE_BUDGET, CREATE_CLIENT, DELETE_CLIENT, EDIT_CLIENT, GET_ARTICLES_BY_USER, GET_BUDGETS_BY_CLIENT, GET_BUDGETS_BY_USER, GET_CLIENTS_BY_USER, REMOVE_ELEMENT_FROM_LIST } from "../actions";

const initialState = {
    articles: [],
    my_articles: [],
    clients: [],
    budgets: [],
    budgets_client: []
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
        case REMOVE_ELEMENT_FROM_LIST:
            
            return {
                ...state,
                articles: state.articles.filter(e => e.name !== action.payload)
            }
        ///////////////////////
        //CLIENTES
        case CREATE_CLIENT:
            return {
                ...state,
            }
        case DELETE_CLIENT:
            console.log(action.payload)
            return {
                ...state,
                clients: state.clients.filter(e => e.id !== action.payload),
                
            }
        case GET_CLIENTS_BY_USER:
            return {
                ...state,
                clients: action.payload.data
            }
        case EDIT_CLIENT:
            let elemento = action.payload.data
            console.log(elemento)
            for(let i = 0; i < state.clients.length; i++){
                if(state.clients[i].id === elemento.id){
                    state.clients.splice(i, 1, elemento)
                }
            }
            console.log(state.clients)
            return {
                ...state,
                clients: state.clients
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
        case GET_BUDGETS_BY_CLIENT:
            return {
                ...state,
                budgets_client: action.payload.data
            }
        default:
            return state
    }
}

export default rootReducer;