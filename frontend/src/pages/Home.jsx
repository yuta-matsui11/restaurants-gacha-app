//ホーム画面、検索条件を入力しガチャの実行を要求する。
import React from 'react';
import {useNavigate} from 'react-router-dom';

function Home(){
    const navigate = useNavigate();

    const handleGacha = () => {
        navigate('/result');
    };

    return(
        <div>
            <h2>条件入力</h2>
            <button onClick={handleGacha}>ガチャる</button>
        </div>
    )
}
export default Home;