import react from 'react';

const PageTitle = (props) =>{
    return(<>
       <h4 className={props.className} >{props.title}</h4>
    </>)
}
export default PageTitle;