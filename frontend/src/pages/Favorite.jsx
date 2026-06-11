import "../styles/Favorite.css";

import React, { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient.jsx';
import { useNavigate } from 'react-router-dom';

function Favorite() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
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
        if (userId === 0) return;
        const fetchFavorites = async () => {
            try {
                const response = await axiosClient.get(`/favorites?userId=${userId}`);
                setFavorites(response.data);
            } catch (err) {
                console.error("お気に入りの取得に失敗しました", err);
                setError("お気に入りデータを取得できませんでした。");
            } finally {
                setIsLoading(false);
            }
        };

        fetchFavorites();
    }, [userId]);

    if (isLoading)
        return (<div className="favorite-container">
            <div className="empty-message">
                ⏳ お気に入りを読み込み中...
            </div>
        </div>);

    if (error)
        return (
            <div className="favorite-container">
                <div className="empty-message">
                    {error}
                </div>
            </div>
        );

    if (favorites.length === 0)
        return (<div className="favorite-container">
            <div>お気に入りはありません</div>
        </div>);

    const handleViewDetail = (restaurantId) => {
        // 詳細ページへ遷移（例: /restaurant/123）
        navigate(`/restaurantdetail`, { state: { restaurantId } });
    };
    if (isLoading) {
        return (<div className="favorite-container">
        <div className="favorite-container">読み込み中...</div>
        </div>);
    }

    const handleRemoveFavorite = async (restaurantId) => {
        try {
            await axiosClient.delete(
                `/favorites/${restaurantId}?userId=${userId}`
            );

            setFavorites(
                favorites.filter(
                    favorite => favorite.restaurantId !== restaurantId
                )
            );

            alert("お気に入りを解除しました");
        } catch (err) {
            console.error("お気に入り解除失敗", err);
            alert("お気に入り解除に失敗しました");
        }
    };
    // const favorites = [
    //     {
    //         id: 1,
    //         image: "https://picsum.photos/120/80?11",
    //         name: "炭火焼き鳥 ○○",
    //         genre: "居酒屋・焼き鳥",
    //         area: "渋谷駅周辺",
    //         rating: 4.2,
    //     },
    //     {
    //         id: 2,
    //         image: "https://picsum.photos/120/80?12",
    //         name: "イタリアンバル ○○",
    //         genre: "イタリアン",
    //         area: "恵比寿駅周辺",
    //         rating: 4.5,
    //     },
    //     {
    //         id: 3,
    //         image: "https://picsum.photos/120/80?13",
    //         name: "海鮮居酒屋 ○○",
    //         genre: "海鮮・寿司",
    //         area: "新宿駅周辺",
    //         rating: 4.1,
    //     },
    // ];

    return (
        <div className="favorite-container">
            <h1><span className="heart">❤</span>お気に入り一覧</h1>
            <p className="favorite-description">
                お気に入り登録したお店の一覧です
            </p>

            {favorites.map((favorite) => (
                <div key={favorite.favoriteId} className="favorite-card">

                    <img
                        src={favorite.imageUrl}
                        alt={favorite.restaurantName}
                        className="favorite-image"
                    />

                    <div className="favorite-info">
                        <h2>{favorite.restaurantName}</h2>

                        <div className="info-row">
                            <span className="label">ジャンル：</span>
                            <span>{favorite.genreName}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">エリア：</span>
                            <span>{favorite.stationName}</span>
                        </div>

                    </div>

                    <div className="favorite-buttons">
                        <button className="detail-btn" onClick={() => handleViewDetail(favorite.restaurantId)}>
                            詳細を見る
                        </button>

                        <button className="remove-btn" onClick={() => handleRemoveFavorite(favorite.restaurantId)}  >
                            お気に入り解除
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Favorite;