import { monto_total, what_number_price } from "../../utilities";
import { ADD_PRODUCT, CREATE_BUDGET, CREATE_CLIENT, DELETE_ARTICLE, DELETE_CLIENT, EDIT_ARTICLE, EDIT_CLIENT, GET_ARTICLES_BY_USER, GET_BUDGETS_BY_CLIENT, 
    GET_BUDGETS_BY_USER, GET_CLIENTS_BY_USER, REMOVE_ELEMENT_FROM_LIST, ADD_ARTICLE_ON_QUEUE, DELETE_BUDGET, APPROVE_BUDGET, UNAPPROVE_BUDGET, FILTER_CLIENTS_BY_NAME, FILTER_CLIENTS_BY_TYPE, FILTER_ARTICLES_BY_TYPE, FILTER_ARTICLE_BY_NAME, FILTER_BUDGETS_BY_TYPE } from "../actions";

function sortNameAsc(a, b){
    let x = a.surname + ' '+a.name
    let y = b.surname + ' '+b.name

    
        if(x<y)return -1
        if(x>y)return 1

        return 0
        
    }

function sortNameDesc(a,b){
    let x = a.surname + ' '+a.name
    let y = b.surname + ' '+b.name

    if(x>y)return -1
    if(x<y)return 1
        
    return 0
}

function sortArtNameAsc(a,b){
    if(a.name<b.name)return -1
    if(a.name>b.name)return 1

    return 0
}

function sortArtNameDesc(a,b){
    if(a.name>b.name)return -1
    if(a.name<b.name)return 1

    return 0
}

function sortDateAsc(a, b){
    let x = new Date(a.updatedAt).getTime()
    let y = new Date(b.updatedAt).getTime()

    if(x<y)return -1
    if(x>y)return 1

    return 0
}

function sortDateDesc(a, b){
    let x = new Date(a.updatedAt).getTime()
    let y = new Date(b.updatedAt).getTime()

    if(x>y)return -1
    if(x<y)return 1

    return 0
}

function sortPriceAsc(a,b){
    let x = what_number_price(a)
    let y = what_number_price(b)

    if(x>y)return 1
    if(x<y)return -1

    return 0
}

function sortPriceDesc(a,b){
    let x = what_number_price(a)
    let y = what_number_price(b)

    if(x>y)return -1
    if(x<y)return 1 

    return 0
}

function sortCostDesc(a,b){
    if(monto_total(a) > monto_total(b))return -1
    if(monto_total(a) < monto_total(b))return 1
    return 0
}

function sortCostAsc(a,b){
    if(monto_total(a) > monto_total(b))return 1
    if(monto_total(a) < monto_total(b))return -1
    return 0
}



