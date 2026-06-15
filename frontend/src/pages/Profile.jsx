import React, { useState, useEffect } from 'react';
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

const BADGE_LIST = [
    {
        genre: 'ラーメン',
        badges: [
            { name: 'ラーメン新入生', emoji: '🍜', rank: 'bronze', threshold: 10 },
            { name: '麺活中毒者',     emoji: '🍜', rank: 'silver', threshold: 20 },
            { name: 'ラーメン神',     emoji: '🍜', rank: 'gold',   threshold: 50 },
        ]
    },
    {
        genre: 'カフェ・スイーツ',
        badges: [
            { name: 'カフェ見習い',    emoji: '☕', rank: 'bronze', threshold: 10 },
            { name: 'カフェイン依存症', emoji: '☕', rank: 'silver', threshold: 20 },
            { name: 'カフェの申し子',  emoji: '☕', rank: 'gold',   threshold: 50 },
        ]
    },
    {
        genre: '居酒屋',
        badges: [
            { name: 'とりあえず生',   emoji: '🍺', rank: 'bronze', threshold: 10 },
            { name: 'せんべろの達人', emoji: '🍺', rank: 'silver', threshold: 20 },
            { name: '居酒屋の神様',   emoji: '🍺', rank: 'gold',   threshold: 50 },
        ]
    },
    {
        genre: '中華',
        badges: [
            { name: '餃子見習い',     emoji: '🥟', rank: 'bronze', threshold: 10 },
            { name: 'チャーハン奉行', emoji: '🥟', rank: 'silver', threshold: 20 },
            { name: '中華皇帝',       emoji: '🥟', rank: 'gold',   threshold: 50 },
        ]
    },
    {
        genre: 'イタリアン・フレンチ',
        badges: [
            { name: 'パスタ見習い',   emoji: '🍝', rank: 'bronze', threshold: 10 },
            { name: 'アルデンテ信者', emoji: '🍝', rank: 'silver', threshold: 20 },
            { name: 'イタリアの風',   emoji: '🍝', rank: 'gold',   threshold: 50 },
        ]
    },
];

function Profile({ setTheme }) {
    const [isEditing, setIsediting] = useState(false);
    const [userInfo, setUserInfo] = useState({
        uname: "",
        email: "",
        password: "",
        station: "",
        genre: ""
    });
    const [editData, setEditData] = useState({ ...userInfo });
    const [userId, setUserId] = useState(null);
    const [earnedBadges, setEarnedBadges] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/me", {
                    credentials: "include"
                });
                if (!response.ok) throw new Error("プロフィール取得失敗");
                const data = await response.json();
                const profile = {
                    uname: data.user_name,
                    email: data.email,
                    station: data.nearest_station,
                    genre: data.favorite_genre_id
                };
                setUserInfo(profile);
                setEditData(profile);
                setUserId(data.user_id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchGenreCount = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/history/user/${userId}/genre-count`, {
                    credentials: 'include'
                });
                if (!response.ok) return;
                const genreCount = await response.json();

                const badges = [];
                BADGE_LIST.forEach(({ genre, badges: badgeSteps }) => {
                    const count = genreCount[genre] || 0;
                    const earned = [...badgeSteps]
                        .reverse()
                        .find(b => count >= b.threshold);
                    if (earned) {
                        badges.push({ ...earned, count });
                    }
                });
                setEarnedBadges(badges);
            } catch (error) {
                console.error(error);
            }
        };
        fetchGenreCount();
    }, [userId]);

    const handleEditClick = () => {
        setEditData({ ...userInfo });
        setIsediting(true);
    };

    const handleCancel = () => {
        setIsediting(false);
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/users/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(editData),
            });
            if (!response.ok) throw new Error("プロフィールの更新に失敗しました");
            setUserInfo({ ...editData });
            setIsediting(false);
            alert('プロフィールを更新しました');
        } catch (error) {
            console.error("更新エラー:", error);
            alert("プロフィールの更新に失敗しました。");
        }
    };

    const getGenreName = (genreId) => {
        const genre = GENRE_LIST.find(g => g.id === genreId);
        return genre ? genre.name : "未設定";
    };

    const navigate = useNavigate();
    const handleContactClick = () => navigate('/contact');

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

                    {/* バッジエリア */}
                    {earnedBadges.length > 0 && (
                        <div className="badge-area">
                            <h3 className="badge-title">🏅 獲得バッジ</h3>
                            <div className="badge-list">
                                {earnedBadges.map((badge, index) => (
                                    <div
                                        key={index}
                                        className={`badge-item ${badge.rank}`}
                                        title={`${badge.name}（${badge.count}回）`}
                                    >
                                        <span className="badge-emoji">{badge.emoji}</span>
                                        <span className="badge-name">{badge.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button className="btn primary" onClick={handleEditClick}>
                        プロフィールを編集する
                    </button>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "30px", alignItems: "center" }}>
                        <Link to="/terms" style={{ color: "#6088C6", textDecoration: "underline" }}>利用規約</Link>
                        <Link to="/privacy" style={{ color: "#6088C6", textDecoration: "underline" }}>プライバシーポリシー</Link>
                        <button
                            onClick={handleContactClick}
                            style={{
                                marginTop: "10px",
                                padding: "8px 20px",
                                fontSize: "0.9rem",
                                backgroundColor: "transparent",
                                color: "#6088C6",
                                border: "1px solid #AEC4E5",
                                borderRadius: "20px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                        >
                            お問い合わせ
                        </button>
                        <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "1px solid #eee", width: "100%", textAlign: "center" }}>
                            <h3 style={{ fontSize: "16px", color: "#666", marginBottom: "15px" }}>🎨 テーマカラー設定</h3>
                            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                                <button onClick={() => setTheme("pink")}   style={{ background: '#EE817B', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>パターン１</button>
                                <button onClick={() => setTheme("cafe")}   style={{ background: '#6AC1B7', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>パターン２</button>
                                <button onClick={() => setTheme("matcha")} style={{ background: '#4EA1D5', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>パターン３</button>
                                <button onClick={() => setTheme("dark")}   style={{ background: '#FFBC61', color: 'white', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>パターン４</button>
                            </div>
                        </div>
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
                        <button type="button" className="btn danger" onClick={handleCancel}>キャンセル</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Profile;