import "../styles/History.css";
import axiosClient from '../api/axiosClient.jsx';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function History() {
    /*const histories = [
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
    ];*/

    const navigate = useNavigate();

    const [histories, setHistories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState(0);


    useEffect(() => {
                const fetchProfile = async () => {
                    try {
                        const response = await fetch(
                            "http://localhost:8080/api/users/me",
                            {
                                credentials: "include"
                            }
                        );
        
                        if (!response.ok) {
                            throw new Error("プロフィール取得失敗");
                        }
        
                        const data = await response.json();
    
                        setUserId(data.user_id);
        
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchProfile();
        }, []);

    useEffect(() => {
        if(userId===0)return;
        const fetchHistories = async () => {
            try {

                const response = await axiosClient.get(`/history/user/${userId}`);

                const sortedData = response.data.sort((a, b) => {
                    return new Date(b.gachaAt) - new Date(a.gachaAt);
                });
                setHistories(sortedData);
            } catch (err) {
                console.error("履歴の取得に失敗しました", err);
                setError("履歴データを取得できませんでした。");
            } finally {
                setIsLoading(false);
            }
        };
        fetchHistories();
    }, [userId]);

    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return { date: '', time: '' };
        const dateObj = new Date(dateTimeString);
        return {
            date: dateObj.toLocaleDateString('ja-JP'), // YYYY/MM/DD 形式
            time: dateObj.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }) // HH:MM 形式
        };
    };

    const handleViewDetail = (restaurantId) => {
        navigate('/restaurantdetail', { state: { restaurantId } })
    };

    if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>⏳ 履歴を読み込み中...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#dc3545' }}>{error}</div>;

    const handleFavorite = async (history) => {
        try {

            await axiosClient.post("/favorites", {
                userId: userId,
                restaurantId: history.restaurantId,

                stationName: history.stationName,
                genreName: history.genreName,
                restaurantName: history.restaurantName,
                imageUrl: history.imageUrl,
            });

            alert("お気に入り登録しました");
        } catch (err) {
            console.error(err);
            alert("お気に入り登録に失敗しました");
        }
    };

    return (
        <div className="history-container">
            <h1>ガチャ履歴</h1>
            <p className="history-description">これまでにガチャで出会ったお店の一覧です</p>

            {histories.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}><p>ガチャ履歴はありません</p></div>
            )

                : (histories.map((history) => {

                    const { date, time } = formatDateTime(history.gachaAt);

                    return (
                        <div key={history.id} className="history-card">
                            <div className="history-date">
                                <p>{date}</p>
                                <p>{time}</p>
                            </div>

                            <img src={history.imageUrl || "https://via.placeholder.com/120x80?text=No+Image"} alt={history.restaurantName} className="history-image" />

                            <div className="history-info">
                                <h2>{history.restaurantName}</h2>

                                <div className="info-row">
                                    <span className="label">ジャンル：</span>
                                    <span>{history.genreName}</span>
                                </div>

                                <div className="info-row">
                                    <span className="label">エリア：</span>
                                    <span>{history.stationName}駅周辺</span>
                                </div>

                            </div>

                            <div className="history-buttons">
                                <button className="detail-btn" onClick={() => handleViewDetail(history.restaurantId)}>詳細を見る</button>
                                <button className="favorite-btn" onClick={() => handleFavorite(history)}>お気に入り登録</button>
                            </div>
                        </div>
                    )
                })

                )}
        </div>
    );
}
export default History;