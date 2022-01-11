import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
const MyPagination = (props) => {
  const dispatch = useDispatch()
  var data = props.data;
  useEffect(() => {
    console.log(props.data);
  }, []) 

  let pages=[];
  if(data!== null){
    for(var i=1;i<=data.totalPages;i++){
      pages.push(i);
    }
  }


  const setPageNumber = (t_pageNumber) =>{
    if(t_pageNumber!== null){
      props.setData(null)
      dispatch({type:'FETCH_PRODUCTS_API',value:null})
      dispatch({type:'SET_PAGENUMBER',value:t_pageNumber})
      props.onClick();
    }
  }

    return ( <>
        {
          data!== null ? 
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                  <li className={`page-item ${!data.hasPrevPage? 'disabled' : ''}`}  onClick={() => setPageNumber(data.prevPage)}>
                    <a className="page-link" href="#" tabindex="-1">Previous</a>
                  </li>
                    {pages.map((item, index) =>
                    <li className={`page-item ${data.page===item?'active':''}`} key={index}>
                    <a className="page-link " href="#" onClick={() => setPageNumber(item)}>{item}</a>
                    </li>)}
                  <li className={`page-item ${!data.hasNextPage? 'disabled' : ''}`} onClick={() => setPageNumber(data.nextPage)}>
                    <a className="page-link" href="#">Next</a>
                  </li>
                </ul>
            </nav>

            :''
        }
    </> );
}
 
export default MyPagination;