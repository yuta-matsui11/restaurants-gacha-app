//店舗の詳細情報を表示する画面です。
import React, {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function RestaurantDetail(){
    const location = useLocation();
    const navigate = useNavigate();

    const restaurantId = location.state?.restaurantId;

    const[detail, setDetail] = useState(null);
    const[isLoading, setIsLoading] = useState(true);
    const[error, setError] = useState('');

    const[isFavorite, setIsfavorite] = useState(false);

    useEffect(() =>{
        if(!restaurantId){
            setError('不正なアクセス');
            setIsLoading(false);
            return;
        }

        const fetchDetail = async () => {
            try{
                //実際はここでAPIから詳細データを取得させます。

                await new Promise(resolve => setTimeout(resolve,1000));

                //テストデータ
                const testDeta = {
                    id: restaurantId,
                    name: "サンプルダイニング",
                    images:[
                        "https://via.placeholder.com/600x400?text=Main+Image",
                        "https://via.placeholder.com/600x400?text=Sub+Image"
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
            catch(err){
                setError('店舗が見つかりません');
            }
            finally{
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [restaurantId]);

    const handleFevorite = () =>{
        //ここにデータベース登録とかの処理を行うものとする
        setIsfavorite(!isFavorite);

        if(!isFavorite){
            alert('お気に入り登録しました！');
        }
        else{
            alert('お気に入り解除しました！');
        }
    };

    if(isLoading) return <div>店舗情報を読み込み中...</div>
    if(error) return <div>{error}</div>
    if (!detail) return null;
    
    return (
        <div>
            <button onClick={()=> navigate(-1)}>戻る</button>
            
            <div>
                {detail.images.map((img,index) => (
                <img key={index} sec={img} alt={`店舗画像${index+1}`} />))}
            </div>
            <div>
                <div>
                    <span>{detail.genre}</span>
                    <h2>{detail.name}</h2>
                    <p>{detail.description}</p>
                </div>

                <button onClick={handleFevorite}>{isFavorite ? '♥' : '♡'}</button>
            </div>

            <table>
                <tbody>
                    {[
                        {label: '最寄り駅', value:detail.station},
                        {label: '住所', value:detail.address},
                        {label: '営業時間', value:detail.hours},
                        {label: '定休日', value:detail.closedDays},
                        {label: '予算', value:detail.budget},
                        {label: '電話番号', value:detail.phone},
                    ].map((item, index) => (
                        <tr key={index}>
                            <th>{item.label}</th>
                            <td>{item.value}</td>
                        </tr>
                    ))}
                    <tr><th>店舗HP</th>
                    <td>
                        <a href={detail.url} target="_blank" rel="noopener noreferrer">公式サイトを見る</a>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

}
export default RestaurantDetail;