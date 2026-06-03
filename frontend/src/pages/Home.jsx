//ホーム画面、検索条件を入力しガチャの実行を要求する。
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Home.css';

//ホットペッパーグルメAPIのジャンルにのっとって作成しています
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

function Home() {
    const navigate = useNavigate();

    const [station, setStation] = useState('');
    const [selectGenre, setSelectGenre] = useState("");

    const [error, setError] = useState('');
    const [stationError, setStationError] = useState('');

    const handleGenreChange = (genreId) => {
        setSelectGenre((prev) => {
            if (prev.includes(genreId)) {
                return prev.filter((id) => id !== genreId);
            }
            else {
                return [...prev, genreId];
            }
        });
    };


    const handleGacha = (e) => {
        e.preventDefault();
        setStationError('');

        if (!station) {
            setStationError('駅名を入力してください');
            isValid = false;
        } 

        const searchConditions = {
            station: station,
            genres: selectGenre
        };

        navigate('/gachaexecute', { state: searchConditions });
    };

    return (
        <div className="home-container">
            <div className="gacha-card">
                <h2>条件入力</h2>
                <form onSubmit={handleGacha} className="gacha-form">

                    <label className="input-label">駅名 <span className="required">*</span></label>
                    <input type="text" value={station} onChange={(e) => setStation(e.target.value)} placeholder="例：新宿"  className="station-input" />
                    {stationError && <p className="error-message">{stationError}</p>}

                    <label className="genre-title">ジャンル</label>
                    <p className="genre-note">　※未選択の場合はすべてのジャンルから抽選されます</p>

                    <select
                        value={selectGenre}
                        onChange={(e) => setSelectGenre(e.target.value)}
                        className="genre-select"
                    >
                        <option value="">すべてのジャンル</option>

                        {GENRE_LIST.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="gacha-btn">ガチャる！</button>
                </form>
            </div>
        </div>
    )
}
export default Home;