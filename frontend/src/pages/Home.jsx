import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import '../styles/Home.css';

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
    const location = useLocation();

    const [station, setStation] = useState('');
    const [userStation, setUserStation] = useState('');
    const [useMyStation, setUseMyStation] = useState(true);
    const [userGenre, setUserGenre] = useState('');
    const [useMyGenre, setUseMyGenre] = useState(true);
    const [selectGenre, setSelectGenre] = useState('');
    const [stationError, setStationError] = useState('');
    const [userId, setUserId] = useState(null);
    const [genreChartData, setGenreChartData] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users/me', {
                    credentials: 'include'
                });
                if (!response.ok) return;
                const data = await response.json();
                setUserStation(data.nearest_station);
                setUserGenre(data.favorite_genre_id);
                setUserId(data.user_id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/history/user/${userId}`, {
                    credentials: 'include'
                });
                if (!response.ok) return;
                const data = await response.json();

                // ここから置き換え
                const countMap = {};
                const latestDateMap = {};

                data.forEach((item) => {
                    if (item.genreName) {
                        countMap[item.genreName] = (countMap[item.genreName] || 0) + 1;
                        if (!latestDateMap[item.genreName] || item.gachaAt > latestDateMap[item.genreName]) {
                            latestDateMap[item.genreName] = item.gachaAt;
                        }
                    }
                });

                const chartData = Object.entries(countMap)
                    .map(([name, count]) => ({ name, count }))
                    .sort((a, b) => {
                        if (b.count !== a.count) return b.count - a.count;
                        return latestDateMap[b.name] > latestDateMap[a.name] ? 1 : -1;
                    })
                    .slice(0, 5);
                // ここまで置き換え
                setGenreChartData(chartData);

            } catch (error) {
                console.error(error);
            }
        };
        fetchHistory();
    }, [userId, location]);

    const handleGacha = (e) => {
        e.preventDefault();
        let isValid = true;
        setStationError('');

        const searchStation = useMyStation ? userStation : station;
        if (!searchStation) {
            setStationError('駅名を入力してください');
            isValid = false;
        }
        if (!isValid) return;

        const searchConditions = {
            station: useMyStation ? userStation : station,
            genre: useMyGenre ? userGenre : selectGenre
        };
        navigate('/gachaexecute', { state: searchConditions });
    };

    return (
        <div className="home-container">
            {/* 左：条件入力 */}
            <div className="gacha-card">
                <h2>条件入力</h2>
                <form onSubmit={handleGacha} className="gacha-form">
                    <label className="input-label">
                        駅名 <span className="required">*</span>
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            checked={useMyStation}
                            onChange={() => { setUseMyStation(true); setStationError(''); }}
                        />
                        最寄り駅（<span className="station-highlight">{userStation}</span>）
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            checked={!useMyStation}
                            onChange={() => { setUseMyStation(false); setStationError(''); }}
                        />
                        別の駅を指定する
                    </label>

                    {!useMyStation && (
                        <input
                            type="text"
                            value={station}
                            onChange={(e) => setStation(e.target.value)}
                            placeholder="例：新宿"
                            className="station-input"
                        />
                    )}
                    {stationError && <p className="error-message">{stationError}</p>}

                    <label className="genre-title">ジャンル</label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            checked={useMyGenre}
                            onChange={() => setUseMyGenre(true)}
                        />
                        お気に入りジャンル（
                        <span className="station-highlight">
                            {GENRE_LIST.find(g => g.id === userGenre)?.name || ''}
                        </span>
                        ）
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            checked={!useMyGenre}
                            onChange={() => setUseMyGenre(false)}
                        />
                        別のジャンルを指定する
                    </label>

                    {!useMyGenre && (
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
                    )}

                    <button type="submit" className="gacha-btn">ガチャる！</button>
                </form>
            </div>

            {/* 右：グラフエリア */}
            <div className="graph-card">
                <h2>よく行くジャンル TOP5 !</h2>

                {genreChartData.length === 0 ? (
                    <p className="no-data">まだガチャ履歴がありません</p>
                ) : (
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                layout="vertical"
                                data={genreChartData}
                                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                                className="recharts-wrapper"
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" allowDecimals={false} />
                                <YAxis type="category"
                                    dataKey="name"
                                    width={100}
                                    tick={{ fontSize: 10, textAnchor: 'start' }}
                                    tickLine={false}
                                    dx={-85} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#eda5a2" name="回数" radius={[0, 6, 6, 0]} barSize={16} isAnimationActive={true}
                                    animationDuration={2000}
                                    animationEasing="ease-out" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

            </div>
        </div>
    );
}
export default Home;