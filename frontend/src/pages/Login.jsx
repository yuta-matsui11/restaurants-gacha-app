//ログインを行う画面
import "../styles/Login.css";

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        let isValid = true;

        setEmailError('');
        setPasswordError('');

        if (!email) {
            setEmailError('メールアドレスを入力してください')
            isValid = false
        }
        if (!password) {
            setPasswordError('パスワードを入力してください')
            isValid = false
        }
        if (!isValid) {
            return;
        }

        onLogin();
        navigate('/home');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>ログイン</h2>

                <form onSubmit={handleLogin}>
                    <label>メールアドレス</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (<p className="error-message">{emailError}</p>)}

                    <label>パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (<p className="error-message">{passwordError}</p>)}

                    <button type="submit" className="login-btn">
                        ログイン
                    </button>
                </form>


            </div>
        </div>
    )
}
export default Login;