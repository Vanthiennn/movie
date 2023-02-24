import * as ActionType from '../controllers/actionTypes'

const initalState = {
    movie: [],

    latestMovies: [],


    trendingMovies: [],

    detail: {},
    release: [],
    credits: {},
    genres: {},

    person: {},
    movieOfCast:[],
    episode:{}
}

const mainReducer = (state = initalState, action) => {
    switch (action.type) {
        case ActionType.API_GET_POPULAR_MOVIE_SUCCESS: {
            return {
                ...state,
                movie: action.data
            }
        }

        case ActionType.API_GET_LATEST_MOVIE_SUCCESS: {
            return {
                ...state,
                latestMovies: action.data
            }
        }

        case ActionType.API_GET_TRENDING_MOVIE_SUCCESS: {
            return {
                ...state,
                trendingMovies: action.data
            }
        }

        case ActionType.API_GET_DETAIL_MOVIE_SUCCESS: {
            return {
                ...state,
                detail: action.data
            }
        }

        case ActionType.API_GET_RELEASE_SUCCESS: {
            return {
                ...state,
                release: action.data
            }
        }

        case ActionType.API_GET_CREDIT_SUCCESS: {
            return {
                ...state,
                credits: action.data
            }
        }

        case ActionType.API_GET_MOVIE_OF_GENRES_SUCCESS: {
            return {
                ...state,
                genres: action.data
            }
        }
        case ActionType.API_GET_MOVIE_OF_PERSON_SUCCESS: {
            return {
                ...state,
                movieOfCast: action.data
            }
        }
        case ActionType.API_GET_DETAIL_OF_PERSON_SUCCESS: {
            return {
                ...state,
                person: action.data
            }
        }

        case ActionType.API_GET_DATA_OF_EPISODES_SUCCESS: {
            return {
                ...state,
                episode: action.data
            }
        }

        default: return { ...state }
    }
}

export default mainReducer