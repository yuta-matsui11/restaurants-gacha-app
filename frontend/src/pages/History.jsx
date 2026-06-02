import "../styles/History.css";

import React from 'react';
import { useNavigate } from 'react-router-dom';


function History() {
    const histories = [
        {
            id: 1,
            date: "2025/05/25",
            time: "12:30",
            image: "https://picsum.photos/120/80?1",
            name: "炭火焼き鳥 ○○",
            genre: "居酒屋・焼き鳥",
            area: "渋谷駅周辺",
            rating: 4.2,
        },
        {
            id: 2,
            date: "2025/05/24",
            time: "19:15",
            image: "https://picsum.photos/120/80?2",
            name: "イタリアンバル ○○",
            genre: "イタリアン",
            area: "恵比寿駅周辺",
            rating: 4.2,
        },
        {
            id: 3,
            date: "2025/05/23",
            time: "18:45",
            image: "https://picsum.photos/120/80?3",
            name: "海鮮居酒屋 ○○",
            genre: "海鮮・寿司",
            area: "新宿駅周辺",
            rating: 4.1,
        },
    ];

    return (
        <div className="history-container">
            <h1>ガチャ履歴</h1>
            <p className="history-description">これまでにガチャで出会ったお店の一覧です</p>

            {histories.map((history) => (
                <div key={history.id} className="history-card">
                    <div className="history-date">

                        <p>{history.date}</p>
                        <p>{history.time}</p>
                    </div>
                    <img src={history.image} alt={history.name} className="history-image" />

                    <div className="history-info">
                        <h2>{history.name}</h2>

                        <div className="info-row">
                            <span className="label">ジャンル：</span>
                            <span>{history.genre}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">エリア：</span>
                            <span>{history.area}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">評価：</span>
                            <span>
                                <span className="star">★</span>
                                {history.rating}
                            </span>
                        </div>


                    </div>

                    <div className="history-buttons">
                        <button className="detail-btn">詳細を見る</button>
                        <button className="favorite-btn">お気に入り登録</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default History;