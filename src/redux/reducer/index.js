import { ADD_PRODUCT, CREATE_BUDGET, CREATE_CLIENT, DELETE_ARTICLE, DELETE_CLIENT, EDIT_ARTICLE, EDIT_CLIENT, GET_ARTICLES_BY_USER, GET_BUDGETS_BY_CLIENT, 
    GET_BUDGETS_BY_USER, GET_CLIENTS_BY_USER, REMOVE_ELEMENT_FROM_LIST, ADD_ARTICLE_ON_QUEUE, DELETE_BUDGET, APPROVE_BUDGET, UNAPPROVE_BUDGET } from "../actions";

const initialState = {
    articles: [],
    my_articles: [],
    clients: [],
    budgets: [],
    budgets_client: [],
    articles_queue: []
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
        case EDIT_ARTICLE:
            let article_editted = action.payload.data
            
            
            let nuevo= state.my_articles.filter( e => e.id !== article_editted.id)
            nuevo = nuevo.concat(article_editted).sort((a,b) => a.id - b.id)
            
            return {
                ...state,
                my_articles: nuevo
            }
        case DELETE_ARTICLE:
            return {
                ...state,
                my_articles: state.my_articles.filter(e => e.id !== action.payload),
                
            }
        case ADD_ARTICLE_ON_QUEUE:
            state.articles_queue.push(action.payload);
            return {
                ...state,
            }
        ///////////////////////
        //CLIENTES
        case CREATE_CLIENT:
            return {
                ...state,
            }
        case DELETE_CLIENT:
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
            for(let i = 0; i < state.clients.length; i++){
                if(state.clients[i].id === elemento.id){
                    state.clients.splice(i, 1, elemento)
                }
            }
            console.log(state.clients)
            return {
                ...state,
                clients: [...state.clients]
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

        case DELETE_BUDGET:
            
            return {
                ...state,
                budgets: state.budgets.filter(e => e.id !== action.payload)
            }
        case APPROVE_BUDGET:
            let approve_budget = state.budgets.find(e => e.id === action.payload)
            approve_budget.is_approved = true
            return {
                ...state,
                budgets: [...state.budgets]
            }
        case UNAPPROVE_BUDGET:
            let unapprove_budget = state.budgets.find(e => e.id === action.payload)
            unapprove_budget.is_approved = false
            return {
                ...state,
                budgets: [...state.budgets]
            }
        default:
            return state
    }
}

export default rootReducer;