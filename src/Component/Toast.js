import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const MyToast = (props) => {

    toast.error(props.msg, {
        style: {
          border: props.border,
          padding: props.padding ? props.padding : '10px',
          color: props.color ? props.color : '#000',
        },
        iconTheme: {
          primary: props.iconColor,
          secondary: props.iconSubColor ? props.iconSubColor : '#FFFAEE',
        },
    });

    // setTimeout(() => {toast.dismiss()}, 2000)

    return ( <>
        <Toaster position="top-right"/>
    </> );
}
 
export default MyToast;