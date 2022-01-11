import React, { useState, useEffect } from 'react';
const Loader = (props) => {
    return ( <>
        <div className="loader"  style={{opacity:props.opacity}}>
            <h1>Processing... </h1>
        </div>
      
    </> );
}
 
export default Loader;