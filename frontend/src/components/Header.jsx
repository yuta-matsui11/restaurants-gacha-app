//ヘッダーコンポーネント　アプリタイトルと、ログイン、ログアウトなどの表示
import "../styles/Header.css";

import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Header({ isAuthenticated, onLogout }) {
    const navigate = useNavigate();
    const location = useLocation(); // 現在のURLを取得   
    const [totalGachaPoint, setTotalGachaPoint] = useState(0);
    const [totalGachaCount, setTotalGachaCount] = useState(0);  
    const [userId, setUserId] = useState(0);

    useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users/me", { credentials: "include" });
            if (response.ok) {
                const data = await response.json();
                setUserId(data.user_id);
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchProfile();
    }, [isAuthenticated]);

    const updateGachaPoint = () => {
        if (userId === 0) return;
        const strageKey = `totalGachaPoint_${userId}`;
        const count = parseInt(localStorage.getItem(strageKey) || '0', 10);
        setTotalGachaPoint(count);
    };

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    useEffect(() => {
        updateGachaPoint();
        window.addEventListener('gachaPulled', updateGachaPoint);
        return () => window.removeEventListener('gachaPulled', updateGachaPoint);
    }, [userId]);

    const getPointColor = (count) => {
    if (count >= 1000) return '#FFD700'; // 30回以上はゴールド
    if (count >= 350) return '#A9A9A9'; // 20回以上はシルバー
    if (count >= 100) return '#CD7F32'; // 10回以上はブロンズ
    return '#EE817B';                  // 9回以下は通常のイチゴ色
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
                    <div className="counter">
                        ガチャポイント：<span style={{color: getPointColor(totalGachaPoint), fontSize: '22px', textShadow: '1px 1px 2px rgba(0,0,0,0.1'}}>{totalGachaPoint}</span> pt
                    </div>
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
