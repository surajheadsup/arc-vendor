import React from "react";
import { resolveValue } from "react-hot-toast";
import * as Session from '../Storage';
import * as Constants from '../Constants/Constants';

export const LoginVendorApi = (json, setData) => {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)
    };
     
    fetch(Constants.LoginVendorApi,requestOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log('----------------',result);
        // setData(result)
        if(result.status===200){
          setData(result.doc)
          window.location.href = "/order";
          Session.setVendorId(result.doc._id)
          Session.setVedorData(JSON.stringify(result.doc))
        }
        else{
          alert('no user found')
        }
      }, 
      (error) => {

        console.log(error);
      }
    )
  
  }
  