//ガチャ実行後ガチャ結果の表示を行う
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../styles/Result.css';

const GENRE_LIST = [
    { id: 'G001', name: '居酒屋' },
    { id: 'G002', name: 'ダイニングバー・バル' },
    { id: 'G003', name: '創作料理' },
    { id: 'G004', name: '和食' },
    { id: 'G005', name: '洋食' },
    { id: 'G006', name: 'イタリアン・フレンチ' },
    { id: 'G007', name: '中華' },
    { id: 'G008', name: '焼肉・ホルモン' },
    { id: 'G009', name: 'アジア・エスニック料理' },
    { id: 'G010', name: '各国料理' },
    { id: 'G011', name: 'カラオケ・パーティ' },
    { id: 'G012', name: 'バー・カクテル' },
    { id: 'G013', name: 'ラーメン' },
    { id: 'G014', name: 'カフェ・スイーツ' },
    { id: 'G015', name: 'その他グルメ' },
    { id: 'G016', name: 'お好み焼き・もんじゃ' },
    { id: 'G017', name: '韓国料理' }
];

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const { restaurant, conditions } = location.state || {};
    if (!restaurant) {
        navigate('/home');
        return null;
    }

    // 検索したジャンルIDをジャンル名に変換
    const searchedGenreName = conditions?.genre
        ? GENRE_LIST.find((g) => g.id === conditions.genre)?.name
        : null;

    // 検索ジャンルがあればそれを優先、なければAPIのジャンルを表示
    const displayGenre = searchedGenreName || restaurant.genre_name;

    const handleRetry = () => {
        navigate('/gachaexecute', { state: conditions });
    };

    const handleViewdetail = () => {
        navigate('/restaurantdetail', { state: { restaurant: { ...restaurant, genre_name: displayGenre } } });
    };

    return (
        <div className="big-container">
            <div className="result-container">
                <div className="result-card">
                    {/*店舗画像*/}
                    <img src={restaurant.imageUrl} alt={restaurant.name} className="result-image" />

                    {/*ジャンルと最寄り駅*/}
                    <div className="result-info">
                        <div className="result-tags">
                            <span className="genre-tag">{displayGenre}</span>
                            <span className="station-tag">{restaurant.nearest_station}駅周辺</span>
                        </div>
                        {/*店舗名*/}
                        <h3 className="restaurant-name">{restaurant.name}</h3>
                    </div>
                </div>

                <div className="result-buttons">
                    <button className="retry-btn" onClick={handleRetry}>
                        同じ条件でもう一度ガチャる
                    </button>
                    <button className="detail-btn" onClick={handleViewdetail}>
                        詳細を見る
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Result;