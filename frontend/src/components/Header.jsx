//ヘッダーコンポーネント　アプリタイトルと、ログイン、ログアウトなどの表示
import "../styles/Header.css";

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header({isAuthenticated, onLogout}){
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header>
            <h1>一期一会グルメガチャ</h1>
            {isAuthenticated && (
                <button onClick={handleLogout}>ログアウト</button>
            )}
        </header>
    )
}
export default Header;
