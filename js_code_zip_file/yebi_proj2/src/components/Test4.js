import React, { useEffect } from 'react';
import $ from 'jquery';

const CombinedMapComponent = () => {
  useEffect(() => {
    if (!window.naver) {
      console.error("Naver Maps API가 로드되지 않았습니다.");
      return;
    }

    // 지도 초기 설정
    const mapOptions = {
      center: new window.naver.maps.LatLng(36.5, 127.5), // 대한민국 중심
      zoom: 7,
      mapTypeId: 'normal',
    };

    const map = new window.naver.maps.Map('map', mapOptions);

    // 인구 밀도 데이터
    const populationData = {};
    const dataFiles = [
      'bs.json', 'dg.json', 'dj.json', 'gyeonggi.json', 'gj.json',
      'ic.json', 'se.json', 'sj.json', 'us.json', 'gb.json', 'jn.json',
      'jb.json', 'chungchongnamdo.json', 'jj.json', 'gn.json', 'cb.json', 'gw.json'
    ];

    // 인구 밀도 데이터 불러오기
    dataFiles.forEach((fileName) => {
      $.getJSON(`${process.env.PUBLIC_URL}/${fileName}`, (data) => {
        data.forEach((entry) => {
          populationData[entry.SIG_KOR_NM] = entry.SIG_KOR_PD;
        });
      });
    });

    // 밀도 색상 함수
    function getDensityColor(density) {
      return density > 20000 ? '#C72316' :
             density > 10000 ? '#CF3B21' :
             density > 5000 ? '#D7582D' :
             density > 2000 ? '#E1773C' :
             density > 250 ? '#EA974B' :
             density > 100 ? '#F3B75B' :
             density > 50 ? '#FDD76A' : '#FDD76A';
    }

    // GeoJSON 데이터 로드 및 스타일 적용
    $.getJSON(`${process.env.PUBLIC_URL}/dksrn.json`, (data) => {
      const infoWindow = new window.naver.maps.InfoWindow({ anchorSkew: true });

      map.data.setStyle((feature) => {
        const regionName = feature.getProperty('SIG_KOR_NM');
        const density = populationData[regionName] || 0;
        return {
          fillColor: getDensityColor(density),
          fillOpacity: 0.45,
          strokeColor: '#000000',
          strokeWeight: 1,
          strokeOpacity: 0.3,
        };
      });

      map.data.addGeoJson(data);

      // 지역 클릭 이벤트 처리
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

    
    const sampleData = [
      {lat: 37.17406005, lng: 127.3087907, cluster: 3},
      {lat: 35.97456775, lng: 127.1193703, cluster: 5},
      {lat: 37.0044509, lng: 127.4980243, cluster: 3},
      {lat: 35.1307005, lng: 126.7518464, cluster: 2},
      {lat: 36.36710653, lng: 127.400822, cluster: 5},
      {lat: 37.16185826, lng: 127.3818686, cluster: 3},
      {lat: 36.76747314, lng: 127.3233733, cluster: 5},
      {lat: 37.59900675, lng: 126.7841061, cluster: 0},
      {lat: 35.31362026, lng: 129.0178197, cluster: 4},
      {lat: 35.946651, lng: 128.850721, cluster: 1},
      {lat: 36.52892982, lng: 127.5194363, cluster: 5},
      {lat: 36.56651072, lng: 127.4112778, cluster: 5},
      {lat: 36.9777354, lng: 126.6878399, cluster: 0},
      {lat: 37.1782434, lng: 127.5006521, cluster: 3},
      {lat: 35.1475741, lng: 128.869692, cluster: 4},
      {lat: 36.3885841, lng: 128.2610529, cluster: 1},
      {lat: 36.2201937, lng: 127.43891, cluster: 5},
      {lat: 35.8642763, lng: 128.8397749, cluster: 1},
      {lat: 37.3032339, lng: 127.663223, cluster: 3},
      {lat: 36.2929778, lng: 127.6202489, cluster: 5},
      {lat: 37.4505909, lng: 126.6248128, cluster: 0},
      {lat: 37.7872694, lng: 127.0720075, cluster: 0},
      {lat: 35.8752912, lng: 128.4000654, cluster: 1},
      {lat: 35.310506, lng: 128.943127, cluster: 4},
      {lat: 35.1189268, lng: 129.0433888, cluster: 4},
      {lat: 35.085074, lng: 128.9610348, cluster: 4},
      {lat: 35.1475741, lng: 128.869692, cluster: 4},
      {lat: 35.0839604, lng: 128.9606929, cluster: 4},
      {lat: 37.4505909, lng: 126.6248128, cluster: 0},
      {lat: 35.1143892, lng: 126.872701, cluster: 2},
      {lat: 37.4139947, lng: 127.3083725, cluster: 3},
      {lat: 36.449416, lng: 127.4070349, cluster: 5},
      {lat: 36.3862082, lng: 127.4293631, cluster: 5},
      {lat: 36.6968522, lng: 127.2116673, cluster: 5},
      {lat: 35.9943317, lng: 129.3751032, cluster: 1},
      {lat: 35.9965116, lng: 129.3745936, cluster: 1},
      {lat: 33.4919654, lng: 126.4228634, cluster: 2},
      {lat: 35.2476563, lng: 126.8739615, cluster: 2},
      {lat: 35.5064388, lng: 129.3854182, cluster: 4},
      {lat: 35.571133, lng: 129.3684825, cluster: 4},
      {lat: 35.5158165, lng: 129.3472443, cluster: 4},
      {lat: 35.5773994, lng: 129.3540099, cluster: 4},
      {lat: 37.4505909, lng: 126.6248128, cluster: 0},
      {lat: 37.5037423, lng: 126.668249, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.5056481, lng: 126.6399035, cluster: 0},
      {lat: 37.3215632, lng: 127.4964683, cluster: 3},
      {lat: 37.1488437, lng: 127.3896973, cluster: 3},
      {lat: 36.873827, lng: 127.1098258, cluster: 3},
      {lat: 37.0593003, lng: 127.4085248, cluster: 3},
      {lat: 37.3494055, lng: 126.9507289, cluster: 0},
      {lat: 37.318276, lng: 127.83707, cluster: 3},
      {lat: 37.1460296, lng: 127.160188, cluster: 3},
      {lat: 37.5056481, lng: 126.6399035, cluster: 0},
      {lat: 37.2282845, lng: 127.4238184, cluster: 3},
      {lat: 37.5660103, lng: 126.6030375, cluster: 0},
      {lat: 37.5914653, lng: 126.7974734, cluster: 0},
      {lat: 37.5906051, lng: 126.7938308, cluster: 0},
      {lat: 37.1439005, lng: 127.5925181, cluster: 3},
      {lat: 37.2367185, lng: 127.4118461, cluster: 3},
      {lat: 37.1135159, lng: 128.2219956, cluster: 3},
      {lat: 37.3995039, lng: 127.2011777, cluster: 3},
      {lat: 36.6369615, lng: 128.7008858, cluster: 1},
      {lat: 37.528943, lng: 126.7745247, cluster: 0},
      {lat: 37.7125593, lng: 126.8808139, cluster: 0},
      {lat: 37.2024843, lng: 127.5474683, cluster: 3},
      {lat: 37.2323182, lng: 127.3638624, cluster: 3},
      {lat: 37.5914653, lng: 126.7974734, cluster: 0},
      {lat: 35.3549223, lng: 128.6346919, cluster: 4},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.1981073, lng: 126.987072, cluster: 0},
      {lat: 36.4888476, lng: 128.1685874, cluster: 1},
      {lat: 37.262011, lng: 127.3855957, cluster: 3},
      {lat: 37.1460296, lng: 127.160188, cluster: 3},
      {lat: 37.0947136, lng: 127.2126301, cluster: 3},
      {lat: 37.5914074, lng: 126.7950107, cluster: 0},
      {lat: 37.7254033, lng: 128.8359288, cluster: 3},
      {lat: 36.7529972, lng: 126.4956023, cluster: 0},
      {lat: 37.3711353, lng: 127.6007664, cluster: 3},
      {lat: 36.9279989, lng: 127.4558094, cluster: 3},
      {lat: 37.723958, lng: 126.5872118, cluster: 0},
      {lat: 36.2937098, lng: 127.6210872, cluster: 5},
      {lat: 37.151469, lng: 127.0507657, cluster: 3},
      {lat: 35.2914372, lng: 129.1110255, cluster: 4},
      {lat: 37.4453524, lng: 126.6240793, cluster: 0},
      {lat: 36.5275969, lng: 127.1298244, cluster: 5},
      {lat: 37.6824535, lng: 127.1924206, cluster: 0},
      {lat: 37.6660379, lng: 126.9109039, cluster: 0},
      {lat: 36.5287494, lng: 127.3997345, cluster: 5},
      {lat: 37.6660379, lng: 126.9109039, cluster: 0},
      {lat: 37.6660379, lng: 126.9109039, cluster: 0},
      {lat: 37.1731037, lng: 127.5660544, cluster: 3},
      {lat: 35.1481352, lng: 128.8696642, cluster: 4},
      {lat: 37.88957, lng: 127.7478909, cluster: 3},
      {lat: 37.7190641, lng: 127.1840593, cluster: 0},
      {lat: 37.5641282, lng: 126.6047469, cluster: 0},
      {lat: 35.1639201, lng: 128.5779525, cluster: 4},
      {lat: 35.3325318, lng: 129.2499062, cluster: 4},
      {lat: 37.2386357, lng: 127.2968622, cluster: 3},
      {lat: 35.1444463, lng: 128.8695583, cluster: 4},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.8775085, lng: 127.2056068, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.709774, lng: 126.8914048, cluster: 0},
      {lat: 35.9595656, lng: 127.1308319, cluster: 5},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 35.0316678, lng: 127.4409254, cluster: 2},
      {lat: 37.3435, lng: 127.6415705, cluster: 3},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.8969855, lng: 127.0327032, cluster: 0},
      {lat: 37.1440677, lng: 127.1543094, cluster: 3},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.62497, lng: 127.3014373, cluster: 3},
      {lat: 37.719851, lng: 126.7789408, cluster: 0},
      {lat: 36.0932615, lng: 128.3826897, cluster: 1},
      {lat: 37.7799391, lng: 126.7940529, cluster: 0},
      {lat: 37.7445412, lng: 127.212073, cluster: 0},
      {lat: 36.7340387, lng: 127.1679487, cluster: 5},
      {lat: 37.2395154, lng: 127.3136012, cluster: 3},
      {lat: 37.2147149, lng: 126.8571279, cluster: 0},
      {lat: 35.2930684, lng: 129.0102554, cluster: 4},
      {lat: 37.1581556, lng: 127.4413617, cluster: 3},
      {lat: 36.9948516, lng: 126.9370857, cluster: 0},
      {lat: 37.681521, lng: 127.189998, cluster: 0},
      {lat: 37.2086361, lng: 127.0943849, cluster: 3},
      {lat: 37.1880463, lng: 126.7577271, cluster: 0},
      {lat: 37.2167254, lng: 126.782068, cluster: 0},
      {lat: 37.2482776, lng: 127.4162604, cluster: 3},
      {lat: 37.598967, lng: 126.7842656, cluster: 0},
      {lat: 37.2285269, lng: 127.4249618, cluster: 3},
      {lat: 35.8750462, lng: 128.54113, cluster: 1},
      {lat: 37.4134587, lng: 127.3080734, cluster: 3},
      {lat: 37.4050004, lng: 127.2257922, cluster: 3},
      {lat: 37.5304381, lng: 126.7735047, cluster: 0},
      {lat: 37.3601837, lng: 127.8958947, cluster: 3},
      {lat: 36.0887875, lng: 129.351933, cluster: 1},
      {lat: 37.6378533, lng: 126.7785908, cluster: 0},
      {lat: 37.6942529, lng: 127.20585, cluster: 0},
      {lat: 35.2930684, lng: 129.0102554, cluster: 4},
      {lat: 37.2443127, lng: 127.3608242, cluster: 3},
      {lat: 37.180695, lng: 127.3750642, cluster: 3},
      {lat: 37.7847972, lng: 128.8688249, cluster: 3},
      {lat: 37.1488437, lng: 127.3896973, cluster: 3},
      {lat: 37.0359498, lng: 127.2230845, cluster: 3},
      {lat: 37.0866069, lng: 127.2173607, cluster: 3},
      {lat: 37.2301617, lng: 127.2951706, cluster: 3},
      {lat: 35.3147466, lng: 128.3787383, cluster: 4},
      {lat: 37.1703977, lng: 127.1318428, cluster: 3},
      {lat: 37.4141767, lng: 127.3131277, cluster: 3},
      {lat: 37.2059428, lng: 127.3919571, cluster: 3},
      {lat: 35.9431613, lng: 128.8220099, cluster: 1},
      {lat: 36.2521777, lng: 127.6237662, cluster: 5},
      {lat: 37.1809995, lng: 127.3389349, cluster: 3},
      {lat: 37.1428898, lng: 127.3975847, cluster: 3},
      {lat: 36.1012981, lng: 128.3838694, cluster: 1},
      {lat: 37.1401341, lng: 127.412709, cluster: 3},
      {lat: 37.598193, lng: 126.7811989, cluster: 0},
      {lat: 36.8900424, lng: 126.9198684, cluster: 0},
      {lat: 37.2308874, lng: 127.3679472, cluster: 3},
      {lat: 37.3129508, lng: 127.3416745, cluster: 3},
      {lat: 37.2249566, lng: 127.4903655, cluster: 3},
      {lat: 35.2930684, lng: 129.0102554, cluster: 4},
      {lat: 37.3297283, lng: 126.9354636, cluster: 0},
      {lat: 37.455531, lng: 126.6078533, cluster: 0},
      {lat: 36.527306, lng: 127.4044497, cluster: 5},
      {lat: 35.997275, lng: 129.3654844, cluster: 1},
      {lat: 34.9232782, lng: 128.0883467, cluster: 4},
      {lat: 35.1578185, lng: 128.3165713, cluster: 4},
      {lat: 35.3011111, lng: 129.0127307, cluster: 4},
      {lat: 35.2930684, lng: 129.0102554, cluster: 4},
      {lat: 35.3159082, lng: 126.7583858, cluster: 2},
      {lat: 35.3159082, lng: 126.7583858, cluster: 2},
      {lat: 36.1103, lng: 128.3615631, cluster: 1},
      {lat: 35.2930684, lng: 129.0102554, cluster: 4},
      {lat: 37.6949674, lng: 126.849573, cluster: 0},
      {lat: 35.8245566, lng: 127.0883907, cluster: 5},
      {lat: 37.4871267, lng: 126.6148932, cluster: 0},
      {lat: 35.1300457, lng: 128.6977214, cluster: 4},
      {lat: 36.2595184, lng: 127.2770129, cluster: 5},
      {lat: 34.9430625, lng: 127.7618767, cluster: 2},
      {lat: 37.4771445, lng: 126.4810851, cluster: 0},
      {lat: 37.184178, lng: 127.3263995, cluster: 3},
      {lat: 37.1407305, lng: 127.41384, cluster: 3},
      {lat: 37.2498223, lng: 127.0972946, cluster: 3},
      {lat: 37.1827802, lng: 127.3276208, cluster: 3},
      {lat: 37.3345025, lng: 126.7143013, cluster: 0},
      {lat: 37.831864, lng: 127.0491299, cluster: 0},
      {lat: 35.8476266, lng: 128.7662355, cluster: 1},
      {lat: 35.8753054, lng: 128.6946198, cluster: 1},
      {lat: 37.331912, lng: 126.9306081, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 37.7183399, lng: 127.3169545, cluster: 3},
      {lat: 37.6733704, lng: 127.2030643, cluster: 0},
      {lat: 37.2202126, lng: 127.1050411, cluster: 3},
      {lat: 37.402922, lng: 127.2393909, cluster: 3},
      {lat: 37.2672426, lng: 127.0680109, cluster: 0},
      {lat: 37.4054185, lng: 127.2178645, cluster: 3},
      {lat: 37.4818717, lng: 126.8787739, cluster: 0},
      {lat: 37.2672426, lng: 127.0680109, cluster: 0},
      {lat: 37.2149618, lng: 127.3769377, cluster: 3},
      {lat: 35.8363539, lng: 128.5082023, cluster: 1},
      {lat: 37.2367888, lng: 127.5709059, cluster: 3},
      {lat: 35.2113178, lng: 128.5972012, cluster: 4},
      {lat: 35.128269, lng: 128.7123709, cluster: 4},
      {lat: 36.0440556, lng: 128.520588, cluster: 1},
      {lat: 36.5328077, lng: 127.4275332, cluster: 5},
      {lat: 36.5326857, lng: 127.4122029, cluster: 5},
      {lat: 35.9687217, lng: 126.6189045, cluster: 5},
      {lat: 37.3402374, lng: 127.939405, cluster: 3},
      {lat: 36.5424903, lng: 127.3584883, cluster: 5},
      {lat: 37.3949528, lng: 127.9268566, cluster: 3},
      {lat: 37.343288, lng: 127.8826568, cluster: 3},
      {lat: 37.20044595, lng: 127.5454016, cluster: 3},
      {lat: 37.51285125, lng: 126.6318789, cluster: 0},
      {lat: 37.29501, lng: 127.52758, cluster: 3},
      {lat: 33.51094072, lng: 126.6854721, cluster: 2},
      {lat: 36.13716038, lng: 128.4125218, cluster: 1},
      {lat: 35.20721885, lng: 126.7831923, cluster: 2},
      {lat: 37.57058562, lng: 126.6743708, cluster: 0},
      {lat: 37.50673275, lng: 126.641682, cluster: 0},
      {lat: 36.89907, lng: 127.21357, cluster: 3},
      {lat: 37.29156157, lng: 127.5000205, cluster: 3},
      {lat: 37.1400386, lng: 127.5016853, cluster: 3},
      {lat: 37.19167, lng: 127.55771, cluster: 3},
      {lat: 37.24841, lng: 127.41631, cluster: 3},
      {lat: 36.98176, lng: 127.51693, cluster: 3},
      {lat: 37.19333, lng: 127.32688, cluster: 3},
      {lat: 37.08714, lng: 127.10072, cluster: 3},
      {lat: 37.50973087, lng: 126.4976742, cluster: 0},
      {lat: 37.22954, lng: 127.4339, cluster: 3},
      {lat: 37.0640457, lng: 127.3716448, cluster: 3},
      {lat: 37.33193395, lng: 127.4830199, cluster: 3},
      {lat: 35.47165, lng: 128.7465, cluster: 4},
      {lat: 37.21571253, lng: 127.4950738, cluster: 3},
      {lat: 37.18949, lng: 127.55695, cluster: 3},
      {lat: 37.50836475, lng: 126.6378169, cluster: 0},
      {lat: 35.26301, lng: 126.73539, cluster: 2},
      {lat: 37.24522515, lng: 127.3920284, cluster: 3},
      {lat: 36.02252, lng: 128.42381, cluster: 1},
      {lat: 37.29894, lng: 126.75758, cluster: 0},
      {lat: 35.35318, lng: 128.63603, cluster: 4},
      {lat: 37.52979, lng: 126.77564, cluster: 0},
      {lat: 36.64802103, lng: 127.4230335, cluster: 5},
      {lat: 37.1231205, lng: 127.0656976, cluster: 3},
      {lat: 36.84549697, lng: 127.5187973, cluster: 3},
      {lat: 36.30872, lng: 127.58535, cluster: 5},
      {lat: 37.72791, lng: 128.84996, cluster: 3},
      {lat: 36.81506, lng: 126.98272, cluster: 5},
      {lat: 34.83592065, lng: 126.4655635, cluster: 2},
      {lat: 37.4032625, lng: 126.7162528, cluster: 0},
      {lat: 35.36550136, lng: 129.0445203, cluster: 4},
      {lat: 34.89962, lng: 127.54756, cluster: 2},
      {lat: 35.20758, lng: 128.82891, cluster: 4},
      {lat: 35.09798, lng: 128.04862, cluster: 4},
      {lat: 37.32966425, lng: 126.9335648, cluster: 0},
      {lat: 35.97358339, lng: 127.1174262, cluster: 5},
      {lat: 35.9369, lng: 129.25116, cluster: 1},
      {lat: 37.4775871, lng: 126.4760856, cluster: 0},
      {lat: 37.32966425, lng: 126.9335648, cluster: 0},
      {lat: 37.65734, lng: 127.3381, cluster: 3},
      {lat: 37.12278, lng: 127.07059, cluster: 3},
      {lat: 35.79113, lng: 128.46749, cluster: 1},
      {lat: 37.76921, lng: 126.79418, cluster: 0},
      {lat: 37.31631189, lng: 127.8391193, cluster: 3},
      {lat: 35.12484689, lng: 129.0743079, cluster: 4},
      {lat: 35.33123853, lng: 129.2503951, cluster: 4},
      {lat: 35.86694595, lng: 128.84064, cluster: 1},
      {lat: 37.37735165, lng: 126.8712912, cluster: 0},
      {lat: 35.14829091, lng: 128.8702754, cluster: 4},
      {lat: 35.16506354, lng: 126.8017562, cluster: 2},
      {lat: 35.19771705, lng: 126.7862755, cluster: 2},
      {lat: 35.15437229, lng: 126.7882054, cluster: 2},
      {lat: 35.1974973, lng: 126.7965799, cluster: 2},
      {lat: 35.19948338, lng: 126.8825576, cluster: 2},
      {lat: 35.19519686, lng: 126.7886524, cluster: 2},
      {lat: 36.4478684, lng: 127.403787, cluster: 5},
      {lat: 36.36710653, lng: 127.400822, cluster: 5},
      {lat: 33.487032, lng: 126.6379809, cluster: 2},
      {lat: 37.44505753, lng: 126.6273333, cluster: 0},
      {lat: 37.56581723, lng: 126.6041478, cluster: 0},
      {lat: 36.8314344, lng: 126.9690593, cluster: 5},
      {lat: 37.1588582, lng: 127.0831324, cluster: 3},
      {lat: 37.24027615, lng: 127.4290815, cluster: 3},
      {lat: 36.52790387, lng: 127.372074, cluster: 5},
      {lat: 35.37002201, lng: 129.0552321, cluster: 4},
      {lat: 36.73175441, lng: 127.2332933, cluster: 5},
      {lat: 37.08921284, lng: 127.0989303, cluster: 3},
      {lat: 37.29077849, lng: 127.5338421, cluster: 3},
      {lat: 37.23548938, lng: 127.4234883, cluster: 3},
      {lat: 37.30468546, lng: 127.5326245, cluster: 3},
      {lat: 35.72768047, lng: 126.9920731, cluster: 5},
      {lat: 37.29077849, lng: 127.5338421, cluster: 3},
      {lat: 37.1773429, lng: 127.5012909, cluster: 3},
      {lat: 37.19786128, lng: 127.5730715, cluster: 3},
      {lat: 36.79236119, lng: 127.5305204, cluster: 3},
      {lat: 35.3571667, lng: 129.0338471, cluster: 4},
      {lat: 37.2892804, lng: 127.5332717, cluster: 3},
      {lat: 37.19271393, lng: 127.3258295, cluster: 3},
      {lat: 37.16234041, lng: 127.0835893, cluster: 3},
      {lat: 37.33092825, lng: 126.9554235, cluster: 0},
      {lat: 37.14855233, lng: 127.3910964, cluster: 3},
      {lat: 37.82934742, lng: 126.9755047, cluster: 0},
      {lat: 37.12733771, lng: 127.0670519, cluster: 3},
      {lat: 37.0911133, lng: 127.0631693, cluster: 3},
      {lat: 37.03432601, lng: 127.0804119, cluster: 3},
      {lat: 37.53655129, lng: 126.8929258, cluster: 0},
      {lat: 35.3716183, lng: 129.0546261, cluster: 4},
      {lat: 36.90053, lng: 127.5092907, cluster: 3},
      {lat: 35.27948799, lng: 126.7279154, cluster: 2},
      {lat: 37.28036994, lng: 127.3851042, cluster: 3},
      {lat: 35.56517545, lng: 129.3675621, cluster: 4},
      {lat: 37.29855588, lng: 126.8152092, cluster: 0},
      {lat: 37.31422454, lng: 126.7821256, cluster: 0},
      {lat: 35.2276987, lng: 128.919861, cluster: 4},
      {lat: 35.20278624, lng: 128.8508622, cluster: 4},
      {lat: 37.4768651, lng: 126.8844249, cluster: 0},
      {lat: 37.51358099, lng: 127.0996394, cluster: 0},
      {lat: 37.2892804, lng: 127.5332717, cluster: 3},
      {lat: 37.4392735, lng: 127.978618, cluster: 3},
      {lat: 37.25535289, lng: 127.1023667, cluster: 3},
      {lat: 37.15924239, lng: 127.3144535, cluster: 3},
      {lat: 37.31644148, lng: 127.1248778, cluster: 3},
      {lat: 35.93383983, lng: 128.4637605, cluster: 1},
      {lat: 37.28649336, lng: 127.4019912, cluster: 3},
      {lat: 37.21571253, lng: 127.4950738, cluster: 3},
      {lat: 37.24522515, lng: 127.3920284, cluster: 3},
      {lat: 37.48757744, lng: 126.8744085, cluster: 0},
      {lat: 36.49610005, lng: 127.3950727, cluster: 5},
      {lat: 36.92421234, lng: 127.1886766, cluster: 3},
      {lat: 37.43714954, lng: 127.1691594, cluster: 3},
      {lat: 37.14387813, lng: 127.437226, cluster: 3},
      {lat: 37.72915302, lng: 126.7984298, cluster: 0},
      {lat: 37.59626095, lng: 126.7812425, cluster: 0},
      {lat: 35.9251408, lng: 128.6403033, cluster: 1},
      {lat: 35.31362026, lng: 129.0178197, cluster: 4},
      {lat: 35.95535579, lng: 127.1295445, cluster: 5},
      {lat: 37.15744985, lng: 127.092327, cluster: 3},
      {lat: 37.4775871, lng: 126.4760856, cluster: 0},
      {lat: 37.44635342, lng: 126.6228662, cluster: 0},
      {lat: 37.3115743, lng: 127.0773859, cluster: 0},
      {lat: 36.1146363, lng: 128.3546753, cluster: 1},
      {lat: 37.07188755, lng: 127.4143329, cluster: 3},
      {lat: 37.32966425, lng: 126.9335648, cluster: 0},
      {lat: 35.87471204, lng: 128.742311, cluster: 1},
      {lat: 37.35204095, lng: 126.9621563, cluster: 0},
      {lat: 37.7052312, lng: 127.1819198, cluster: 0},
      {lat: 36.89455528, lng: 127.1868962, cluster: 3},
      {lat: 36.8886248, lng: 127.2050042, cluster: 3},
      {lat: 37.3705265, lng: 127.2324613, cluster: 3},
      {lat: 37.25426013, lng: 127.3607841, cluster: 3},
      {lat: 35.23449314, lng: 128.6366804, cluster: 4},
      {lat: 36.5289654, lng: 127.4292044, cluster: 5},
      {lat: 37.5017131, lng: 126.6196592, cluster: 0},
      {lat: 37.3309195, lng: 126.9371945, cluster: 0},
      {lat: 35.9593605, lng: 126.6616173, cluster: 5},
      {lat: 36.7350302, lng: 126.487375, cluster: 0},
      {lat: 35.1138693, lng: 128.105683, cluster: 4},
      {lat: 34.9960015, lng: 126.7551006, cluster: 2},
      {lat: 37.1836507, lng: 127.4931826, cluster: 3},
      {lat: 35.1398396, lng: 128.971726, cluster: 4},
      {lat: 35.1094576, lng: 129.0794875, cluster: 4},
      {lat: 35.1993977, lng: 126.8011065, cluster: 2},
      {lat: 35.5088777, lng: 129.3324257, cluster: 4},
      {lat: 36.3176625, lng: 127.3213713, cluster: 5},
      {lat: 36.3711833, lng: 127.4050933, cluster: 5},
      {lat: 33.5235192, lng: 126.5501442, cluster: 2},
      {lat: 37.4877799, lng: 126.4725366, cluster: 0},
      {lat: 37.2645279, lng: 127.5181214, cluster: 3},
      {lat: 36.5424903, lng: 127.3584883, cluster: 5},
      {lat: 37.4746178, lng: 127.1260071, cluster: 0},
      {lat: 36.0048625, lng: 129.3706607, cluster: 1},
      {lat: 37.5477372, lng: 126.8151868, cluster: 0},
      {lat: 37.4750222, lng: 126.880646, cluster: 0},
      {lat: 37.4912122, lng: 126.8289475, cluster: 0},
      {lat: 35.7947743, lng: 128.6284203, cluster: 1},
      {lat: 34.7917661, lng: 127.6456695, cluster: 2},
      {lat: 34.9054208, lng: 127.5463294, cluster: 2},
      {lat: 36.67517, lng: 127.4663537, cluster: 5},
      {lat: 37.6385119, lng: 127.1412035, cluster: 0},
      {lat: 35.3011111, lng: 129.0127307, cluster: 4},
      {lat: 37.6582525, lng: 126.8255728, cluster: 0},
      {lat: 37.5231898, lng: 126.7261397, cluster: 0},
      {lat: 35.8617223, lng: 127.0593976, cluster: 5},
      {lat: 37.4582933, lng: 126.6351799, cluster: 0},
      {lat: 37.150627, lng: 127.3859081, cluster: 3},
      {lat: 37.8495804, lng: 127.0471467, cluster: 0},
      {lat: 37.3211995, lng: 126.7355285, cluster: 0},
      {lat: 37.0310489, lng: 127.0739175, cluster: 3},
      {lat: 35.8435018, lng: 128.4865574, cluster: 1},
      {lat: 35.224825, lng: 128.644663, cluster: 4},
      {lat: 37.9573265, lng: 127.6927847, cluster: 3}
    ];

    // 클러스터 색상
    const clusterColors = ['#070bf0', '#9b30b6', '#0871c8', '#ebd705', '#ff0000', '#008000'];

    // 클러스터 원 추가
    sampleData.forEach((data) => {
      const { lat, lng, cluster } = data;
      const color = clusterColors[cluster % clusterColors.length];

      new window.naver.maps.Circle({
        map: map,
        center: new window.naver.maps.LatLng(lat, lng),
        radius: 5000,
        fillColor: color,
        fillOpacity: 100,
        strokeColor: '#000000',
        strokeOpacity: 1,
        strokeWeight: 2,
      });
    });
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default CombinedMapComponent;
