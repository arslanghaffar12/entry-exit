import { encryptStorage } from './encryptStorage'
import _logo from '../assets/logo.png'

export const logo = _logo

export const storage = {
    set: (key, value) => {
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        encryptStorage.setItem(key, value);
    },
    get: (key, _default = null) => {
        var value = encryptStorage.getItem(key);
        if (value == undefined || value == null) {
            value = _default;
        }
        return value;
    },
    clear: () => {
        encryptStorage.clear();
    },
    getParsed: (key, _default = null) => {
        var value = encryptStorage.getItem(key);
        if (value == undefined || value == null) {
            value = _default;
        }
        return value;
    }
}

export const enums = {
    USER: "user",
    ROLE_ADMIN: "admin",

}



