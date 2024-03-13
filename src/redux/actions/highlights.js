import { actionTypes } from "../constant/action-types"

export const setLoading = (payload) => {
    return {
        type: actionTypes.LOADING,
        payload: payload
    }
}