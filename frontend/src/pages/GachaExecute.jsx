//ガチャの実行中表示を行う画面です
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.jsx';
import '../styles/GachaExecute.css';

function GachaExecute() {
    const location = useLocation();
    const navigate = useNavigate();

    const searchConditions = location.state;

    useEffect(() => {
        //直接アクセスの場合はホームに遷移させる
        if (!searchConditions) {
            navigate('/home');
            return;
        }

        const executeGacha = async () => {
            try {
                //タイマー設定
                const animationPromise = new Promise((resolve) => setTimeout(resolve, 2500));

                const requestData = {
                    user_id: 1,
                    station_name: searchConditions.station
                };

                const apiResponse = await axiosClient.post('/gacha/execute', requestData).then(response => response.data);

                const formattedRestaurant = {
                    id: apiResponse.id,
                    name: apiResponse.name,
                    genre: apiResponse.genre_name,
                    station: searchConditions.station,
                    image: apiResponse.imageUrl,
                    address: apiResponse.address,
                    hours: apiResponse.open,
                    closedDays: apiResponse.close,
                    budget: apiResponse.budget,
                    phone: apiResponse.phone,
                    url: apiResponse.urls
                };

                await Promise.all([animationPromise]);

                navigate('/result', {state: {restaurant: formattedRestaurant, conditions: searchConditions}});
                //ダミーデータを0.8秒で受信したことにします。
                /*const apiPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve({
                            id: "sampleID",
                            name: "サンプルダイニング",
                            genre: searchConditions.genres[0] !== 'ALL' ? searchConditions.genres[0] : "洋食",
                            station: searchConditions.station,
                            image: "https://via.placeholder.com/300x200?text=Restaurant+Image"
                        });
                    }, 800);
                });*/
            }
            catch (error) {
                console.error("ガチャの実行に失敗しました", error);
                alert("飲食店情報の取得に失敗しました。", error);
                navigate('/home');
            }
        };
        executeGacha();
    }, [location, navigate, searchConditions]);

    return (
        <div className="loading-container">
            <div className="gacha-icon">🎲</div>

            <h2 className="loading-title">
                お店の抽選中...
            </h2>

            <p className="loading-text">
                {searchConditions?.station}駅周辺で探しています
            </p>

            <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}
export default GachaExecute;