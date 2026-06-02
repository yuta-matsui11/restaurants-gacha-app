//ユーザー登録を行う画面
import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Register(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uname, setUname] = useState('');
    const [station, setStation] = useState('');
    const [genre, setGenre] = useState(''); 
    const handleRegister = () => {
        navigate('/login');
    };

    return(
        <div>
            <h2>ユーザー登録</h2>
            <form onSubmit={handleRegister}>
                <label>ユーザーネーム</label><input type="text" value={uname} onChange={(e) => setUname(e.target.value)}/>
                <br/>
                <label>メールアドレス</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br/>
                <label>パスワード</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br/>
                <label>最寄り駅</label><input type="text" value={station} onChange={(e) => setStation(e.target.value)}/>
                <br/>
                <label>最も好きな飲食店ジャンル</label>
                <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">選択してください</option>
                    <option value="G001">居酒屋</option>
                    <option value="G002">ダイニングバー・バル</option>
                    <option value="G003">創作料理</option>
                    <option value="G004">和食</option>
                    <option value="G005">洋食</option>
                    <option value="G006">イタリアン・フレンチ</option>
                    <option value="G007">中華</option>
                    <option value="G008">焼肉・ホルモン</option>
                    <option value="G009">アジア・エスニック料理</option>
                    <option value="G010">各国料理</option>
                    <option value="G011">カラオケ・パーティ</option>
                    <option value="G012">バー・カクテル</option>
                    <option value="G013">ラーメン</option>
                    <option value="G014">カフェ・スイーツ</option>
                    <option value="G015">その他グルメ</option>
                    <option value="G016">お好み焼き・もんじゃ</option>
                    <option value="G017">韓国料理</option>
                </select>
                <br/>
                <button type="submit">登録</button>
            </form>
        </div>
    )
}
export default Register;