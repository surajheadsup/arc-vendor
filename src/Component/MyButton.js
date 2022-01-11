import react from 'react';
import { Button } from 'react-bootstrap';

const MyButton = (props) => {
    return(<>
         <Button style={props.style} onClick={props.onClick} id={props.id} className={props.className} size={props.size} variant={props.variant} >{props.title}</Button>
    </>)
}
export default MyButton;