// Hàm tính khoảng cách Haversine
function Haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371.0; // Bán kính Trái Đất tính bằng km
  
    // Chuyển đổi độ sang radian
    const toRadians = (degree: any) => degree * (Math.PI / 180);
  
    const lat1_rad = toRadians(lat1);
    const lon1_rad = toRadians(lon1);
    const lat2_rad = toRadians(lat2);
    const lon2_rad = toRadians(lon2);
  
    // Hiệu của các vĩ độ và kinh độ
    const delta_lat = lat2_rad - lat1_rad;
    const delta_lon = lon2_rad - lon1_rad;
  
    // Công thức Haversine
    const a =
      Math.sin(delta_lat / 2) ** 2 +
      Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(delta_lon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Khoảng cách
    const distance = R * c;
  
    return distance.toFixed(0);
  }

  export default Haversine;