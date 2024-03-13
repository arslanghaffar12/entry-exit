import { actionTypes } from '../constant/action-types';








const initialState = {
    loading: false,

};


export const highlights = (state = initialState, { type, payload = {} }) => {
    switch (type) {
        case actionTypes.LOADING:
            return { ...state, loading: payload };

        default:
            return state;
    }
}

