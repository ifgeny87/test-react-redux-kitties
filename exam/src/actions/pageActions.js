import {GET_KITTIES_REQUEST, GET_KITTIES_SUCCESS, GET_KITTIES_ERROR, SELECT_KITTY} from '../constants/page'

export function getKitties() {
    return (dispatch) => {
        dispatch({
            type: GET_KITTIES_REQUEST,
            payload: null
        })

        // выполняем запрос
        const xhr = new XMLHttpRequest()

        xhr.open('GET', '/api/tiles', true)

        xhr.onload = function () {
            dispatch({
                type: xhr.status === 200 ? GET_KITTIES_SUCCESS : GET_KITTIES_ERROR,
                payload: xhr.responseText
            })
        }

        xhr.onerror = function() {
            dispatch({
                type: GET_KITTIES_ERROR,
                payload: xhr.responseText
            })
        }

        xhr.send()
    }
}

export function selectKitty(index) {
    return (dispatch) => {
        dispatch({
            type: SELECT_KITTY,
            payload: index
        })
    }
}