package com.example.backend.service;

// ログイン・登録の処理

import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.dto.Dtos; // Dtosクラスをインポート
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * ログイン・登録 of 処理を担当するサービス・クラス
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * API-003: ユーザー登録処理
     * @param request 登録リクエストデータ (Dtos.UserRequest)
     * @return 登録されたユーザー情報
     * @throws IllegalArgumentException メールアドレスが既に存在する場合
     */
    @Transactional
    public User registerUser(Dtos.UserRequest request) {
        // 1. メールアドレスの重複チェック
        if (userRepository.existsByEmail(request.email)) {
            throw new IllegalArgumentException("指定されたメールアドレスは既に登録されています。");
        }

        // 2. パスワードのハッシュ化
        String encodedPassword = passwordEncoder.encode(request.password_hash);

        // 3. データの詰め替えとエンティティの生成（UserのLombokメソッド名に合わせました）
        User user = new User();
        user.setUser_name(request.user_name);
        user.setEmail(request.email);
        user.setPassword_hash(encodedPassword);
        // created_at は User.java 側で @Builder.Default もしくは初期値として入るため、ここではセットしなくても自動で現在時刻になります

        // 4. リポジトリ経由でDBへ保存
        return userRepository.save(user);
    }

    /**
     * API-004: ログイン認証処理
     * @param request ログインリクエストデータ (Dtos.LoginRequest)
     * @return 認証に成功したユーザー情報
     * @throws IllegalArgumentException メールアドレスが存在しない、またはパスワードが不一致の場合
     */
    @Transactional(readOnly = true)
    public User login(Dtos.LoginRequest request) {
        // 1. メールアドレスでユーザーを検索
        User user = userRepository.findByEmail(request.email)
                .orElseThrow(() -> new IllegalArgumentException("メールアドレスまたはパスワードが正しくありません。"));

        // 2. 入力された生パスワードとDBのハッシュ化パスワードを照合（UserのLombokメソッド名に合わせました）
        if (!passwordEncoder.matches(request.password_hash, user.getPassword_hash())) {
            throw new IllegalArgumentException("メールアドレスまたはパスワードが正しくありません。");
        }

        // 3. 認証成功。呼び出し元のControllerにユーザー情報を返却
        return user;
    }
}