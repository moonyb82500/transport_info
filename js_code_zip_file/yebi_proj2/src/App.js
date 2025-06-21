// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import MapComponent from "./components/MapComponent";
// import Test from "./components/Test";
// import LoginPage from "./components/LoginPage";
// import SignupPage from "./components/SignupPage";
// import Test2 from "./components/Test2";
// import MapWithClustering from "./components/MapWithClustering"; // 클러스터링 컴포넌트 추가
// import Test4 from "./components/Test4"; // 새로운 Test4 컴포넌트 추가
// import "./App.css";

// function App() {
//   const [filters, setFilters] = useState({});
//   const [markerData, setMarkerData] = useState([
//     { id: "A", lat: 37.5665, lng: 126.9780, title: "서울" },
//     { id: "B", lat: 35.1796, lng: 129.0756, title: "부산" },
//     { id: "C", lat: 35.8722, lng: 128.6014, title: "대구" },
//   ]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     if (newFilters === "ALL") {
//       setMarkerData([
//         { id: "A", lat: 37.5665, lng: 126.9780, title: "서울" },
//         { id: "B", lat: 35.1796, lng: 129.0756, title: "부산" },
//         { id: "C", lat: 35.8722, lng: 128.6014, title: "대구" },
//       ]);
//     } else if (newFilters === "A") {
//       setMarkerData([{ id: "A", lat: 37.5665, lng: 126.9780, title: "서울" }]);
//     } else if (newFilters === "B") {
//       setMarkerData([{ id: "B", lat: 35.1796, lng: 129.0756, title: "부산" }]);
//     } else if (newFilters === "C") {
//       setMarkerData([{ id: "C", lat: 35.8722, lng: 128.6014, title: "대구" }]);
//     }
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <div className="main-content" style={{ display: "flex" }}>
//           <Sidebar
//             filters={filters}
//             onFilterChange={handleFilterChange}
//             setMarkerData={setMarkerData}
//           />
//           <div className="map-container" style={{ flex: 1 }}>
//             <Routes>
//               {/* 홈 경로 */}
//               <Route
//                 path="/"
//                 element={
//                   <MapComponent filters={filters} markerData={markerData} />
//                 }
//               />
//               {/* 테스트 페이지 */}
//               <Route
//                 path="/test"
//                 element={<Test filters={filters} markerData={markerData} />}
//               />
//               {/* 로그인 페이지 */}
//               <Route path="/login" element={<LoginPage />} />
//               {/* 회원가입 페이지 */}
//               <Route path="/signup" element={<SignupPage />} />
//               {/* 테스트 2 */}
//               <Route path="/test2" element={<Test2 filters={filters} />} />
//               {/* 클러스터링 페이지 */}
//               <Route
//                 path="/test3"
//                 element={<MapWithClustering markerData={markerData} />}
//               />
//               {/* 테스트 4 */}
//               <Route path="/test4" element={<Test4 />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;











import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MapComponent from "./components/MapComponent";
import Test from "./components/Test";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Test2 from "./components/Test2";
import MapWithClustering from "./components/MapWithClustering"; // 클러스터링 컴포넌트 추가
import Test4 from "./components/Test4"; // 새로운 Test4 컴포넌트 추가
import { AuthProvider } from "./context/AuthContext"; // AuthContext 추가
import "./App.css";

function App() {
  const [filters, setFilters] = useState({});
  const [markerData, setMarkerData] = useState([
    { id: "A", lat: 37.5665, lng: 126.9780, title: "서울" },
    { id: "B", lat: 35.1796, lng: 129.0756, title: "부산" },
    { id: "C", lat: 35.8722, lng: 128.6014, title: "대구" },
  ]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    if (newFilters === "ALL") {
      setMarkerData([
        { id: "A", lat: 37.5665, lng: 126.9780, title: "서울" },
        { id: "B", lat: 35.1796, lng: 129.0756, title: "부산" },
        { id: "C", lat: 35.8722, lng: 128.6014, title: "대구" },
      ]);
    } else if (newFilters === "A") {
      setMarkerData([{ id: "A", lat: 37.5665, lng: 126.9780, title: "서울" }]);
    } else if (newFilters === "B") {
      setMarkerData([{ id: "B", lat: 35.1796, lng: 129.0756, title: "부산" }]);
    } else if (newFilters === "C") {
      setMarkerData([{ id: "C", lat: 35.8722, lng: 128.6014, title: "대구" }]);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="main-content" style={{ display: "flex" }}>
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              setMarkerData={setMarkerData}
            />
            <div className="map-container" style={{ flex: 1 }}>
              <Routes>
                {/* 홈 경로 */}
                <Route
                  path="/"
                  element={
                    <MapComponent filters={filters} markerData={markerData} />
                  }
                />
                {/* 테스트 페이지 */}
                <Route
                  path="/test"
                  element={<Test filters={filters} markerData={markerData} />}
                />
                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />
                {/* 회원가입 페이지 */}
                <Route path="/signup" element={<SignupPage />} />
                {/* 테스트 2 */}
                <Route path="/test2" element={<Test2 filters={filters} />} />
                {/* 클러스터링 페이지 */}
                <Route
                  path="/test3"
                  element={<MapWithClustering markerData={markerData} />}
                />
                {/* 테스트 4 */}
                <Route path="/test4" element={<Test4 />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
