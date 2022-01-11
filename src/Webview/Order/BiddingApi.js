import React from "react";

import * as Constants from '../../Constants/Constants';


export const GetBids = (json, setData) => {
    console.log(json);
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
          // setData(result.doc.docs)
          var realData = result.doc.docs
          if(realData.length>0){
            setData(realData)
          }
          else{
            window.location.href = "/bidding/";
          }
        }, 
        (error) => {
          console.log(error);
        }
      )
    }

  export const BidOnOrder = (json) => {
 
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };

    fetch(Constants.BidOnOrder,requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
        if(result.status === 200){
          alert("Your Price Submit")
          window.location.pathname = '/order'
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