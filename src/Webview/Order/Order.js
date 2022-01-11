
import React, { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Table } from 'react-bootstrap';
import {GetBids} from './OrderApiCall';
import * as session from '../../Storage';
import { getCurrentDate,getDateParsed } from '../../Constants/Utils';
import { LoginVendorApi } from '../../Login/LoginApi';
export default withRouter(function Order(props) {

    const [data,setData] = useState(null);
    
    useEffect(() => {
      getBidsApi();
      
      
      }, []); 

      const getBidsApi=()=>{
        var json = {
          "page":1,
        "limit":10,
        "search":{
            "vendor_id":session.getVendorId()
        }
        }
        console.log(json);
        GetBids(json,setData)
      }



      let bidTable;
      if (data !== null) {
        bidTable = data.map((item, index) =>{

          var sp = item.url.split('/')
          var id = sp[4]

           var date = new Date();
           var realDate = Date.now(date)
           var ex = item.expireDate
          return ( 

            <>
            <tr key={index}>
              <td>{item.order_id._id}</td>
              <td>{item.items.length}</td>
            
              <td>{item.expireDate>realDate?'order received':'expired'}</td>
              <td>
               <NavLink to={`/bidding/${id}`}> <Button className="mr-2" 
               // onClick={()=>session.setViewItem(JSON.stringify(item.url))}
               // onClick={()=>session.setViewItem(JSON.stringify(item.items))}
                size="sm">View</Button></NavLink>
              </td>
            </tr>
            </>

          )

        }
     
        )
      }

  return (
    <>
      <h4 className="mb-4">Order</h4>
      <div className="Card ">
      <Table striped bordered hover>
                    <thead>

                     <tr>
                        <th>Order No.</th>
                        <th>Items</th>
                        
                        <th>Status</th>
                        <th>Action</th>
                    
                      </tr>

                      {bidTable}

                    </thead>
      </Table>
      </div>
    </>
  )
});