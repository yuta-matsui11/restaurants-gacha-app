//ホーム画面、検索条件を入力しガチャの実行を要求する。
import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//ホットペッパーグルメAPIのジャンルにのっとって作成しています
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

function Home(){
    const navigate = useNavigate();

    const [station, setStation] = useState('');
    const [range, setRange] = useState('3');
    const [selectGenre, setSelectGenre] = useState([]);

    const [error, setError] = useState('');

    const handleGenreChange = (genreId) => {
        setSelectGenre((prev) => {
            if(prev.includes(genreId)) {
                return prev.filter((id) => id !== genreId);
            }
            else{
                return [...prev, genreId];
            }
        });
    };


    const handleGacha = (e) => {
        e.preventDefault();
        const searchConditions = {
            station: station,
            range: range,
            genres: selectGenre
        };

        navigate('/gachaexecute', {state: searchConditions});
    };

    return(
        <div>
            <h2>条件入力</h2>
            <form onSubmit={handleGacha}>
                <label>駅名　※必須</label><input type="text" value={station} onChange={(e) => setStation(e.target.value)}/>
                <br/>
                {/*検索範囲の選択*/}
                <label>検索範囲</label>
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                    <option value="1">300m</option>
                    <option value="2">500m</option>
                    <option value="3">1000m</option>
                    <option value="4">2000m</option>
                    <option value="5">3000m</option>
                </select>
                <br/>
                {/*検索ジャンルの選択（複数選択可） */}
                <label>ジャンル(複数選択可能)　※未選択の場合はすべてのジャンルから抽選されます</label>
                <br/>
                {GENRE_LIST.map((genre)=>(<label key={genre.id}>
                    <input type="checkbox" checked={selectGenre.includes(genre.id)} onChange={() => handleGenreChange(genre.id)}/>
                {genre.name}</label>))
                
                }   
                <br/>
                <button type="submit">ガチャる！</button>
            </form>
        </div>
    )
}
export default Home;