import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { loginUser, loadUser } from '../reducers/userReducer';
import { addNewUser } from '../services/users';
import { makeMessage } from '../reducers/messageReducer';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
            dispatch(makeMessage('Signed up'));
        }
        setUsername('');
        setPassword('');
    }
    
    return (
        <Form onSubmit={handleSubmit} className='p-5 m-5 w-25'>
            <Form.Control type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Form.Control type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant={"outline-" + (method=="login"? "success" : "primary")} type="submit">{method}</Button>
        </Form>
    )
}

export default AccountPage;