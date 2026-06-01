//ユーザー登録を行う画面
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Register(){

    const handleRegister = () => {
        navigate('/login');
    };

    return(
        <div>
            <h2>ユーザー登録</h2>
            <button onClick={handleRegister}>登録</button>
        </div>
    )
}
export default Register;