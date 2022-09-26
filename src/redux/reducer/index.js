import { ADD_PRODUCT } from "../actions";

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

        default:
            return state
    }
}

export default rootReducer;