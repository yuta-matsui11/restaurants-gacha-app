//ガチャ実行後ガチャ結果の表示を行う
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../styles/Result.css';
function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const { restaurant, conditions } = location.state || {};
    if (!restaurant) {
        navigate('/home');
        return null;
    }

    const handleRetry = () => {
        navigate('/gachaexecute', { state: conditions });
    };

    const handleViewdetail = () => {
        navigate('/restaurantdetail', { state: { restaurantId: restaurant.id } });
    };

    return (
        <div className="result-container">
            <h2 className="result-title">ガチャ結果</h2>

            <div className="result-card">

                {/*店舗画像*/}
                <img src={restaurant.image} alt={restaurant.name} className="result-image" />

                {/*ジャンルと最寄り駅*/}
                <div className="result-info">
                    <div className="result-tags">
                        <span className="genre-tag">{restaurant.genre}</span>


                        <span className="station-tag">{restaurant.station}駅周辺</span>
                    </div>
                    {/*店舗名*/}
                    <h3 className="restaurant-name">{restaurant.name}</h3>
                </div>

            </div>
            <div className="result-buttons">
                <button
                    className="detail-btn"
                    onClick={handleViewdetail}
                >
                    詳細を見る
                </button>

                <button
                    className="retry-btn"
                    onClick={handleRetry}
                >
                    🎲 同じ条件でもう一度ガチャる
                </button>
            </div>

        </div>
    )
}
export default Result;