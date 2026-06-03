import {useState} from 'react';
import "../styles/Contact.css";

function Contact(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
         consle.log(formData);
        alert('お問い合わせ内容が送信されました。');
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

   return (
    <div className="contact-container">
      <h2>お問い合わせ</h2>
      <p>ご意見・ご要望などお気軽にお問い合わせください。</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>お名前</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>メールアドレス</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>件名</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label>お問い合わせ内容</label>
        <textarea
          name="message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          送信する
        </button>
      </form>
    </div>
  );
}
export default Contact;