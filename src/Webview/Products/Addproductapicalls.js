import React from "react";

import * as Constants from '../../Constants/Constants';
 
export const AddProductAPI = (json, token, setProcessing) => {
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };
    console.log(requestOptions);
    fetch(Constants.AddProduct,requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        if(result.status === 200){
          // alert("product add sucsessfully")
          // window.location.href = "/product";
          setProcessing(0);
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

export const getProducts = (json, setData,setTotalPages) => {

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
  };
  
  fetch(Constants.getProducts,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      var realData = result.doc.docs
      console.log('----',realData);
      if(result.status===200){
         setData(realData)
         setTotalPages(result.doc.totalPages)
      }else{
        setData(null)
      }
      

    }, 
    (error) => {

      console.log(error);
    }
  )

}

export const ProductsRemove = (json) => {

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
  };

  fetch(Constants.ProductsRemove,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);

      if(result.status === 200){
        alert("product deleted sucsessfully")
        window.location.href = "/product";
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
 
export const getSingleProduct = (setEditData,json) => {
  console.log('-------api hit for category-----');
  console.log(json);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(json)
  };
  
  fetch(Constants.getProducts,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      setEditData(result.doc.docs[0])

    },
    (error) => {

      console.log(error);
    }
  )

}



export const updateProduct = (json) => {
  console.log('-------api hit for category-----');
  console.log(json);

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(json)
  };
  
  fetch(Constants.ProductUpdate,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      if(result.status === 200){
        alert("product updated sucsessfully")
        window.location.href = "/product";
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



export const getCategory = (setData, json) => {
  console.log('-------api hit for category-----');

  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:  JSON.stringify(json)
  };
  
  fetch(Constants.getCategory,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log(result);
      setData(result.doc)

    },
    (error) => {

      console.log(error);
    }
  )
}
 
export const getSubCategoryApi = (setSubData, json) => {
  console.log('-------api hit for sub category-----');
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(json)
  };
  
  fetch(Constants.getCategory,requestOptions)
  .then(res => res.json())
  .then(
    (result) => {
      console.log('-----sub category result----',result);
      setSubData(result.doc)

    },
    (error) => {

      console.log(error);
    }
  )
}
