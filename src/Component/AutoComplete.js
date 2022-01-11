import React, { useState, useEffect } from 'react';
import * as Constants from '../Constants/Constants';
import * as Session from '../Storage';
import toast, { Toaster } from 'react-hot-toast';
import '../Webview/Index.css';

const AutoCompleteComponent = (props) => {
    const [searchTitle, setSearchTitle] = useState();
    const [suggestion, setSuggestion] = useState(null);
    
    let suggestionsListComponent;
    useEffect(() => {
                
    }, []);

   
    if(suggestion!==null && suggestion!=='null'){
        suggestionsListComponent = suggestion.map((suggestion, index) => {
            return (
                

                <div className='p-1 d-flex' key={index}>
                <img width={200} height={200} src={suggestion.thumnail_image}/>
                <div className='ml-3'>
                {suggestion.name}<p><strong>{' in '+suggestion.category}</strong></p>
                <p>{suggestion.description}</p>
                <button type="button" onClick={()=>Select(suggestion)} className="mt-3 btn btn-outline-danger">Select</button>
                </div>
                </div>
            )
            
        })
    }
    
    const onChange = (e) => {
        var temp = e.target.value;
        temp = temp.trim();
        setSearchTitle(temp)
        console.log('================',temp);
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

 
    const Select = (suggestion) => {
        console.log(suggestion);
        props.setValue({
            name: suggestion.name,
            sku: suggestion.sku,
            price: '',
            category: suggestion.category,
            subcategory: 'none',
            tags: suggestion.serach_tags,
            measurement:suggestion.measurement_in,
            description: suggestion.description,
            metatags: suggestion.meta_tags,
            metatitle: suggestion.meta_title,
            metadescription: suggestion.meta_discription,
            metakeyword: suggestion.meta_keywords,
        })
        setSuggestion(null);
    }

    return ( 
        <>
            <input placeholder='search Product' defaultValue={searchTitle} type="text" className="form-control" onChange={(e) => onChange(e)}/>
            <div className="autocomplete card">
                {suggestionsListComponent}
            </div>
        </>
     );
}
 
export default AutoCompleteComponent;