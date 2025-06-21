import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onFilterChange }) {
  const navigate = useNavigate();

  const handleLogiMapClick = () => {
    navigate("/");
  };

  const handleWarehouseClick = () => {
    navigate("/test3");
  };

  const handleTransportStatsClick = () => {
    navigate("/test2");
  };

  const handleCompanyWarehouseClick = () => {
    onFilterChange("ALL"); 
    navigate("/test");
  };

  const handleClusteringClick = () => {
    navigate("/test4");
  };

  const handleColorButtonClick = (color) => {
    onFilterChange(color);
  };

  return (
    <div style={sidebarStyle}>
      <div style={titleStyle} onClick={handleLogiMapClick}>
        LogiMap
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleLogiMapClick}>
          🏠 Main (인구 밀도)
        </button>
        <button style={buttonStyle} onClick={handleWarehouseClick}>
          물류창고업 현황
        </button>
        <button style={buttonStyle} onClick={handleTransportStatsClick}>
          목적지 수송실적
        </button>
        <button style={buttonStyle} onClick={handleCompanyWarehouseClick}>
          주요 기업별 창고 위치
        </button>
        <button style={buttonStyle} onClick={handleClusteringClick}>
          클러스터링
        </button>
      </div>
      <div style={colorButtonContainerStyle}>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#f87171" }}
          onClick={() => handleColorButtonClick("A")}
        >
          A
        </button>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#fb923c" }}
          onClick={() => handleColorButtonClick("B")}
        >
          B
        </button>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#4ade80" }}
          onClick={() => handleColorButtonClick("C")}
        >
          C
        </button>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#60a5fa" }}
          onClick={() => handleColorButtonClick("D")}
        >
          D
        </button>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#a78bfa" }}
          onClick={() => handleColorButtonClick("E")}
        >
          E
        </button>
        <button
          style={{ ...colorButtonStyle, backgroundColor: "#b67236" }}
          onClick={() => handleColorButtonClick("ALL")}
        >
          ALL
        </button>
      </div>
    </div>
  );
}


const sidebarStyle = {
  backgroundColor: "#f3f4f6",
  height: "100%",
  width: "320px",
  boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "0 12px 12px 0",
};

const titleStyle = {
  backgroundColor: "#60a5fa",
  width: "100%",
  padding: "16px 0",
  marginBottom: "24px",
  textAlign: "center",
  fontSize: "24px",
  fontWeight: "bold",
  color: "white",
  borderRadius: "12px",
  cursor: "pointer", // 클릭 가능하게 커서 변경
};

const buttonContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "white",
  color: "#374151",
  fontWeight: "600",
  textAlign: "center",
  borderRadius: "25px",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const colorButtonContainerStyle = {
  display: "flex",
  justifyContent: "space-around",
  width: "100%",
  marginTop: "32px",
};

const colorButtonStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  color: "white",
  border: "none",
  cursor: "pointer",
};
