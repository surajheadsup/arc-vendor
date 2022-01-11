export const vendor_id = 'vendorId';
export const vendor_data = 'vendor_data';
export const Items_data = 'Items_data';
export const xToken = 'xToken';
export const ProductSuggestionData = 'ProductSuggestionData';



export const setVendorId = (id) =>{
    localStorage.setItem(vendor_id,id);
}

export const getVendorId = () =>{
    return localStorage.getItem(vendor_id);
}


export const setVedorData = (data) =>{
    localStorage.setItem(vendor_data,data);
}

export const getVendorData = () =>{
    return localStorage.getItem(JSON.parse(vendor_data));
}


export const setViewItem = (viewItemData) =>{
    localStorage.setItem(Items_data,viewItemData);
}

export const getViewItem = () =>{
    return localStorage.getItem(Items_data);
}

export const setProductSuggestion = (Suggestion) =>{
    localStorage.setItem(ProductSuggestionData,Suggestion);
}

export const getProductSuggestion = () =>{
    return localStorage.getItem(ProductSuggestionData);
}

export const clearProductSuggestion = () =>{
    return localStorage.removeItem(ProductSuggestionData);
}

export const setXToken = (token)=>{
    localStorage.setItem(xToken, token);
}
export const getXToken = () =>{
    return localStorage.getItem(xToken);
}



export const clear = () =>{
    localStorage.clear();
    window.location.href = "/";
}
