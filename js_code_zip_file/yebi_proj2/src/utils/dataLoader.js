
export const loadData = async () => {
    const files = [
      'bs.json', 'dg.json', 'dj.json', 'gyeonggi.json', 'gj.json', 
      'ic.json', 'se.json', 'sj.json', 'us.json', 'gb.json', 'jn.json', 
      'jb.json', 'chungchongnamdo.json', 'jj.json', 'gn.json', 'cb.json', 'gw.json'
    ];
    const data = {};
  
    for (let file of files) {
      const response = await fetch(`${process.env.PUBLIC_URL}/${file}`);
      if (!response.ok) {
        console.error(`Failed to fetch ${file}: ${response.statusText}`);
        continue;
      }
      data[file] = await response.json();
    }
  
    return data;
  };
  