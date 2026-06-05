import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";

function Welcome() {
    const navigate = useNavigate();

    return (
        <div className="welcome-container">
    
    <div className="welcome-card">
        <h1 className="welcome-title">
            🍽 イチゴグルメ
        </h1>

        <p className="welcome-subtitle">
            ランダムでお店と出会う新体験！
        </p>

        <div className="welcome-buttons">
            <button
                onClick={() => navigate("/login")}
                className="welcome-button login"
            >
                ログイン
            </button>

            <button
                onClick={() => navigate("/register")}
                className="welcome-button register"
            >
                新規登録
            </button>
        </div>

        <p className="welcome-note">
            🎲 今日のご飯は運任せ！
        </p>
    </div>

</div>
    );
}

export default Welcome;