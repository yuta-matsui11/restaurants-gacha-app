//ログインを行う画面
import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login({onLogin}){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin();
        navigate('/home');
    };

    return(
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleLogin}>
                <label>メールアドレス</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>パスワード</label><input type="password" value={password} onChange={(e) => setEmail(e.target.value)}/>
                <button>ログイン</button>
            </form>
            <div>

            </div>
        </div>
    )
}
export default Login;