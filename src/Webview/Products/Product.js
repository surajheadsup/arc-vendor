import React, { useState, useEffect } from 'react';
import { NavLink, withRouter, useRouteMatch  } from 'react-router-dom';
import { Button, Table,Card,Col,Container,Row,Modal} from "react-bootstrap";
import { useDispatch } from 'react-redux';
import "./product.css";
import { getProducts, ProductsRemove } from './Addproductapicalls';
import MyPagination from '../../Component/Pagination';
import MyButton from '../../Component/MyButton';
import { connect } from 'react-redux'
import { getProductList } from '../../store/actions/ProductAction'
import Loading from '../../Component/Loading';
import PageTitle from '../../Component/PageTitle';
import AutoCompleteComponent from '../../Component/AutoComplete';
import * as Constants from '../../Constants/Constants';
import * as Session from '../../Storage';
const mapStateToProps = state => {

  return {
      productData : state.products
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    getProductList: (data) => dispatch(getProductList(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter( function Products(props) {
  const dispatch = useDispatch();
  const [data, setdata] = useState(null);
  const [serachData, setSearchData] = useState(null);
  const [name, setName] = useState();
  const [show, setShow] = useState(false);
  const [deleteitem, setDeleteItem] = useState();
  const [Value, setValue] = useState();
  const [searchTitle, setSearchTitle] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [onChange, setOnChange] = useState('');

  const handleClose = () => setShow(false);
  var token = '123';

  useEffect(() => {
    if(props.productData.doc === null){
      loadProduct();
    }else{
      setdata(props.productData.doc.docs)
    } 

    console.log('rendering..', props.productData.pageNumber);
  }, [props.productData.doc, props.productData.pageNumber])

  const loadProduct = () => {
    var json = {
      "page":props.productData.pageNumber,
      "limit":10,
      "search":{
      }
    }
    console.log(json);
    props.getProductList(json, token);
  }

  const handleShow = (item) => {
    setShow(true)
    setDeleteItem(item)
  };

  const onDeleteClicked = (deleteitem) => {
    var json = {
      id: deleteitem 
      }
    console.log('delete======',json);
  
    // ProductsRemove(json);
  }

  const handleEdit = (id) => {
    dispatch({
        type:'FETCH_FILTER_API',
        value:null
    })
    window.location.href = `/products/edit/` + id
  }

  let getProductstable;
  console.log(data);
  if (data !== null) {
    getProductstable = data.map((item, index) =>
      <tr key={index}>
        <td>{index + 1}</td>
        <td><img src={item.thumnail_image} style={{width:'75',height:'75',borderRadius:'0'}} /></td>
        <td>{item.name}</td>
        <td>{item.sku}</td>
        <td>{item.price}</td>
        <td>{item.category}</td>
        <td> 
            {/* <NavLink to={`/products/edit/` + item._id}> */}
              {/* <Button id="Button" size="sm"  variant="primary" onClick={() => handleEdit(item._id)} >Edit</Button> */}
              <MyButton className="mr-2" title="Edit" size="sm" onClick={() => handleEdit(item._id)}/>
            {/* </NavLink><br /><br /> */}
            <MyButton onClick={() => handleShow(item._id)} title="Delete" id="Button" size="sm"/>
            {/* <Button id="Button" variant={"primary"} onClick={() => onDeleteClicked(item)} size="sm">{'Delete'}</Button> */}
        </td>
      </tr>
    )
  }

  // For Mobile View
  let getProductsCard;
  if (data !== null) {
    console.log('not null');
    getProductsCard = data.map((item, index) =>
           <Col xs={12} md={4} sm={6} key={index}>
          <Card.Img id="cardimg" variant="top" width="300px" height="300px" src={item.thumnail_image} />
          <Card.Body id="cardbody">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
            Sku: {item.sku}
            </Card.Text>
            <Card.Text>
            Price: {item.price}
            </Card.Text>
            <Card.Text>
            category: {item.category}
            </Card.Text>
            {/* <NavLink className="mr-2" to={`/products/edit/` + item._id}><Button id="Button"  variant="primary">Edit</Button></NavLink> */}
            <MyButton id="Button" title="Edit" size="sm" onClick={() => handleEdit(item._id)}/>
          <Button id="Button" variant={"primary"} onClick={() => onDeleteClicked(item)} size="sm">{'Delete'}</Button>
          </Card.Body>
        </Col>
    )
  }

   const onSearchCut = () =>{
    window.location.reload(); 
   }

   const OnSearchClick = (onChange) => {
    
    var temp = onChange.target.value;
    temp = temp.trim();
    setSearchTitle(temp)
    setSearchTitle(temp)
    console.log(temp);
    if(temp!=='' && temp!==' '){
        var json = {
            name : temp
        };
        var token = Session.getXToken();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-auth' : token},
            body: JSON.stringify(json)
        };
      
        fetch(Constants.autoComplete,requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.status === 200){
                setSuggestion(result.doc)
            }
            else{
              alert("somthing went wrong")
            }
          },
          (error) => {
            console.log(error);
          }
        )
        
    }else{
        setSuggestion(null);
      
    }
}


let suggestionsListComponent;
if(suggestion!==null && suggestion!=='null'){
  suggestionsListComponent = suggestion.map((suggestion, index) => {
      return (
         <tr key={index}>
             <td>{index+1}</td>
             <td><img src={suggestion.thumnail_image} style={{width:'75',height:'75',borderRadius:'0'}}/></td>
             <td>{suggestion.name}</td>
             <td>{suggestion.sku}</td>
             <td>{suggestion.price}</td>
             <td>{suggestion.category}</td>
             <td> 
              <MyButton variant="success" className="mr-2" title="Edit" size="sm" onClick={() => handleEdit(suggestion._id)}/>
              <MyButton onClick={() => handleShow(suggestion._id)} title="Delete" id="Button" size="sm"/>
             </td>
         </tr>
      )
  })
}

  return (

    <>
         {console.log('----->>>>>------>>>>---->>>>',serachData)}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure You Delete This Product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>onDeleteClicked(deleteitem)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    {/* {console.log()} */}

        <div className="page-content" id="page-contents" style={{ marginTop: '-10px' }}>

        <div className="row">
          <div className="col-md-12 grid-margin stretch-card" id="navstretch">
            <div className="card" id="cardh">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-baseline">
                  <PageTitle title="All Products"/>
                  <div className='d-flex'>
                      
                            <div className='mr-2 d-flex'>
                            <input onChange={(e) => setOnChange(e)} type="text" className="searchTerm form-control p-3" placeholder="Search Product Here..." />
                            {onChange!==''?
                            <button onClick={()=>onSearchCut()} className="searchButtoncut">
                            <i className="fa fa-times"></i>
                              </button>:''}
                              <button onClick={()=>OnSearchClick(onChange)} type="submit" className="searchButton">
                                  <i className="fa fa-search"></i>
                              </button>
                            </div>
                      
                  <NavLink to="/products/add"><MyButton style={{width:'150px'}} title="Add Product" size="sm"/></NavLink>
                  </div>
                </div>
              </div>
            </div>

          </div>

            <div className="col-md-12 grid-margin stretch-card" id="stretchcard">

              <div className="card" id="realCard">
                <div className="card-body">
                      
                  <div className="d-flex justify-content-between align-items-baseline">
                    <Table striped bordered hover>
                      <thead>

                        <tr>
                          <th>#</th>
                          <th>Thumbnail</th>
                          <th>Name</th>
                          <th>SKU</th>
                          <th>Price</th>
                          <th>Category</th>
                          <th>Action</th>
                        </tr>

                        {suggestion!==null?suggestionsListComponent:data!== null? getProductstable : <tr><td colSpan={7}><Loading/></td></tr>}
                        
                      </thead>
                    </Table>
                                      
                  </div>
                  <div className="mt-3">
                    {suggestion===null?<MyPagination data={props.productData.doc} onClick={()=>loadProduct()} setData={setdata}/>:''}
                  </div>
                </div>
              </div>
              {/* For Mobile View */}
              <div id="cardres">
                <Container>
                <Row>
                        {getProductsCard}
                </Row>
              </Container>
              </div>
            </div>
          </div>
        </div>
    </>
  )
  
}));
