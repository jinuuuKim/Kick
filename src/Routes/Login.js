import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Css/Login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import darkLogo from "../Logo/darkLogo.png";

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [errorMsg, setErrorMsg] = useState();
	const navigate = useNavigate();

	const handleLogin = () => {
		axios
			.post('http://localhost:4000/login', { username, password })
			.then((response) => {
				localStorage.setItem('token', response.data.token); // JWT 토큰 저장
				navigate('/community');
			})
			.catch((error) => {
				setErrorMsg(error.response.data.message);
			});
	};

  return (
    <div className={styles.body}>
      <div className={styles.login}>
        <img
          onClick={() => {
            navigate("/");
          }}
          src={darkLogo}
        />
        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br/>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <button onClick={handleLogin}>로그인</button>
        <h3 onClick={() => {navigate("/register");}}>회원가입</h3>
      </div>
    </div>
  );
}

export default Login;
