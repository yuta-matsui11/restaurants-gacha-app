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
    
    useEffect(()=>{
        if(userId === 0)return;
        const targetId = passedRestaurantId || passedRestaurant?.id || passedRestaurant?.restaurantId;

        if(!targetId) return;

        const checkFavoriteStatus = async () => {
            try{

                const response = await axiosClient.get(`/favorites?userId=${userId}`);

                const isAlreadyFavorited = response.data.some((fav) => fav.restaurantId === targetId);

                setIsfavorite(isAlreadyFavorited);
            }
            catch(err){
                console.error("お気に入り状態の確認に失敗しました", err);
            }
        };
        checkFavoriteStatus();
    },[userId]);

    useEffect(() => {

        //店舗情報がそのまま送られてきた場合は何もしない
        if(detail){
            return;
        }

        //店舗IDから店舗詳細を取得します。
        if(!passedRestaurantId){
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

    /*const handleFevorite = () => {
        //ここにデータベース登録とかの処理を行うものとする
        setIsfavorite(!isFavorite);

        if (!isFavorite) {
            alert('お気に入り登録しました！');
        }
        else {
            alert('お気に入り解除しました！');
        }
    };*/

    // お気に入り登録・解除の切り替え処理
    const handleFavorite = async (restaurantDetail) => {
        const targetRestaurantId = restaurantDetail.id || restaurantDetail.restaurantId;

        // すでにお気に入り済み（isFavorite が true）の場合は「解除処理」を実行
        if (isFavorite) {
            try {
                // Favorite.jsx と同じ DELETE リクエスト
                await axiosClient.delete(`/favorites/${targetRestaurantId}?userId=${userId}`);

                setIsfavorite(false); // ハートを「♡」に戻す
                alert("お気に入りを解除しました");
            } catch (err) {
                console.error("お気に入り解除エラー:", err);
                alert("お気に入り解除に失敗しました。");
            }
        } 
        // まだお気に入りしていない（isFavorite が false）場合は「登録処理」を実行
        else {
            try {
                const requestData = {
                    userId: userId,
                    restaurantId: targetRestaurantId,
                    stationName: restaurantDetail.nearest_station || "未設定",
                    genreName: restaurantDetail.genre_name || restaurantDetail.genre || "未取得",
                    restaurantName: restaurantDetail.name || restaurantDetail.restaurantName,
                    imageUrl: restaurantDetail.imageUrl || restaurantDetail.image || "https://via.placeholder.com/300x200"
                };
                await axiosClient.post("/favorites", requestData);

                setIsfavorite(true); // ハートを「♥」にする
                alert("お気に入り登録しました");
            } catch (err) {
                console.error("お気に入り登録エラー:", err);
                if (err.response && err.response.status === 409) {
                    alert("この店舗はすでにお気に入り登録されています。");
                    setIsfavorite(true); // 実際は登録されていたのでハートを赤くしておく
                } else {
                    alert("お気に入り登録に失敗しました。");
                }
            }
        }
    };

    //店舗の地図を開く機能
    const handleOpenMap = () => {
        if (!detail.address) {
            alert("住所情報がありません");
            return;
        }

        // 店舗の「住所」と「店舗名」を組み合わせて検索キーワードにする（精度を上げるため）
        const searchQuery = `${detail.address} ${detail.name}`;
        
        // URLエンコード（日本語をURLで使える形式に変換）
        const encodedQuery = encodeURIComponent(searchQuery);
        
        // Googleマップの検索URLを作成
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
        
        // 新しいタブで開く
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
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
            {/*<div className="shop-description">
                {detail.description}
            </div>*/}

            {/* ボタン */}
            <div className="shop-buttons">

                <button className="map-btn" onClick={() => handleOpenMap()}>
                    📍 地図で見る
                </button>

                <button className="site-btn" onClick={() => window.open(detail.url, '_blank', 'noopener,noreferrer')}>
                    🍴 ホットペッパーで見る
                </button>

                <button
                    className="favorite-btn"
                    onClick={() => handleFavorite(detail)}
                >
                    {isFavorite ? "♥ お気に入り済み" : "♡ お気に入り追加"}
                </button>

            </div>

        </div>
    );

}
export default RestaurantDetail;