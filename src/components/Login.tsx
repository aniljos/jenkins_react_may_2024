import { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";  
import Input from "./Input";


function Login(){

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogin(){

        if(name && password){

            try {
                
                const response = await axios.post('http://localhost:9000/login', {name, password});
                setError('');
                dispatch({type: 'SET_AUTH_STATE', payload: {
                    isAuthenticated: true,
                    name,
                    accessToken: response.data.accessToken,
                    refeshToken: response.data.refreshToken
                } });

                navigate('/products');


            } catch (error) {
                setError('Invalid credentials');
                dispatch({type: 'SET_AUTH_STATE', payload: {
                    isAuthenticated: false,
                    name: '',
                    accessToken: '',
                    refeshToken: ''
                } });
            }
        }
        else{
            setError('Please enter the credentials');
        }

    }

    return (
        <div>
            <h4>Login</h4>
            {error ? <div className="alert alert-danger">
                {error}
            </div> : null}

            <Input label="Username" type="text" value={name} 
                            onChange={e => setName(e.target.value)} placeholder="Enter the Name"/>
            {/* <div className="form-group">
                <label>Username</label>
                <input className="form-control" type="text" value={name} 
                                                onChange={e => setName(e.target.value)}/>
            </div> */}
            <Input label="Password" type="password" value={password} 
                        onChange={e=> setPassword(e.target.value)} placeholder="*************" />
            {/* <div className="form-group">
                <label>Password</label>
                <input className="form-control" type="password" 
                                                value={password} onChange={e=> setPassword(e.target.value)}/>
            </div> */}
            <div>
                <button className="btn btn-success" onClick={handleLogin}>Login</button>
            </div>
        </div>
    )
}
export default Login;