export default function TranslateKey(key: string): string {
  const dictionary: { [key: string]: string } = {
    land: "Đất",
    house: "Nhà",
    car: "Xe",
    tree: "Cây",
    legal: "Pháp lý",
    sodo: "Sổ đổ/ Sổ hồng",
    hopdong: "Hợp đồng mua bán",
    dangchoso: "Đang chờ sổ",
    khac: "Khác",
    bed: "Phòng ngủ",
    bath: "Phòng vệ sinh",
    direction: "Hướng",
    nam: "Nam",
    bac: "Bắc",
    tay: "Tây",
    dong: "Đông",
    taybac: "Tây Bắc",
    dongbac: "Đông Bắc",
    taynam: "Tây Nam",
    dongnam: "Đông Nam"
  };

  return dictionary[key] || "Không tìm thấy giá trị tương ứng";
}
