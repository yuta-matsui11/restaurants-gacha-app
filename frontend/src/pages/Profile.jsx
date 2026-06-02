import React, {useState} from 'react';
const GENRE_LIST =[
        {id:'G001', name: '居酒屋'},
        {id:'G002', name: 'ダイニングバー・バル'},
        {id:'G003', name: '創作料理'},
        {id:'G004', name: '和食'},
        {id:'G005', name: '洋食'},
        {id:'G006', name: 'イタリアン・フレンチ'},
        {id:'G007', name: '中華'},
        {id:'G008', name: '焼肉・ホルモン'},
        {id:'G009', name: 'アジア・エスニック料理'},
        {id:'G010', name: '各国料理'},
        {id:'G011', name: 'カラオケ・パーティ'},
        {id:'G012', name: 'バー・カクテル'},
        {id:'G013', name: 'ラーメン'},
        {id:'G014', name: 'カフェ・スイーツ'},
        {id:'G015', name: 'その他グルメ'},
        {id:'G016', name: 'お好み焼き・もんじゃ'},
        {id:'G017', name: '韓国料理'}
    ];

    function Profile(){
        const [isEditing, setIsediting] = useState(false);

        //実際はユーザーデータをバックエンドから取得します。
        const [userInfo, setUserInfo] = useState({
            uname: "aiueo",
            email: "aiueo@example.com",
            password: "pass1234",
            station: "大崎",
            genre: "G005"
        });

        const [editData, setEditData] = useState({ ...userInfo});

        const handleEditClick = () => {
            setEditData({...userInfo});
            setIsediting(true);
        };

        const handleCancel = () => {
            setIsediting(false);
        }

        const handleChange = (e) => {
            e.preventDefault();
            const {name, value} = e.target;
            setEditData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSave = (e) =>{
            e.preventDefault();

            //ここにデータベースの編集リクエストを送る
            setUserInfo({...editData});

            setIsediting(false);

            alert('プロフィールを更新しました');
        };

        const getGenreName = (genreId) => {
            const genre = GENRE_LIST.find(g => g.id === genreId);
            return genre ? genre.name : "未設定";
        };

        return(
            <div>
                <h2>マイページ</h2>
                {!isEditing ? (
                    <div className="profile-container" style={{padding: '20px', maxWidth: '500px', margin: '0 auto'}}> 
                        <div>
                            <span>ユーザーネーム</span>
                            <p>{userInfo.uname}</p>
                        </div>
                        <div>
                            <span>メールアドレス</span>
                            <p>{userInfo.email}</p>
                        </div>
                        <div>
                            <span>最寄り駅</span>
                            <p>{userInfo.station}駅</p>
                        </div>
                        <div>
                            <span>お気に入りジャンル</span>
                            <p>{getGenreName(userInfo.genre)}</p>
                        </div>
                        <button onClick={handleEditClick}>プロフィールを編集する</button>
                    </div>):
                (<form onSubmit={handleSave} className="profile-edit-form">
                    <div>
                        <label>ユーザーネーム</label>
                        <input type="text" name="uname" value={editData.uname} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>メールアドレス</label>
                        <input type="text" name="email" value={editData.email} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>最寄り駅</label>
                        <input type="text" name="station" value={editData.station} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>最も好きなジャンル</label>
                        <select name="genre" value={editData.genre} onChange={handleChange}>
                            <option value="">選択してください</option>
                            {GENRE_LIST.map(g =>(
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                    <button type="submit">変更を保存</button>
                    <button type="button" onClick={handleCancel}>キャンセル</button>
                    </div>
                </form>

                )}
            </div>

        )
    }
export default Profile;