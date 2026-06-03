//フッターコンポーネント、各画面に遷移できるボタンを実装する
import "../styles/Footer.css";

import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){
    return (
        <footer className="footer">
    <Link to="/home" className="footer-item">
        <span>🏠</span>
        <p>ホーム</p>
    </Link>

    <Link to="/history" className="footer-item">
        <span>🕒</span>
        <p>ガチャ履歴</p>
    </Link>

    <Link to="/favorite" className="footer-item">
        <span>❤️</span>
        <p>お気に入り</p>
    </Link>

    <Link to="/profile" className="footer-item">
        <span>👤</span>
        <p>マイページ</p>
    </Link>
</footer>
    )
}
export default Footer;