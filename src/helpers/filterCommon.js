import { ArrowLeft, ArrowRight, Bookmark, Filter, Plus, Trash2, XCircle, ChevronLeft, ChevronsLeft, ChevronsRight, ChevronRight } from 'react-feather';
import moment from 'moment';



export const getStoresObject = (stores) => {
    let _stores = stores.slice();
    let sids = [];
    let includedFids = [];
    let exludedFids = [];
    let allFids = [];
    _stores?.map((row) => {
        sids.push(row.value);
        if (row.floors.length > 0) {
            for (let i = 0; i < row.floors.length; i++) {
                allFids.push(row.floors[i]?._id)
                if (row.floors[i] && row.floors[i].included && row.floors[i].included == true) {
                    includedFids.push(row.floors[i]?._id)
                }
                else if (row.floors[i] && row.floors[i].included == false) {
                    exludedFids.push(row.floors[i]?._id)
                }
            }
        }
    })

    let obj = {
        sids: sids,
        fids: allFids,
        includedFids: includedFids,
        exludedFids: exludedFids
    }

    return obj


}

export const getDifference = (from, to) => {
    if (from && to) {
        var start = moment(new Date(from.year, from.month - 1, from.day)).startOf("day");
        var end = moment(new Date(to.year, to.month - 1, to.day)).endOf("day");
        return Math.abs(end.diff(start, "days"));
    } else {
        return 0;
    }
}

export const getDateString = (dateObject, format = "YYYY-MM-DD HH:MM") => {
    return moment(new Date(dateObject?.year, dateObject?.month - 1, dateObject?.day)).startOf("day").format(format);
}

export const reportingDateFormat = (dateObject, filters) => { 
    
    console.log('filters',filters);
    console.log('dateObject',);

    let dateDifference = getDifference(filters.selected.selectedDayRange.from, filters.selected.selectedDayRange.to);


   if(dateDifference === 0){
    return moment(dateObject).format("ll HH:00")
   } else {
    return moment(dateObject).format("ll")
   }
 
}


export const getFloorFidAndSids = (options, fid) => {

    console.log('options', options, fid);
    let store;
    for (let i = 0; i < options.length; i++) {

        let currentStore = options[i];
        console.log('currentStore', currentStore);
        for (let y = 0; y < currentStore.floors.length; y++) {

            let currentFloor = currentStore.floors[y];
            console.log('currentFloor', currentFloor);
            if (currentFloor !== undefined && currentFloor && currentFloor._id === fid) {
                store = currentStore;
                break
            }
        }
        if (store !== undefined && store) {
            break
        }
    }

    if(store !== undefined && store){
        let fids = [];
        let sids = [];
        let obj = {
            fids : store.floors.map((item) => {return item._id}),
            sid : store._id
        }
        return obj
    }
    else {
        let obj = {
            sid : '',
            fids : []
        }
        return obj
    }
}



export const getSids = (stores) => {

    let _stores = stores.slice();
    return _stores?.map((row) => {
        return row.value
    })


}
export const getSidsInObject = (stores) => {

    let _stores = stores.slice();
    let sids = {};
    _stores.forEach((store) => {
        sids[store._id] = store._id
    })
    return sids
}

export const getFidsFormat2 = (store) => {
    let fidsInObject = {};
    let fidsInArray = store.floors.map((item) => {
        fidsInObject[item._id] = item._id;
        return item._id
    })
    let obj = {
        object: fidsInObject,
        array: fidsInArray
    }

    return obj;

}

export const getFidsInObject = (stores) => {

    let _stores = stores.slice();
    let fids = {};
    _stores.forEach((store) => {
        if ('floors' in store) {
            store.floors.forEach((floor) => {
                fids[floor._id] = floor._id
            })
        }
    })
    return fids
}

export const getIncludedFids = (stores) => {

    let _stores = stores.slice();
    let _includedFids = [];
    _stores?.map((row) => {
        if (row.floors.length > 0) {
            for (let i = 0; i < row.floors.length; i++) {
                if (row.floors[i] && row.floors[i].included && row.floors[i].included == true) {
                    _includedFids.push(row.floors[i]?._id)
                }
            }
        }

    })
    return _includedFids;


}

export const getExludedFids = (stores) => {
    let _stores = stores.slice();
    let _excludedFids = [];
    _stores?.map((row) => {
        if (row.floors.length > 0) {
            for (let i = 0; i < row.floors.length; i++) {
                if (row.floors[i] && row.floors[i].included == false) {
                    _excludedFids.push(row.floors[i]?._id)
                }
            }
        }

    })
    return _excludedFids;

}

export const convertObjectIntoArray = (item) => {

    let array = Object.keys(item ? item : {}).map((e) => { return e })
    return array
}

// export const getEndDate = (date) => {
//     if (date !== undefined && date) {
//         let _date = moment(new Date(date.year, date.month - 1, date.day)).endOf("day");
//         return _date;
//     }

// }

export const getEndDate = (date) => {
    if (date !== undefined && date) {
        let dateOffset = new Date().getTimezoneOffset()/60
        console.log(dateOffset,"datttdattt")
       let _start='';
        if(dateOffset < 0){
             _start = moment(new Date(date.year, date.month - 1, date.day)).endOf("day").add( Math.abs( dateOffset),'hours');

        }else{
             _start = moment(new Date(date.year, date.month - 1, date.day)).endOf("day").subtract(Math.abs( dateOffset),'hours');

        }
       
        return _start;
    }

}

export const getStartDate = (date) => {
    if (date !== undefined && date) {
        let dateOffset = new Date().getTimezoneOffset()/60
        console.log(dateOffset,"datttdattt")
       let _start='';
        if(dateOffset < 0){
             _start = moment(new Date(date.year, date.month - 1, date.day)).startOf("day").add( Math.abs( dateOffset),'hours');

        }else{
             _start = moment(new Date(date.year, date.month - 1, date.day)).startOf("day").subtract(Math.abs( dateOffset),'hours');

        }
       
        return _start;
    }

}







