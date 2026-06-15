import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.jsx';
import '../styles/GachaExecute.css';

function GachaExecute() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchConditions = location.state;
    const isFetched = useRef(false);

    const [userId, setUserId] = useState(0);
    const [phase, setPhase] = useState('machine');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosClient.get("/users/me");
                setUserId(response.data.user_id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (userId === 0) return;
        if (!searchConditions) { navigate('/home'); return; }
        if (isFetched.current) return;
        isFetched.current = true;

        const executeGacha = async () => {
            try {
                const requestData = {
                    user_id: userId,
                    station_name: searchConditions.station,
                    genre: searchConditions.genre
                };

                const apiPromise = axiosClient.post('/gacha/execute', requestData).then(r => r.data);

                //ガチャポイント追加処理
                const today = new Date().toLocaleDateString('ja-JP');
                const dailyStrageKey = `dailyGachaData_${userId}`;

                const dailyData = JSON.parse(localStorage.getItem(dailyStrageKey)) || {date: today, count: 0};

                if(dailyData.date !== today){
                    dailyData.date = today;
                    dailyData.count = 0;
                }

                if(dailyData.count < 3){
                    dailyData.count += 1;
                    localStorage.setItem(dailyStrageKey, JSON.stringify(dailyData));

                    const storageKey = `totalGachaPoint_${userId}`;
                    const currentCount = parseInt(localStorage.getItem(storageKey) || '0', 10);
                    localStorage.setItem(storageKey, (currentCount + 10).toString());

                    window.dispatchEvent(new Event('gachaPulled'));
                }


                setTimeout(() => setPhase('capsule'), 800);
                setTimeout(() => setPhase('open'), 1800);

                const apiResponse = await apiPromise;


                const formattedRestaurant = {
                    id: apiResponse.id,
                    name: apiResponse.name,
                    genre_name: apiResponse.genre_name,
                    nearest_station: searchConditions.station,
                    imageUrl: apiResponse.imageUrl,
                    address: apiResponse.address,
                    open: apiResponse.open,
                    close: apiResponse.close,
                    budget: apiResponse.budget,
                    tel: apiResponse.tel,
                    url: apiResponse.url
                };

                setTimeout(() => {
                    navigate('/result', { state: { restaurant: formattedRestaurant, conditions: searchConditions } });
                }, 2800);

            } 
            catch (error) {
                console.error("ガチャの実行に失敗しました", error);
                
                // バックエンドから送られてきたエラーメッセージを取得
                const errorMessage = error.response?.data?.message || error.response?.data || "";

                // 0件エラー（NoRestaurantException）かどうかをメッセージ内容やステータスで判定
                if (error.response?.status === 404 || (typeof errorMessage === 'string' && errorMessage.includes("見つかりませんでした"))) {
                    alert("条件に一致するお店が見つかりませんでした💦\nエリアやジャンルを変更して、もう一度回してみてください！");
                } else {
                    // それ以外の通信エラーやサーバーエラーの場合
                    alert("飲食店情報の取得に失敗しました。");
                }
                
                navigate('/home');
            }
        };
        executeGacha();
    }, [userId, location, navigate, searchConditions]);

    return (
        <div className="loading-container">
            {phase === 'open' && <div className="flash-overlay"></div>}

            {phase === 'open' && (
                <div className="sparkles">
                    <span className="sparkle">✨</span>
                    <span className="sparkle">⭐</span>
                    <span className="sparkle">✨</span>
                    <span className="sparkle">🌟</span>
                    <span className="sparkle">✨</span>
                    <span className="sparkle">⭐</span>
                </div>
            )}

            <div className={`gacha-machine ${phase !== 'machine' ? 'machine-shake' : ''}`}>
                <div className="machine-cap"></div>
                <div className="machine-glass">
                    <div className="machine-balls">
                        <div className="ball ball-red"></div>
                        <div className="ball ball-blue"></div>
                        <div className="ball ball-white"></div>
                        <div className="ball ball-yellow"></div>
                        <div className="ball ball-green"></div>
                        <div className="ball ball-orange"></div>
                    </div>
                </div>
                <div className="machine-neck"></div>
                <div className="machine-body">
                    <div className="machine-slot">
                        <div className="machine-slot-inner"></div>
                    </div>
                    <div className="machine-handle-wrap">
                        <div className="machine-handle-bar"></div>
                        <div className={`machine-handle-knob ${phase === 'machine' ? 'handle-spin' : ''}`}></div>
                    </div>
                </div>
                <div className="machine-stand"></div>
                <div className="machine-foot"></div>
            </div>

            {phase === 'capsule' && (
                <div className="capsule-wrapper capsule-drop">
                    <div className="capsule">
                        <div className="capsule-top"></div>
                        <div className="capsule-bottom"></div>
                    </div>
                </div>
            )}

            {phase === 'open' && (
                <div className="capsule-wrapper">
                    <div className="capsule-open">
                        <div className="capsule-top-open"></div>
                        <div className="capsule-star">⭐</div>
                        <div className="capsule-bottom-open"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default GachaExecute;