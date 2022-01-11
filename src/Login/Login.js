import React,{useEffect, useState} from "react";
import {Button, Card} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import './Login.css';
import {LoginVendorApi} from './LoginApi';
import toast, { Toaster } from 'react-hot-toast';

export default withRouter(function Login(props) {

const [email,setEmail] = useState('vendor1@gmail.com');
const [data,setData] = useState(null);
const [password,SetPassword] = useState('123');

const onClick=()=>{
 
    var json = {
        email : email,
        password : password
    }

    if(email==='' && password===''){
        alert('invalid email or password')
    }else{
        LoginVendorApi(json,setData)
    }
}

console.log('================',data)

return(
    <>
          <Toaster />
            <Card style={{ width: '18rem'}} id="Login-Card">
        <Card.Body>

            <Card.Text>
                <div className="form-group">
                <label htmlFor="name">Email</label>
                <input  id="information"   onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter Username..." id="name" className="form-control" name="name" type="text" />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Password</label>
                    <input id="information"  onChange={(e)=>SetPassword(e.target.value)}  placeholder="Enter Password..." id="name" className="form-control" name="name" type="text" />
                </div>
            </Card.Text>
            <Button style={{width: "240px"}} onClick={onClick}>Login</Button>
        </Card.Body>

        </Card>
    </>
)
})
