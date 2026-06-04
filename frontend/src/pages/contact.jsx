import "../styles/Contact.css";
import { useNavigate } from 'react-router-dom';

function Contact(){
  const navigate = useNavigate();

   return (
    <div className="contact-container">
      <h2>お問い合わせ</h2>
      <p>ご意見・ご要望はお気軽にご連絡ください。</p>

      <div className="contact-info">
        <div className="contact-item">
          <span className="contact-label">📞 電話番号</span>
          <span className="contact-value">03-XXXX-XXXX</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">🕐 受付時間</span>
          <span className="contact-value">平日 10:00 〜 18:00</span>
        </div>
        <div className="contact-item">
          <span className="contact-label">📧 メール</span>
          <span className="contact-value">support@example.com</span>
        </div>
      </div>

      <p className="contact-note">※ お問い合わせ内容によっては、回答までにお時間をいただく場合があります。</p>

      <div style={{ marginTop: "40px", textAlign: "center" }}>
        <button
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          マイページに戻る
        </button>
      </div>
    </div>
  );
}
export default Contact;