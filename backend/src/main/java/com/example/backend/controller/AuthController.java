package com.example.backend.controller;
//ログイン・ユーザー登録のAPIエンドポイント

import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import com.example.backend.dto.Dtos; // Dtosクラスをインポート
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * API-003 / API-004: ユーザー登録・ログイン認証を担当するコントローラー
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**
     * API-003: ユーザー登録
     * POST /api/auth/register
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Dtos.UserRequest request) {
        try {
            // サービスを呼び出して登録処理を実行
            User registeredUser = authService.registerUser(request);

            // レスポンス用のDTO（Dtos.UserResponse）にデータを詰め替える
            Dtos.UserResponse response = new Dtos.UserResponse();
            response.user_id = registeredUser.getUser_id();
            response.user_name = registeredUser.getUser_name();
            response.email = registeredUser.getEmail();

            // HTTP 200 OK で登録成功したユーザー情報を返却
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // メールアドレス重複などの業務エラーは HTTP 400 Bad Request でメッセージを返す
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * API-004: ログイン認証
     * POST /api/auth/login
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Dtos.LoginRequest request, HttpSession session) {
        try {
            // サービスを呼び出してログイン認証を実行
            User loginUser = authService.login(request);

            // 💡 セッション管理: 認証に成功したら、サーバー側のセッションにユーザーIDを保存
            // これにより、API-005以降の「セッション認証必須」のAPIが使えるようになります
            session.setAttribute("LOGIN_USER_ID", loginUser.getUser_id());

            // レスポンス用のDTOにデータを詰め替える
            Dtos.UserResponse response = new Dtos.UserResponse();
            response.user_id = loginUser.getUser_id();
            response.user_name = loginUser.getUser_name();
            response.email = loginUser.getEmail();

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // 認証失敗（メールアドレス存在しない・パスワード不一致）は HTTP 401 Unauthorized で返す
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

}
