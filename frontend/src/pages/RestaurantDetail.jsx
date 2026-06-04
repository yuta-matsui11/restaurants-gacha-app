//店舗の詳細情報を表示する画面です。
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/RestaurantDetail.css";
import axiosClient from '../api/axiosClient';

function RestaurantDetail() {
    const location = useLocation();
    const navigate = useNavigate();

    //店舗情報がそのまま送られてくるか、店舗IDのみが送られてくるかで処理を分岐させるようにします。
    const passedRestaurant = location.state?.restaurant;
    const passedRestaurantId = location.state?.restaurantId;

    const [isLoading, setIsLoading] = useState(!passedRestaurant);
    const [error, setError] = useState('');
    const [detail, setDetail] = useState(passedRestaurant || null);
    const [isFavorite, setIsfavorite] = useState(false);


    useEffect(() => {
        //詳細をそのままもらっている場合は何もしません。
        if (detail) {
            return;
        }

        if (!passedRestaurantId) {
            setError('店舗情報が見つかりません');
            setIsLoading(false);
            return;
        }
        const fetchDetail = async () => {
            try {
                const response = await axiosClient.get(`/gacha/restaurant/${passedRestaurantId}`);
                
                setDetail(response.data);
            }
            catch (err) {
                setError('店舗が見つかりません');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [detail, passedRestaurantId]);

    /*useEffect(() => {
        if (!restaurantId) {
            setError('不正なアクセス');
            setIsLoading(false);
            return;
        }

        const fetchDetail = async () => {
            try {
                //実際はここでAPIから詳細データを取得させます。

                await new Promise(resolve => setTimeout(resolve, 1000));

                //テストデータ
                const testDeta = {
                    id: restaurantId,
                    name: "サンプルダイニング",
                    images: [
                        "https://picsum.photos/120/80?1",
                        "https://picsum.photos/120/80?2"
                    ],
                    genre: "洋食",
                    address: "東京都品川区大崎",
                    station: "大崎駅",
                    hours: "11:00 - 22:00 (L.O. 21:30)",
                    closedDays: "毎週火曜日",
                    budget: "昼：１０００円～/夜：３０００円～",
                    description: "多分おいしいお店です。",
                    phone: "03-1234-5678",
                    url: "https://example.com"
                };

                setDetail(testDeta);
            }
            catch (err) {
                setError('店舗が見つかりません');
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [restaurantId]);*/

    const handleFevorite = () => {
        //ここにデータベース登録とかの処理を行うものとする
        setIsfavorite(!isFavorite);

        if (!isFavorite) {
            alert('お気に入り登録しました！');
        }
        else {
            alert('お気に入り解除しました！');
        }
    };

    if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>⏳ 店舗情報を読み込み中...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;
    if (!detail) return null;

    return (
        <div className="shop-detail-container">

            <div className="shop-detail-card">

                {/* 左：画像 */}
                <div className="shop-image-area">
                    <img
                        src={detail.imageUrl}
                        alt={detail.name}
                        className="shop-main-image"
                    />
                </div>

                {/* 右：店舗情報 */}
                <div className="shop-info-area">

                    <h2>{detail.name}</h2>

                    <div className="info-line">
                        <span className="label">ジャンル：</span>
                        <span>{detail.genre_name}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">住所：</span>
                        <span>{detail.address}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">営業時間：</span>
                        <span>{detail.open}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">予算：</span>
                        <span>{detail.budget}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">電話番号：</span>
                        <span>{detail.tel ? detail.tel : '非公開'}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">定休日：</span>
                        <span>{detail.close}</span>
                    </div>

                    <div className="info-line">
                        <span className="label">公式サイト：</span>
                        <a
                            href={detail.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {detail.url}
                        </a>
                    </div>

                </div>

            </div>

            {/* 説明文 */}
            <div className="shop-description">
                {detail.description}
            </div>

            {/* ボタン */}
            <div className="shop-buttons">

                <button className="map-btn">
                    📍 地図で見る
                </button>

                <button className="site-btn">
                    🍴 ホットペッパーで見る
                </button>

                <button
                    className="favorite-btn"
                    onClick={handleFevorite}
                >
                    {isFavorite ? "♥ お気に入り済み" : "♡ お気に入り追加"}
                </button>

            </div>

        </div>
    );

}
export default RestaurantDetail;