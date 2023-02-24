import * as AccountActionType from '../controllers/actionsType'

const initalState = {
    detail: {}
}

const AccountReducer = (state = initalState, action) => {
    switch (action.type) {
        case AccountActionType.GET_DETAIL_ACCOUNT_SUCCESS: {
            return {
                ...state,
                detail: action.data
            }
        }
        default: return { ...state }
    }
}

export default AccountReducer