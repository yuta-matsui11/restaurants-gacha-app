//ヘッダーコンポーネント　アプリタイトルと、ログイン、ログアウトなどの表示
import "../styles/Header.css";

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation(); // 現在のURLを取得    

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <header className="header">
            <h1>🍽️ イチゴグルメ</h1>

            <div>
                {location.pathname === '/login' && (
                    <button
                        className="header-btn"
                        onClick={() => navigate('/register')}
                    >
                        新規登録
                    </button>
                )}

                {location.pathname === '/register' && (
                    <button
                        className="header-btn"
                        onClick={() => navigate('/login')}
                    >
                        ログインはこちら
                    </button>
                )}

                {isAuthenticated && (
                    <button
                        className="header-btn"
                        onClick={handleLogout}
                    >
                        ログアウト
                    </button>
                )}
            </div>
        </header>
    );
}
export default Header;
