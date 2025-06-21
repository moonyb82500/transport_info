import React, { useEffect } from "react";
import supercluster from "supercluster";

function Test3() {
  useEffect(() => {
    const loadScripts = async () => {
      try {
        const loadScript = (src) => {
          return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
              resolve(); // 이미 로드된 경우
              return;
            }
            const script = document.createElement("script");
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = (error) => reject(`Failed to load script: ${src}`);
            document.head.appendChild(script);
          });
        };

        // 네이버 지도 API 로드
        await loadScript(
          `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=on1ramd4k9`
        );
        console.log("네이버 지도 API 로드 완료");

        initializeMap();
      } catch (error) {
        console.error("스크립트 로드 중 오류 발생:", error);
      }
    };

    const initializeMap = () => {
      if (!window.naver || !window.naver.maps) {
        console.error("네이버 지도 API가 제대로 로드되지 않았습니다.");
        return;
      }

      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(36.5, 127.5),
        zoom: 7,
      });

      // 마커 데이터
      const markerData = [
        { id: 1, lat: 37.5665, lng: 126.9780 },
        { id: 2, lat: 37.5705, lng: 126.9820 },
        { id: 3, lat: 37.5645, lng: 126.9760 },
        { id: 4, lat: 37.5500, lng: 126.9900 },
        { id: 5, lat: 37.5610, lng: 127.0300 },
        { id: 6, lat: 37.5800, lng: 126.9200 },
        { id: 7, lat: 37.6000, lng: 126.9200 },
        { id: 8, lat: 37.6100, lng: 127.0500 },
        { id: 9, lat: 37.5200, lng: 126.9000 },
        { id: 10, lat: 37.5300, lng: 127.0200 },
      ];

      // Supercluster 초기화
      const cluster = new supercluster({
        radius: 60, // 클러스터링 반경
        maxZoom: 16,
      });

      cluster.load(
        markerData.map((point) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.lng, point.lat],
          },
          properties: { id: point.id },
        }))
      );

      const updateClusters = () => {
        const bounds = map.getBounds();
        const zoom = map.getZoom();

        const clusters = cluster.getClusters(
          [
            bounds.getSW().lng(),
            bounds.getSW().lat(),
            bounds.getNE().lng(),
            bounds.getNE().lat(),
          ],
          Math.round(zoom)
        );

        clusters.forEach((c) => {
          if (c.properties.cluster) {
            // 클러스터 마커
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                c.geometry.coordinates[1],
                c.geometry.coordinates[0]
              ),
              map,
              icon: {
                content: `<div style="background: red; color: white; padding: 5px; border-radius: 50%;">${c.properties.point_count}</div>`,
              },
            });
          } else {
            // 개별 마커
            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(
                c.geometry.coordinates[1],
                c.geometry.coordinates[0]
              ),
              map,
            });
          }
        });
      };

      updateClusters();

      window.naver.maps.Event.addListener(map, "zoom_changed", updateClusters);
      window.naver.maps.Event.addListener(map, "dragend", updateClusters);
    };

    loadScripts();
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}

export default Test3;
