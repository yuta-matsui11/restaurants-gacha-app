//ログインを行う画面
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Login(){

    const handleLogin = () => {
        navigate('/home');
    };

    return(
        <div>
            <h2>ログイン</h2>
            <button onClick={handleLogin}>ログイン</button>
        </div>
    )
}
export default Login;