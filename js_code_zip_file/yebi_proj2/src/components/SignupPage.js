import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("회원가입 완료");
    window.alert("회원가입이 완료되었습니다"); 
    navigate("/login"); 
  };

  return (
    <div style={signupPageStyle}>
      <div style={titleBoxStyle}>
        <h1 style={titleTextStyle}>LogiMap은 처음이신가요?</h1>
      </div>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label style={labelStyle}>
          이름:
          <input type="text" name="name" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          이메일:
          <input type="email" name="email" style={inputStyle} />
        </label>
        <label style={labelStyle}>
          비밀번호:
          <input type="password" name="password" style={inputStyle} />
        </label>
        <button type="submit" style={submitButtonStyle}>
          회원가입
        </button>
      </form>
    </div>
  );
};

const signupPageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f9fafb",
};

const titleBoxStyle = {
  backgroundColor: "#4f46e5",
  padding: "20px 40px",
  borderRadius: "10px",
  marginBottom: "20px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const titleTextStyle = {
  margin: 0,
  color: "white",
  fontSize: "24px",
  fontWeight: "bold",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  width: "300px",
};

const labelStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  textAlign: "left",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #d1d5db",
  width: "100%",
  boxSizing: "border-box",
};

const submitButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#60a5fa",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
};

export default SignupPage;
