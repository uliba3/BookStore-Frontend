import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { loginUser } from '../reducers/userReducer';
import { addNewUser } from '../services/users';
import { makeMessage } from '../reducers/messageReducer';

function AccountPage ({method}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">{method}</button>
        </form>
    )
}

export default AccountPage;