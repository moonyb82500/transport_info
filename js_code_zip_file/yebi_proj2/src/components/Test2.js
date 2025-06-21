import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import Plotly from 'plotly.js-dist';
import Papa from 'papaparse'; // CSV 파싱을 위한 라이브러리
import MapComponent from './MapComponent'; // 이미 존재하는 컴포넌트 import

const Test = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [graphData, setGraphData] = useState({ years: [], values: [] });
  const [csvData, setCsvData] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');

  useEffect(() => {
    // CSV 데이터 로딩
    fetch('/finaltrans.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            setCsvData(result.data);
            setDropdownValue('Seoul');
            updateGraph('Seoul');
            setIsSidebarVisible(true);
          },
        });
      })
      .catch((error) => {
        console.error('Error loading CSV file:', error);
      });
  }, []);

  const updateGraph = (regionName) => {
    const regionData = csvData.find((row) => row.location === regionName);
    if (!regionData) {
      setGraphData({ years: [], values: [] });
      setSelectedRegion(`No data found for ${regionName}`);
      return;
    }
    const years = ['2014', '2015', '2017', '2019', '2020', '2021'];
    const values = years.map((year) => parseInt(regionData[year].replace(/,/g, ''), 10) || 0);
    setSelectedRegion(regionName);
    setGraphData({ years, values });
  };

  useEffect(() => {
    if (graphData.years.length && graphData.values.length) {
      Plotly.newPlot('plotContainer', [{
        x: graphData.years,
        y: graphData.values,
        type: 'bar',
        text: graphData.values.map(val => val.toLocaleString()),
        textposition: 'auto'
      }], {
        title: `${selectedRegion}의 수송 실적`,
        margin: { t: 40, b: 50, l: 50, r: 20 },
      });
    }
  }, [graphData]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: isSidebarVisible ? '75%' : '100%' }}>
        <MapComponent />
      </div>
      {isSidebarVisible && (
        <div style={{ width: '25%', padding: '10px' }}>
          <h3>{selectedRegion || 'Select a region'}</h3>
          <select value={dropdownValue} onChange={(e) => {
            setDropdownValue(e.target.value);
            updateGraph(e.target.value);
          }}>
            <option value="Seoul">서울</option>
            <option value="Busan">부산</option>
            <option value="Daegu">대구</option>
            <option value="Incheon">인천</option>
            <option value="Gwangju">광주</option>
            <option value="Daejeon">대전</option>
            <option value="Ulsan">울산</option>
            <option value="Gyeonggi">경기</option>
            <option value="Gangwon">강원</option>
            <option value="Chungcheongbukdo">충청북도</option>
            <option value="Chungcheongnamdo">충청남도</option>
            <option value="Jeollabukdo">전라북도</option>
            <option value="Jeollanamdo">전라남도</option>
            <option value="Gyeongsangbukdo">경상북도</option>
            <option value="Gyeongsangnamdo">경상남도</option>
            <option value="Jeju">제주</option>
            <option value="Sejong">세종</option>
            {/* 다른 도시들도 추가하세요 */}
          </select>
          <div id="plotContainer" style={{ height: '300px' }}></div>
        </div>
      )}
    </div>
  );
};

export default Test;