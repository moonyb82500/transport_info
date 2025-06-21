import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // React Router Link와 useNavigate 가져오기
import { MapPin } from "lucide-react";
import { AuthContext } from "../context/AuthContext"; // AuthContext 가져오기

export default function Header() {
  const { isLoggedIn, logout } = useContext(AuthContext); // 로그인 상태와 로그아웃 함수 가져오기
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃 상태로 변경
    navigate("/login"); // 로그인 페이지로 이동
  };

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSectionStyle}>
          <MapPin style={iconStyle} />
          <div>
            <h1 style={titleStyle}>인구 밀도를 고려한 물류센터 유통 시각화 프로그램</h1>
            <p style={subtitleStyle}>SW-5: FBI</p>
          </div>
        </div>
        <nav style={navStyle}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={linkStyle}>
                로그인
              </Link>
              <Link to="/signup" style={linkStyle}>
                회원가입
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} style={logoutButtonStyle}>
              로그아웃
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

// 스타일 객체
const headerStyle = {
  backgroundColor: "#4f46e5",
  color: "white",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  padding: "16px 0",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "1024px",
  margin: "0 auto",
  padding: "0 16px",
};

const leftSectionStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const iconStyle = {
  width: "32px",
  height: "32px",
};

const titleStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: 0,
};

const subtitleStyle = {
  fontSize: "0.875rem",
  color: "#c3cfe5",
  margin: 0,
};

const navStyle = {
  display: "flex",
  gap: "16px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  transition: "color 0.3s",
};

const logoutButtonStyle = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  cursor: "pointer",
  fontSize: "1rem",
  textDecoration: "underline",
  padding: 0,
};

linkStyle[":hover"] = { color: "#c3cfe5" };
logoutButtonStyle[":hover"] = { color: "#c3cfe5" };
