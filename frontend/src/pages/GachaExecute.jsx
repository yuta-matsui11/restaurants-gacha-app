//ガチャの実行中表示を行う画面です
import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function GachaExecute(){
    const location = useLocation();
    const navigate = useNavigate();

    const searchConditions = location.state;

    useEffect(() => {
        //直接アクセスの場合はホームに遷移させる
        if(!searchConditions){
            navigate('/home');
            return;
        }

        const executeGacha = async() => {
            try{
                //タイマー設定
                const animationPromise = new Promise((resolve) => setTimeout(resolve,2500));

                //ダミーデータを0.8秒で受信したことにします。
                const apiPromise = new Promise((resolve) => {
                    setTimeout(()=>{
                        resolve({
                            id: "sampleID",
                            name: "サンプルダイニング",
                            genre: searchConditions.genres[0] !== 'ALL' ? searchConditions.genres[0] : "洋食",
                            station: searchConditions.station,
                            image: "https://via.placeholder.com/300x200?text=Restaurant+Image"
                        });
                    }, 800);
                });

                //並行処理
                const [_, apiResponse] = await Promise.all([animationPromise, apiPromise]);

                //結果画面への遷移
                navigate('/result', {state: {restaurant: apiResponse, conditions:searchConditions}});
            }
            catch(error){
                console.error("ガチャの実行に失敗しました",error);
                alert("飲食店情報の取得に失敗しました。",error);
                navigate('/home');
            }
        };
        executeGacha();
    }, [location,navigate,searchConditions]);

    return (
        <div>
            <h1>🎲</h1>
            <h2>お店の抽選中...</h2>
            <p>{searchConditions?.station}駅周辺で探しています</p>
        </div>
    )
}
export default GachaExecute;