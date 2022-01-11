import * as Constants from '../../Constants/Constants';
export const FETCH_PRODUCTS_API = 'FETCH_PRODUCTS_API'
export const SET_PAGENUMBER = 'SET_PAGENUMBER'
 

export const setProductData = (data) =>{
    console.log('Product Action Called');
    return  { 
        type:FETCH_PRODUCTS_API,
        value:data
     }
}

export const getProductList = (json, token) => {
    return dispatch=>{
      console.log('inside product action api');
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' , 'x-auth' : token},
        body: JSON.stringify(json)
      };
      fetch(Constants.getProducts,requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 200){
                console.log(result.doc);
                dispatch( 
                    setProductData(result.doc)
                )
            }
            else{
              alert("somthing went wrong")
            }
          },
          (error) => {
            console.log(error);
          }
        )  
    }
  }

  
