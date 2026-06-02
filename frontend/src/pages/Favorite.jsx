import "../styles/Favorite.css";

function Favorite() {
    const favorites = [
        {
            id: 1,
            image: "https://picsum.photos/120/80?11",
            name: "炭火焼き鳥 ○○",
            genre: "居酒屋・焼き鳥",
            area: "渋谷駅周辺",
            rating: 4.2,
        },
        {
            id: 2,
            image: "https://picsum.photos/120/80?12",
            name: "イタリアンバル ○○",
            genre: "イタリアン",
            area: "恵比寿駅周辺",
            rating: 4.5,
        },
        {
            id: 3,
            image: "https://picsum.photos/120/80?13",
            name: "海鮮居酒屋 ○○",
            genre: "海鮮・寿司",
            area: "新宿駅周辺",
            rating: 4.1,
        },
    ];

    return (
        <div className="favorite-container">
            <h1><span className="heart">❤</span>お気に入り一覧</h1>
            <p className="favorite-description">
                お気に入り登録したお店の一覧です
            </p>

            {favorites.map((favorite) => (
                <div key={favorite.id} className="favorite-card">

                    <img
                        src={favorite.image}
                        alt={favorite.name}
                        className="favorite-image"
                    />

                    <div className="favorite-info">
                        <h2>{favorite.name}</h2>

                        <div className="info-row">
                            <span className="label">ジャンル：</span>
                            <span>{favorite.genre}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">エリア：</span>
                            <span>{favorite.area}</span>
                        </div>

                        <div className="info-row">
                            <span className="label">評価：</span>
                            <span>
                                <span className="star">★</span>
                                {favorite.rating}
                            </span>
                        </div>
                    </div>

                    <div className="favorite-buttons">
                        <button className="detail-btn">
                            詳細を見る
                        </button>

                        <button className="remove-btn">
                            お気に入り解除
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default Favorite;