import {FETCH_PRODUCTS_API, SET_PAGENUMBER} from '../actions/ProductAction'

const initialState = {
    doc: null,
    pageNumber : 1
} 

const reducer = (state = initialState, action) =>{

    switch (action.type){
        
        case FETCH_PRODUCTS_API:  
            console.log('product reducer action : ', action);
            return({doc:action.value, pageNumber:state.pageNumber});
        case SET_PAGENUMBER:  
            return({doc:state.doc, pageNumber:action.value})
        default:
            return state;    
    }
}

export default reducer;