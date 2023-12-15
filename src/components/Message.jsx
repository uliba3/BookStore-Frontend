import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';

function Message() {
    const [show, setShow] = useState(true);
    const message = useSelector(state => state.message);
    useEffect(() => {
        message==""?setShow(false):setShow(true);
    },[message]);
    return (
        <Alert show={show} onClose={() => setShow(false)} dismissible>
            {message}
        </Alert >
    )
}

export default Message;