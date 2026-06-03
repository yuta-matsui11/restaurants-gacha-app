import React from 'react';
import { useNavigate } from 'react-router-dom';

function Privacy() {
    const navigate = useNavigate();

    return (
        <div className="privacy" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", color: "#ffffff", backgroundColor: "transparent" }}>
            <h1 style={{ borderBottom: "2px solid #ff8c00", paddingBottom: "10px", color: "#ffffff", textAlign: "center" }}>プライバシーポリシー</h1>
            <p style={{ color: "#aaaaaa", fontSize: "0.9rem", textAlign: "center", marginBottom: "30px" }}>最終更新日：2026年6月3日</p>

            <p style={{ color: "#ffffff" }}>一期一会グルメガチャ（以下，「当サービス」といいます。）は，本サービスにおいて取得するユーザーの個人情報の取扱いについて，以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第1条（個人情報の収集方法）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは，ユーザーが利用登録をする際にユーザーネーム、メールアドレス、最寄り駅、お気に入りジャンル等の個人情報を取得することがあります。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第2条（個人情報を収集・利用する目的）</h3>
            <p style={{ color: "#dddddd" }}>当サービスが個人情報を収集・利用する目的は，以下のとおりです。</p>
            <ul style={{ color: "#dddddd", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>当サービスの提供・運営のため</li>
                <li style={{ marginBottom: "5px" }}>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                <li style={{ marginBottom: "5px" }}>ユーザーが利用中のサービスの新機能，更新情報等をお届けするため</li>
                <li style={{ marginBottom: "5px" }}>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
                <li style={{ marginBottom: "5px" }}>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をおこない，利用を断るため</li>
                <li style={{ marginBottom: "5px" }}>ユーザー自身の登録情報の閲覧や変更，削除，利用状況の閲覧を行っていただくため</li>
            </ul>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第3条（個人情報の第三者提供）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。</p>
            <ul style={{ color: "#dddddd", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難であるとき</li>
                <li style={{ marginBottom: "5px" }}>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難であるとき</li>
                <li style={{ marginBottom: "5px" }}>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
                <li style={{ marginBottom: "5px" }}>その他、法令に基づく場合</li>
            </ul>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第4条（安全管理措置）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは、ユーザーの個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第5条（プライバシーポリシーの変更）</h3>
            <p style={{ color: "#dddddd" }}>本ポリシーの内容は，ユーザーに通知することなく，変更することができるものとします。当サービスが別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</p>

            <div style={{ marginTop: "50px", textAlign: "center" }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        padding: "12px 30px",
                        fontSize: "1rem",
                        backgroundColor: "#7755ff",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
                    }}
                >
                    マイページに戻る
                </button>
            </div>
        </div>
    );
}

export default Privacy;