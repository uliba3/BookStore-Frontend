import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { loginUser, loadUser } from '../reducers/userReducer';
import { addNewUser } from '../services/users';
import { makeMessage } from '../reducers/messageReducer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import stackOfBooks from '../assets/stackOfBooksTransparent.png';
import stack_of_books from '../assets/stack_of_books_transparent.png';

function AccountPage ({method}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        dispatch(loadUser());
    },[]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(method == "login"){
            await dispatch(loginUser(username, password));
            navigate('/');
        }else if(method == "signup"){
            await addNewUser(username, password);
            dispatch(makeMessage(`${username} Signed up`));
        }
        setUsername('');
        setPassword('');
    }
    
    return (
        <div className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit} className={"p-5 m-5 w-25 vh-100 " + (method === "login" ? "order-1" : "order-2")}>
                <Form.Control type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Form.Control type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant={"outline-" + (method=="login"? "success" : "primary")} type="submit">{method}</Button>
            </Form>
            <img src={method=="login" ? stackOfBooks : stack_of_books} className={'w-50 h-50 ' + (method === "login" ? "order-2" : "order-1")}/>
        </div>
    )
}

export default AccountPage;