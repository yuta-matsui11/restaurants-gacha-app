//ガチャ実行後ガチャ結果の表示を行う
import React from 'react';
import {useLocation,useNavigate} from 'react-router-dom';

function Result(){
    const location = useLocation();
    const navigate = useNavigate();
    const {restaurant, conditions} = location.state || {};
    if(!restaurant){
        navigate('/home');
        return null;
    }

    const handleRetry = () => {
        navigate('/gachaexecute', {state: conditions});
    };

    const handleViewdetail = () => {
        navigate('/restaurantdetail', {state: {restaurantId: restaurant.id}});
    };

    return(
        <div>
            <h2>ガチャ結果</h2>
            <div>
            {/*店舗画像*/}
            <img src={restaurant.image} alt={restaurant.name} />
            <br/>
            {/*ジャンルと最寄り駅*/}
            <span>{restaurant.genre}</span>
            <br/>
            <span>{restaurant.station}駅周辺</span>
            <br/>
            {/*店舗名*/}
            <h3>{restaurant.name}</h3>
            </div>
            <div>
                {/*詳細表示*/}
                <button onClick={handleViewdetail}>詳細を見る</button>
                {/*リトライボタン*/}
                <button onClick={handleRetry}>同じ条件でもう一度ガチャる</button>
            </div>

        </div>
    )
}
export default Result;