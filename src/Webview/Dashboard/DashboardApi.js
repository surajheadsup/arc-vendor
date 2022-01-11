// import React from "react";

// import * as Constants from '../../Constants/Constants';
 
// export const AddProduct = (json) => {
 
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(json)
//     };

//     fetch(Constants.AddProduct,requestOptions)
//     .then(res => res.json())
//     .then(
//       (result) => {
//         console.log(result);
//         if(result.status === 200){
//           alert("product add sucsessfully")
//           window.location.href = "/product";
//         }
//         else{
//           alert("somthing went wrong")
//         }
//       },
//       (error) => {

//         console.log(error);
//       }
//     )
    
// }

// export const getProducts = (setData) => {

//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({})
//   };
  
//   fetch(Constants.getProducts,requestOptions)
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log(result);
//       setData(result.doc)

//     }, 
//     (error) => {

//       console.log(error);
//     }
//   )

// }

// export const ProductsRemove = (json) => {

//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(json)
//   };

//   fetch(Constants.ProductsRemove,requestOptions)
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log(result);

//       if(result.status === 200){
//         alert("product deleted sucsessfully")
//         window.location.href = "/product";
//       }
//       else{
//         alert("somthing went wrong")
//       }

//     },
//     (error) => {

//       console.log(error);
//     }
//   )

// }
 
// export const getSingleProduct = (setEditData,json) => {
//   console.log('-------api hit for category-----');
//   console.log(json);

//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body:  JSON.stringify(json)
//   };
  
//   fetch(Constants.getProducts,requestOptions)
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log(result);
//       setEditData(result.doc[0])

//     },
//     (error) => {

//       console.log(error);
//     }
//   )

// }



// export const updateProduct = (json) => {
//   console.log('-------api hit for category-----');
//   console.log(json);

//   const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body:  JSON.stringify(json)
//   };
  
//   fetch(Constants.ProductUpdate,requestOptions)
//   .then(res => res.json())
//   .then(
//     (result) => {
//       console.log(result);
//       if(result.status === 200){
//         alert("product updated sucsessfully")
//         window.location.href = "/product";
//       }
//       else{
//         alert("somthing went wrong")
//       }
//     },
//     (error) => {

//       console.log(error);
//     }
//   )

// }


