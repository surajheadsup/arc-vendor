import React from "react";

import * as Constants from '../../Constants/Constants';
 
export const GetBids = (json,setData) => {

    const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };
    
    fetch(Constants.getBids,requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        setData(result.doc.docs)
      }, 
      (error) => {
  
        console.log(error);
      }
    )
  
  }
  