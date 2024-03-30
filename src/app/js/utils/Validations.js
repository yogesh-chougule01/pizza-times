export function notUndefinedAndNull(obj){
    return obj !== null && obj !== undefined;
}

export function undefinedOrNull(obj){
    return obj === null || obj === undefined;
}

export function undefinedOrZero(arr){
    return arr === null || arr === undefined || arr.length === 0;
}

export function emptyOrZero(number){
    return number === null || number === undefined || number === 0;
}

export function empty(str){
    return str === null || str === undefined || str === "" || str == "undefined";
}