const initialState = {
    articles: [],
    my_articles: [],
    filtered_articles: [],
    clients: [],
    filtered_clients: [],
    budgets: [],
    filtered_budgets: [],
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
                my_articles: (action.payload.data).sort(sortArtNameAsc),
                filtered_articles: (action.payload.data).sort(sortArtNameAsc)
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
                filtered_articles: state.my_articles.filter(e => e.id !== action.payload)
            }
        case ADD_ARTICLE_ON_QUEUE:
            state.articles_queue.push(action.payload);
            return {
                ...state,
            }
        case FILTER_ARTICLE_BY_NAME:
            return {
                ...state,
                filtered_articles: state.my_articles.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case FILTER_ARTICLES_BY_TYPE:
            const [order, type_order] = action.payload
            let at, af;

            if(type_order === 'alph'){
                if(order === 'asc'){
                    at = state.my_articles.sort(sortArtNameAsc)
                    af = state.filtered_articles.sort(sortArtNameAsc)
                }else if(order === 'desc'){
                    at = state.my_articles.sort(sortArtNameDesc)
                    af = state.filtered_articles.sort(sortArtNameDesc)
                }
            }else if(type_order === 'date'){
                if(order==='asc'){
                    at = state.articles.sort(sortDateAsc)
                    af = state.filtered_articles.sort(sortDateAsc)
                }else if(order==='desc'){
                    at = state.articles.sort(sortDateDesc)
                    af = state.filtered_articles.sort(sortDateDesc)
                }
            }else if(type_order === 'price'){
                if(order === 'asc'){
                    at = state.articles.sort(sortPriceAsc)
                    af = state.filtered_articles.sort(sortPriceAsc)
                }else if(order === 'desc'){
                    at = state.articles.sort(sortPriceDesc)
                    af = state.filtered_articles.sort(sortPriceDesc)
                }
            }
            return {
                ...state,
                articles: at,
                filtered_articles: af
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
                filtered_clients: state.clients.filter(e => e.id !== action.payload)
            }
        case GET_CLIENTS_BY_USER:
            return {
                ...state,
                clients: (action.payload.data).sort(sortNameAsc),
                filtered_clients: (action.payload.data).sort(sortNameAsc)
            }
        case EDIT_CLIENT:
            let elemento = action.payload.data
            for(let i = 0; i < state.clients.length; i++){
                if(state.clients[i].id === elemento.id){
                    state.clients.splice(i, 1, elemento)
                }
            }
            return {
                ...state,
                clients: [...state.clients],
                filtered_clients: [...state.clients]
            }
        case FILTER_CLIENTS_BY_NAME:
            let lista = state.clients.filter(e => e.name.toLowerCase().includes(action.payload.toLowerCase()) 
                                            ||    e.surname.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                filtered_clients: lista
            }
        case FILTER_CLIENTS_BY_TYPE:
            const [ord, type_ord] = action.payload
            let ct, cf;
            
            if(type_ord === 'alph'){
                if(ord === 'asc'){
                    ct = state.clients.sort(sortNameAsc)
                    cf = state.filtered_clients.sort(sortNameAsc)
                }else if(ord === 'desc'){
                    ct = state.clients.sort(sortNameDesc)
                    cf = state.filtered_clients.sort(sortNameDesc)
                }
            }else if(type_ord === 'date'){
                
                if(ord==='asc'){
                    ct = state.clients.sort(sortDateAsc)
                    cf = state.filtered_clients.sort(sortDateAsc)
                }else if(ord==='desc'){
                    ct = state.clients.sort(sortDateDesc)
                    cf = state.filtered_clients.sort(sortDateDesc)
                }
            }

            return {
                ...state,
                clients: ct,
                filtered_clients: cf
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
                budgets: (action.payload.data).sort(sortDateDesc),
                filtered_budgets: (action.payload.data).sort(sortDateDesc)
            }
        case GET_BUDGETS_BY_CLIENT:
            return {
                ...state,
                budgets_client: action.payload.data
            }

        case DELETE_BUDGET:
            
            return {
                ...state,
                budgets: state.budgets.filter(e => e.id !== action.payload),
                filtered_budgets: state.filtered_budgets.filter(e => e.id !== action.payload)
            }
        case APPROVE_BUDGET:
            let approve_budget = state.budgets.find(e => e.id === action.payload)
            approve_budget.is_approved = true
            let approve_budgetf = state.filtered_budgets.find(e => e.id === action.payload)
            approve_budgetf.is_approved = true
            return {
                ...state,
                budgets: [...state.budgets],
                filtered_budgets: [...state.filtered_budgets]
            }
        case UNAPPROVE_BUDGET:
            let unapprove_budget = state.budgets.find(e => e.id === action.payload)
            unapprove_budget.is_approved = false
            let unapprove_budgetf = state.filtered_budgets.find(e => e.id === action.payload)
            unapprove_budgetf.is_approved = false
            return {
                ...state,
                budgets: [...state.budgets],
                filtered_budgets: [...state.filtered_budgets]
            }
        case FILTER_BUDGETS_BY_TYPE:
            const [ord_b, type_ordb] = action.payload
            let bt, bf;

            if(type_ordb === 'date'){
                if(ord_b==='desc'){
                    bt = state.budgets.sort(sortDateDesc)
                    bf = state.filtered_budgets.sort(sortDateDesc)
                }else if(ord_b === 'asc'){
                    bt = state.budgets.sort(sortDateAsc)
                    bf = state.filtered_budgets.sort(sortDateAsc)
                }
            }else if(type_ordb === 'price'){
                if(ord_b === 'desc'){
                    bt = state.budgets.sort(sortCostDesc)
                    bf = state.budgets.sort(sortCostDesc)
                }else if(ord_b==='asc'){
                    bt = state.budgets.sort(sortCostAsc)
                    bf = state.budgets.sort(sortCostAsc)
                }
            }

            return {
                ...state,
                budgets: bt,
                filtered_budgets: bf
            }
        default:
            return state
    }
}

export default rootReducer;