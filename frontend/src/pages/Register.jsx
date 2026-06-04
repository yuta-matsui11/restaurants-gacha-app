//ユーザー登録を行う画面
import "../styles/Register.css";

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [uname, setUname] = useState('');
    const [station, setStation] = useState('');
    const [genre, setGenre] = useState('');

    const [unameError, setUnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [stationError, setStationError] = useState('');
    const [genreError, setGenreError] = useState('');

    const handleRegister = async (e) => {

        e.preventDefault();
        let isValid = true;

        setUnameError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setStationError('');
        setGenreError('');

        // ユーザーネーム
        if (!uname.trim()) {
            setUnameError('ユーザーネームを入力してください');
            isValid = false;
        } else if (uname.length > 20) {
            setUnameError('ユーザーネームは20文字以下で入力してください');
            isValid = false;
        }

        // メールアドレス
        if (!email.trim()) {
            setEmailError('メールアドレスを入力してください');
            isValid = false;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            setEmailError('メールアドレスの形式が正しくありません');
            isValid = false;
        }

        // パスワード
        if (!password) {
            setPasswordError('パスワードを入力してください');
            isValid = false;
        } else if (
            !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/.test(password)
        ) {
            setPasswordError('パスワードは8～32文字で半角英字と数字をそれぞれ1文字以上含めてください');
            isValid = false;
        }

        // パスワード確認
        if (!confirmPassword) {
            setConfirmPasswordError('確認用パスワードを入力してください');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('パスワードと確認用パスワードが一致しません');
            isValid = false;
        }


        // 最寄り駅
        if (!station.trim()) {
            setStationError('最寄り駅を入力してください');
            isValid = false;
        }

        // ジャンル
        if (!genre) {
            setGenreError('ジャンルを選択してください');
            isValid = false;
        }

        if (!isValid) {
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_name: uname,
                        email: email,
                        password_hash: password,
                        nearest_station: station,
                        favorite_genre_id: genre,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            alert("登録成功");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("サーバー接続失敗");
        }
    };
    return (
        <div className="register-container">
            <div className="register-card">
                <h2>ユーザー登録</h2>
                <form onSubmit={handleRegister}>
                    <label>ユーザーネーム</label><input type="text" placeholder="いとうたいが" value={uname} onChange={(e) => setUname(e.target.value)} />
                    {unameError && <p className="error-message">{unameError}</p>}

                    <label>メールアドレス</label><input type="email" placeholder="ito@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <p className="error-message">{emailError}</p>}

                    <label>パスワード</label><input type="password" placeholder="ito110" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <p className="error-message">{passwordError}</p>}

                    <label>パスワード（確認）</label><input type="password" placeholder="もう一度入力してください" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {confirmPasswordError && (<p className="error-message">{confirmPasswordError}</p>)}

                    <label>最寄り駅</label><input type="text" placeholder="大崎" value={station} onChange={(e) => setStation(e.target.value)} />
                    {stationError && <p className="error-message">{stationError}</p>}

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
                    {genreError && <p className="error-message">{genreError}</p>}


                    <button type="submit" className="register-submit-btn">
                        登録
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Register;