
export function Map2 (a : any[], b : any[], f : ((a :any, b :any) => any)) {
    if(a.length != b.length) {
        return [];
    }

    const ret = [];
    
    for(var i=0;i < a.length;i++){
        ret.push( f(a[i],b[i]));
    }

    return ret;
}

export function PrintArray(arr : any[], delimiter : string, mapFn ?: ((s : string) => string)) : string{
    if(arr.length == 0){
        return '';
    }

    var ret = mapFn? mapFn(arr[0]) : arr[0];
    for(var i=1;i<arr.length;i++){
        ret += delimiter + (mapFn ? mapFn(arr[i]) : arr[i]);
    }

    return ret;
}