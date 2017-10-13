import {GET_KITTIES_ERROR, GET_KITTIES_REQUEST, GET_KITTIES_SUCCESS, SELECT_KITTY} from '../constants/page'

const initialState = {
    selectedKitty: null,
    kitties: [],
    isDataError: false,
    isFetching: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_KITTIES_REQUEST:
            return {...state, isFetching: true}

        case GET_KITTIES_SUCCESS:
            try {
                const kitties = JSON.parse(action.payload)
                return {...state, kitties, isDataError: false, isFetching: false}
            }
            catch(e) {
                return {...state, kitties: null, isDataError: true, isFetching: false}
            }

        case GET_KITTIES_ERROR:
            return {...state, kitties: null, isDataError: true, isFetching: false}

        case SELECT_KITTY:
            return {...state, selectedKitty: action.payload}

        default:
            return state
    }
}