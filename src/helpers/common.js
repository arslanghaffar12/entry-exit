import { encryptStorage } from './encryptStorage'
import _logo from '../assets/logo.png'
import heatmap_ranges from "../assets/HeatmapRanges1.jpg"
import heatmap_demo from "../assets/heatmap.png"


export const logo = _logo;
export const heatmapRange = heatmap_ranges;
export const heatmapDemo = heatmap_demo

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



