export const isBlank = (str:string|null|undefined):boolean => {

    if(str === null || str === undefined){
        return true;
    }

    if(str.toString().trim().length === 0){
        return true;
    }

    return false;
}
