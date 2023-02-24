import * as BaseActionType from '../controllers/BaseActionTypes'

const initalState = {
    searchMovie: []
}

const BaseReducer = (state = initalState, action) => {
    switch (action.type) {
        case BaseActionType.API_SEARCH_MOVIE_SUCCESS: {
            return {
                ...state,
                searchMovie: action.data
            }
        }
        default: return { ...state }
    }
}

export default BaseReducer