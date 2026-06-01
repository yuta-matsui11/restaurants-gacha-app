//フッターコンポーネント、各画面に遷移できるボタンを実装する
import React from 'react';
import { Link } from 'react-router-dom';

function Footer(){
    return (
        <footer>
            <Link to="/home">ホーム</Link>
            <Link to="/history">履歴</Link>
            <Link to="/favorite">お気に入り</Link>
        </footer>
    )
}
export default Footer;