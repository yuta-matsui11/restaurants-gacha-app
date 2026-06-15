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
    const [favoriteIds, setFavoriteIds] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const [search, setSearch] = useState('');


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
        const fetchData = async () => {
            try {

                //履歴とお気に入りの取得
                const historyRes = await axiosClient.get(`/history/user/${userId}`);
                // 2. 履歴の取得が終わったら、次にお気に入りを取得する
                const favoriteRes = await axiosClient.get(`/favorites?userId=${userId}`);

                const sortedData = historyRes.data.sort((a, b) => {
                    return new Date(b.gachaAt) - new Date(a.gachaAt);
                });
                setHistories(sortedData);

                const favIds = favoriteRes.data.map(fav => fav.restaurantId);
                setFavoriteIds(favIds);
            } catch (err) {
                console.error("履歴の取得に失敗しました", err);
                setError("履歴データを取得できませんでした。");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
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

    
    const handleFavoriteToggle = async (history) => {

        const targetRestaurantId = history.restaurantId;
        const isFav = favoriteIds.includes(targetRestaurantId);

        //もしお気に入り済みの店舗なら削除処理を行います。
        if(isFav){
            try{
                await axiosClient.delete(`/favorites/${targetRestaurantId}?userId=${userId}`);

                setFavoriteIds((prev) => prev.filter((id) => id !== targetRestaurantId));
                alert("お気に入りを解除しました");
            }
            catch(err){
                console.error("お気に入り解除エラー", err);
                alert("お気に入り解除に失敗しました");
            }
        }
        //お気に入り登録済みではないなら登録処理を行います
        else{
            try{
                await axiosClient.post("/favorites", {
                    userId: userId,
                    restaurantId: targetRestaurantId,
                    stationName: history.stationName || "未設定",
                    genreName: history.genreName || "未取得",
                    restaurantName: history.restaurantName,
                    imageUrl: history.imageUrl || "https://via.placeholder.com/120x80?text=No+Image"
                });

                setFavoriteIds((prev) => [...prev, targetRestaurantId]);
                alert("お気に入り登録しました");
            }
            catch(err){
                console.error("お気に入り登録エラー", err);
                if(err.response && err. response.status === 409){
                    alert("すでにお気に入り登録されています。");
                    setFavoriteIds((prev) => [...prev, targetRestaurantId]);
                }
                else{
                    alert("お気に入り登録に失敗しました")
                }
            }
        }
    };

    useEffect(() => {
        window.scrollTo({top: 0, behavior: "instant"})
    }, [currentPage]);

    const filteredHistories = histories.filter((history) => {
        if(search === "") return true;

        const lowerSearch = search.toLowerCase();

        const matchName = history.restaurantName.toLowerCase().includes(lowerSearch);
        const matchGenre = history.genreName.toLowerCase().includes(lowerSearch);
        const matchStation = history.stationName.toLowerCase().includes(lowerSearch);

        return matchName || matchGenre || matchStation;
    })

    const totalPages = Math.ceil(filteredHistories.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHistories.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [search])


    if (isLoading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>⏳ 履歴を読み込み中...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#dc3545' }}>{error}</div>;


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
 
    return (
        <div className="history-container">
            <h1 className="history-title">ガチャ履歴</h1>
            <p className="history-description">これまでにガチャで出会ったお店の一覧です</p>

            <div className="search">
                <input className="search-box" type="text" placeholder="店名、ジャンル、駅名で検索" value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>

            {filteredHistories.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '30px', color: '#666' }}><p>ガチャ履歴はありません</p></div>
            )

                : (currentItems.map((history) => {

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
                                {favoriteIds.includes(history.restaurantId) ?<button className="remove-btn" onClick={() => handleFavoriteToggle(history)}>お気に入り解除</button>
                                :<button className="favorite-btn" onClick={() => handleFavoriteToggle(history)}>お気に入り登録</button>}
                            </div>
                        </div>
                    )
                }))
                }
                {totalPages > 1 &&(
                    <div className="pagination">
                        <button className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt; 前へ</button>
                        {[...Array(totalPages)].map((_,index) => (<button key={index + 1} className={`page-btn ${currentPage === index + 1 ? 'active-page' : ''}`} onClick={() => handlePageChange(index+1)}>{index + 1}</button>))}
                        <button className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>次へ &gt;</button>
                    </div>
                )}
        </div>
    );
}
export default History;