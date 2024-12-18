import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Css/Login.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import darkLogo from '../Logo/darkLogo.png';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState();
  const [toPost, setToPost] = useState(false);
  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    console.log(errorMsg);
  }, [errorMsg]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = (e) => {
    axios
      .post('http://localhost:4000/login', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token); // JWT 토큰 저장
      })
      .then(() => {
        if (toPost) {
          if (state) {
            navigate('/post', { state });
          } else {
            navigate('/post');
          }
        } else {
          navigate('/community');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.message);
      });
  };

  useEffect(() => {
    if (state) {
      if (state.toPost) {
        setToPost(true);
      }
    }
  }, [state]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/community');
    }
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.login}>
        <img
          onClick={() => {
            navigate('/');
          }}
          src={darkLogo}
        />

        <input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {errorMsg ? (
          <div style={{ color: 'red', margin: '0 auto' }}>{errorMsg}</div>
        ) : (
          <div style={{ color: 'transparent' }}> ""</div>
        )}
        <button onClick={handleLogin}>로그인</button>
        <h3
          onClick={() => {
            navigate('/register');
          }}
        >
          회원가입
        </h3>
      </div>
    </div>
  );
}

export default Login;
