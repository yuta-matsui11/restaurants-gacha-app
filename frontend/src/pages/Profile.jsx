import React, { useState } from 'react';
import "../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";

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

function Profile() {
    const [isEditing, setIsediting] = useState(false);

    //実際はユーザーデータをバックエンドから取得します。
    const [userInfo, setUserInfo] = useState({
        uname: "aiueo",
        email: "aiueo@example.com",
        password: "pass1234",
        station: "大崎",
        genre: "G005"
    });

    const [editData, setEditData] = useState({ ...userInfo });

    const handleEditClick = () => {
        setEditData({ ...userInfo });
        setIsediting(true);
    };

    const handleCancel = () => {
        setIsediting(false);
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();

        //ここにデータベースの編集リクエストを送る
        setUserInfo({ ...editData });

        setIsediting(false);

        alert('プロフィールを更新しました');
    };

    const getGenreName = (genreId) => {
        const genre = GENRE_LIST.find(g => g.id === genreId);
        return genre ? genre.name : "未設定";
    };

    // ★ お問い合わせボタンを押したときの処理（開発用に仮置き）
    const handleContactClick = () => {
        // 【佐藤へ】ここにお問い合わせ画面への遷移処理
        alert('お問い合わせボタンが押されました（実装待ち）');
    };

    return (
        <div className="profile-page">
            <h2 className="profile-title">マイページ</h2>

            {!isEditing ? (
                <div className="profile-card">
                    <div className="profile-item">
                        <span>ユーザーネーム</span>
                        <p>{userInfo.uname}</p>
                    </div>

                    <div className="profile-item">
                        <span>メールアドレス</span>
                        <p>{userInfo.email}</p>
                    </div>

                    <div className="profile-item">
                        <span>最寄り駅</span>
                        <p>{userInfo.station}駅</p>
                    </div>

                    <div className="profile-item">
                        <span>お気に入りジャンル</span>
                        <p>{getGenreName(userInfo.genre)}</p>
                    </div>

                    <button className="btn primary" onClick={handleEditClick}>
                        プロフィールを編集する
                    </button>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px", alignItems: "center" }}>
                        <Link to="/terms" style={{ color: "#7755ff", marginRight: "15px", textDecoration: "underline" }}>利用規約</Link>
                        <Link to="/privacy" style={{ color: "#7755ff", textDecoration: "underline" }}>プライバシーポリシー</Link>

                        <button 
                            onClick={handleContactClick} 
                            style={{
                                marginTop: "10px",
                                padding: "8px 20px",
                                fontSize: "0.9rem",
                                backgroundColor: "transparent",
                                color: "#7755ff",
                                border: "1px solid #7755ff",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            お問い合わせ
                        </button>
                    </div>
                </div>
            ) : (
                <form className="profile-card" onSubmit={handleSave}>
                    <div className="form-group">
                        <label>ユーザーネーム</label>
                        <input name="uname" value={editData.uname} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>メールアドレス</label>
                        <input name="email" value={editData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>最寄り駅</label>
                        <input name="station" value={editData.station} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>好きなジャンル</label>
                        <select name="genre" value={editData.genre} onChange={handleChange}>
                            <option value="">選択してください</option>
                            {GENRE_LIST.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn success">保存</button>
                        <button type="button" className="btn danger" onClick={handleCancel}>
                            キャンセル
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;
                    
                