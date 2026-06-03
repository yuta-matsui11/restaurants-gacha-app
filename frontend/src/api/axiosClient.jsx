import axios from 'axios';

// Spring BootのサーバーURL（ローカル環境）をベースに設定
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒応答がなければタイムアウト（要件定義: APIレスポンス遅延対応）
});

export default axiosClient;