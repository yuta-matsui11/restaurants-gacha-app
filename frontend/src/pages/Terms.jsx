import React from 'react';
import { useNavigate } from 'react-router-dom';

function Terms() {
    const navigate = useNavigate();

    return (
        <div className="terms" style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto", lineHeight: "1.8", color: "#ffffff", backgroundColor: "transparent" }}>
            <h1 style={{ borderBottom: "2px solid #ff8c00", paddingBottom: "10px", color: "#ffffff", textAlign: "center" }}>利用規約</h1>
            <p style={{ color: "#aaaaaa", fontSize: "0.9rem", textAlign: "center", marginBottom: "30px" }}>最終更新日：2026年6月3日</p>

            <p style={{ color: "#ffffff" }}>この利用規約（以下，「本規約」といいます。）は，一期一会グルメガチャ（以下，「当サービス」といいます。）が提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆様（以下，「ユーザー」といいます。）には，本規約に従って本サービスをご利用いただきます。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第1条（適用）</h3>
            <p style={{ color: "#dddddd" }}>本規約は，ユーザーと当サービスとの間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第2条（ユーザー登録とアカウント管理）</h3>
            <p style={{ color: "#dddddd" }}>1. 本サービスにおいては，登録希望者が本規約に同意の上，当サービスの定める方法によってユーザー登録を申請し，当サービスがこれを承認することによって，ユーザー登録が完了します。</p>
            <p style={{ color: "#dddddd" }}>2. ユーザーは，自己の責任において，本サービスのログイン情報およびパスワードを適切に管理するものとします。いかなる場合にも、これらを第三者に譲渡または貸与することはできません。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第3条（禁止事項）</h3>
            <p style={{ color: "#dddddd" }}>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
            <ul style={{ color: "#dddddd", paddingLeft: "20px" }}>
                <li style={{ marginBottom: "5px" }}>法令または公序良俗に違反する行為</li>
                <li style={{ marginBottom: "5px" }}>犯罪行為に関連する行為</li>
                <li style={{ marginBottom: "5px" }}>当サービスのサーバーまたはネットワークの機能を破壊したり，妨害したりする行為</li>
                <li style={{ marginBottom: "5px" }}>当サービスのサービスの運営を妨害するおそれのある行為</li>
                <li style={{ marginBottom: "5px" }}>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li style={{ marginBottom: "5px" }}>他のユーザーに成りすます行為</li>
                <li style={{ marginBottom: "5px" }}>その他，当サービスが不適切と判断する行為</li>
            </ul>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第4条（本サービスの提供の停止等）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは，システム保守、火災・停電、天災地変、またはその他やむえない事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第5条（免責事項）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは、本サービスによって提供される飲食店情報等の正確性、完全性、有用性について保証するものではありません。本サービスに関してユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について、当サービスは一切責任を負いません。</p>

            <h3 style={{ marginTop: "30px", borderLeft: "4px solid #ff8c00", paddingLeft: "10px", color: "#ffffff" }}>第6条（利用規約の変更）</h3>
            <p style={{ color: "#dddddd" }}>当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお，本規約の変更後，本サービスの利用を開始した場合には，ユーザーは変更後の規約に同意したものとみなします。</p>

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

export default Terms;