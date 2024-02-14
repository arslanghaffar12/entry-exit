import { actionTypes } from "../constant/action-types"

export const setLogin = (payload) => {
    return {
        type: actionTypes.LOGIN,
        payload: payload
    }
}

export const setLogout = (payload) => {
    return {
        type: actionTypes.LOGOUT,
        payload: payload
    }
}

