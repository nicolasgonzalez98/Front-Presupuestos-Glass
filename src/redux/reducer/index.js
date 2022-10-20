import { ADD_PRODUCT, CREATE_CLIENT } from "../actions";

const initialState = {
    articles: []
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_PRODUCT:
            return {
                ...state,
                articles: state.articles.concat(action.payload)
            }
        case CREATE_CLIENT:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default rootReducer;