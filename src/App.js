import React, { useEffect } from "react";
import Navigation from "./Webview/Navigation/Navigation";
import Login from './Login/Login';
import * as Session from './Storage'
const App = () => {


    // useEffect(()=>{
    //     Session.setVedorId()
    // })

    return (
        <>
        {/* <Login /> */}
            {Session.getVendorId() !== null?  <Navigation />: <Login />}
        </>
    )
}
export default App