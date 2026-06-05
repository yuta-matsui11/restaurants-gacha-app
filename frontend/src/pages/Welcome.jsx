import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Welcome.css";

import img1 from "../assets/food1.jpg";
import img2 from "../assets/food2.jpg";
import img3 from "../assets/food3.jpg";
import img4 from "../assets/food4.jpg";
import img5 from "../assets/food5.jpg";
import img6 from "../assets/food6.jpg";
// import img7 from "../assets/food7.jpg";
// import img8 from "../assets/food8.jpg";
// import img9 from "../assets/food9.jpg";
// import img10 from "../assets/food10.jpg";
// import img11 from "../assets/food11.jpg";
// import img12 from "../assets/food12.jpg";
// import img13 from "../assets/food13.jpg";

const images = [
  img1, img2, img3, img4, img5, img6,
//    img7,
//   img8, img9, img10, img11, img12, img13
];

function Welcome() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

const [prevIndex, setPrevIndex] = useState(0);

  // ゆっくり切り替え（10秒）
  useEffect(() => {
  const timer = setInterval(() => {
    setPrevIndex(index);
    setIndex((prev) => (prev + 1) % images.length);
  }, 8000);

  return () => clearInterval(timer);
}, [index]);

  return (
    <div className="welcome-container">
      
    {/* 背景スライド */}
<div className="background-wrapper">

  <div
    key={`prev-${prevIndex}`}
    className="background slide-out"
    style={{
      backgroundImage: `url(${images[prevIndex]})`,
    }}
  />

  <div
    key={`current-${index}`}
    className="background slide-in"
    style={{
      backgroundImage: `url(${images[index]})`,
    }}
  />

</div>

      {/* 固定UI */}
      <div className="welcome-overlay">
        <div className="welcome-card">
          <h1 className="welcome-title">🍽 イチゴグルメ</h1>

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

        </div>
      </div>
    </div>
  );
}

export default Welcome;