import React, { useEffect } from 'react';
import $ from 'jquery';

const MapComponent = ({ showMarkers, markerData }) => {
  useEffect(() => {
    if (!window.naver) {
      console.error("Naver Maps API failed to load");
      return;
    }
    const mapOptions = {
      center: new window.naver.maps.LatLng(36.5, 127.5), 
      zoom: 7,
      mapTypeId: 'normal',
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    const populationData = {};
    const dataFiles = [
      'bs.json', 'dg.json', 'dj.json', 'gyeonggi.json', 'gj.json',
      'ic.json', 'se.json', 'sj.json', 'us.json', 'gb.json', 'jn.json',
      'jb.json', 'chungchongnamdo.json', 'jj.json', 'gn.json', 'cb.json', 'gw.json'
    ];

    dataFiles.forEach((fileName) => {
      $.getJSON(`${process.env.PUBLIC_URL}/${fileName}`, (data) => {
        data.forEach((entry) => {
          populationData[entry.SIG_KOR_NM] = entry.SIG_KOR_PD;
        });
      });
    });

    
    function getDensityColor(density) {
      return density > 20000 ? '#C72316' :
             density > 10000 ? '#CF3B21' :
             density > 5000 ? '#D7582D' :
             density > 2000 ? '#E1773C' :
             density > 250 ? '#EA974B' :
             density > 100 ? '#F3B75B' :
             density > 50 ? '#FDD76A' : '#FDD76A';
    }

    $.getJSON(`${process.env.PUBLIC_URL}/dksrn.json`, (data) => {
      const infoWindow = new window.naver.maps.InfoWindow({
        anchorSkew: true,
      });

      
      map.data.setStyle((feature) => {
        const regionName = feature.getProperty('SIG_KOR_NM');
        const density = populationData[regionName] || 0; 
        return {
          fillColor: getDensityColor(density),
          fillOpacity: 0.6,
          strokeColor: '#000000',
          strokeWeight: 1,
          strokeOpacity: 0.5,
        };
      });

      map.data.addGeoJson(data);

      map.data.addListener('click', (e) => {
        const feature = e.feature;
        const regionName = feature.getProperty('SIG_KOR_NM');
        const density = populationData[regionName] || '정보 없음';

        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.setContent(`
            <div style="padding:10px;">
              <strong>${regionName}</strong><br>
              인구밀도: ${density}명/㎢
            </div>
          `);
          infoWindow.open(map, e.coord);
        }
      });

      map.data.addListener('mouseover', (e) => {
        const feature = e.feature;
        map.data.overrideStyle(feature, {
          fillOpacity: 0.8,
          strokeWeight: 2,
        });
      });

      map.data.addListener('mouseout', (e) => {
        map.data.revertStyle();
      });
    });

   
    if (showMarkers && markerData) {
      const markers = markerData.map((data) =>
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(data.lat, data.lng),
          map,
        })
      );

      return () => {
        markers.forEach((marker) => marker.setMap(null)); 
      };
    }
  }, [showMarkers, markerData]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapComponent;
