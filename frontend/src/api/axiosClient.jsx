import axios from 'axios';

// Spring BootのサーバーURL（ローカル環境）をベースに設定
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api', 
   withCredentials: true, //追加した
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10秒応答がなければタイムアウト（要件定義: APIレスポンス遅延対応）
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.response && (error.response.status === 401 || error.response.status === 403)){

      const currentPath = window.location.pathname;

      if(currentPath !== '/login' && currentPath !== '/register' && currentPath !== '/'){
        alert("セッションが切れました。再度ログインしてください。");
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;