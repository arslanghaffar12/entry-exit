import { enums, storage } from '../../helpers/common';
import { actionTypes } from '../constant/action-types';


const defaultUser = { login: false, token: "" };
var user = storage.getParsed(enums.USER, defaultUser);






const initialState = {
    user: user,

};


export const auth = (state = initialState, { type, payload = {} }) => {
    switch (type) {
        case actionTypes.LOGIN:
            let user = payload;
            user.login = true;
            storage.set(enums.USER, user);
            return { ...state, user: user,  };
        case actionTypes.LOGOUT:
            return { ...state, user: defaultUser };
        default:
            return state;
    }
}

