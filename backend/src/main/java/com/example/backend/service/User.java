package com.example.backend.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * サービス層やセッション管理等で利用する、軽量なユーザー情報保持クラス
 * （※DB保存用のentity.Userとは異なり、パスワードなどの機密情報を含まないようにしています）
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    
    /** ユーザーID */
    private Long user_id;
    
    /** ユーザー名 */
    private String user_name;
    
    /** メールアドレス */
    private String email;
}
