import React, { useState, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button, Modal,Table,Card,Col,Container,Row } from "react-bootstrap";
import { GetBids, BidOnOrder} from './BiddingApi';
import './bid.css';
import { getCurrentDate } from '../../Constants/Utils';
export default withRouter(function BiddingArc(props) {

  const [data,setData] = useState(null);
  const [imgUrl,setImageUrl] = useState(null);

  const [price,setPrice] = useState(0);
  // const [amount,setAmount] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  
    useEffect(()=>{
      Getbidding();
    },[])

    let amount;

    var url = window.location.pathname;
    var sp = url.split('/')
    console.log(sp[2]);

    const onClick = ()=>{

     if(price===""){
            alert('please enter price')
     }else{
      var json ={
              
        "_id":sp[2],  
      "items": data[0].items
          }
     BidOnOrder(json);
    console.log(json);
  }
  
     }

    const Getbidding = () =>{
      var json ={
        "page":1,
          "limit":10,
          "search":{
              "_id":sp[2]
          }
        }
        GetBids(json, setData);
      }

  const onChange = (value,index) =>{

    console.log(value);

    var copyofdata = data;
    copyofdata[0].items[index].amount = value * copyofdata[0].items[index].quantity ;
    var g = value/100*18;
    copyofdata[0].items[index].gst = g * copyofdata[0].items[index].quantity;

    setData(copyofdata)
    setPrice(copyofdata)
  }

 


   const onModelClick=(imgUrl)=>{
    
    setModalShow(true)
    setImageUrl(imgUrl)

   }



   let linkexpired;
   let linkexpiretable;
   if (data !== null) {
     console.log('not null');
     linkexpiretable = data.map((item, index) =>
            {
               linkexpired = item.expireDate
              return(
                <>
            {console.log(linkexpired)}
                </>
              )
            }
         
     )
   }



let realDate;
   let biddingtable;
    if (data !== null) { 
      console.log('not null');
      biddingtable = data[0].items.map((item, index) =>
      {
        var date = new Date();
         realDate = Date.now(date)
        console.log(realDate);
      

        return(<>
      
          <tr key={index}>
          <td>{<img onClick={() => onModelClick(item.item_id.thumnail_image)} style={{width:'100px',borderRadius:'0',height:'100px'}} src={item.item_id.thumnail_image}/>}</td>
          <td>{item.item_id.name}</td>
          <td>{item.quantity}</td>
          <td>{item.measurement}</td>
          <td><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.gst}</td>
          <td><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.amount}</td>
          {linkexpired>realDate?<td><input placeholder="enter your price" style={{border:'1px solid black',borderBottom:'1px solid black',padding:'10px',fontSize:'18px'}} onChange={(e)=>onChange(e.target.value,index)}/></td>:<td>link expired</td>}
        </tr>
        </>)
      }
      )
      console.log('>>>>>>>>>>>>>>>>>',data);
}

let mobileview;

    if (data !== null) {
      console.log('not null');
      mobileview = data[0].items.map((item, index) =>{

      
        return(
          <>

          <div className="col-sm-6" key={index}>
               <img onClick={() => onModelClick(item.item_id.thumnail_image)} width="200" src={item.item_id.thumnail_image} />
               <h4>{item.item_id.name}</h4>
               <h5>{item.quantity}</h5>
               <h6>{item.measurement}</h6>
               <p><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.gst}</p>
               <p><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.amount}</p>
               <input id="inputtag" placeholder="enter your price" style={{border:'1px solid black',borderBottom:'1px solid black',padding:'5px',fontSize:'15px'}} onChange={(e)=>onChange(e.target.value,index)}/>
          </div>
          </>
        )
      }
        
      )
}


let mobileview2;

    if (data !== null) {
      console.log('not null');
      mobileview2 = data[0].items.map((item, index) =>
             {
            
           return(
             <>
               <div className="row mb-2" style={{textAlign:'left'}} key={index}>

                <div className="col-4">
                    <img onClick={() => onModelClick(item.item_id.thumnail_image)} width="150" src={item.item_id.thumnail_image} />
                </div>

                <div className="col-8">
                <h6>{item.item_id.name}</h6>
                <p>{item.quantity}</p>
                <p>{item.measurement}</p>
                <p><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.gst}</p>
                <p><i style={{fontSize:'12px'}} className="fas fa-rupee-sign"></i>{item.amount}</p>
                <input id="inputtag" placeholder="enter your price" style={{border:'1px solid black',borderBottom:'1px solid black',padding:'5px',fontSize:'15px'}} onChange={(e)=>onChange(e.target.value,index)}/>
                </div>

                </div>
             </>
           )
 


             }
          
      )
}



function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <img src={imgUrl}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

  return (

    <>


      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

         <h4 style={{borderBottom:'1px solid lightgrey'}} className="m-3 pb-2">{data!==null?'hi! '+data[0].vendor_id.name:'wait...'}</h4>

            <center id="bigscreen">
            <div className="col-md-11">
             
             <div className="card">
             <Table striped bordered hover>
               <thead>

                 <tr>
                   <th>Image</th>
                   <th>Item Name</th>
                   <th>Quantity</th>
                   <th>Measurement</th>
                   <th>GST Amount</th>
                   <th>Total Amount</th>
                   
                 </tr>

                 {biddingtable}

               </thead>
             </Table>
             </div>

             
         </div>
            </center>
           
              <div className="container" id="smallscreen">
              <div className="row" style={{textAlign:'left'}}>
               {mobileview}
               </div>
              </div>


              <div className="container" id="smallscreen2">
              
               {mobileview2}
              
              </div>

              {linkexpired>realDate?<Button className="ml-3 mt-3" variant="primary" onClick={onClick}>Submit</Button>:''}
            
        
    </>
  )
});