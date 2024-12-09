const MAP_VIEW_TEMPLATE_INFO = {
  center: [106.12218230229296, 11.368515844547606],
  zoom: 10,
  highlightOptions: {
    color: "rgb(123, 211, 234)",
  },
}

const POINT_TEMPLATE_STREET = {
  title: "{Name}",
  content: "Đường này là <b>{Name}</b>",
};


const POINT_TEMPLATE_TOWN = {
  title: "{Name}",
  content: "Thị xã <b>{Name}</b>, <b>{Location}</b>.",
};

const POINT_TEMPLATE_CITY = {
  title: "{Name}",
  content: "Thành phố này thuộc <b>{Location}</b>.",
};

const POINT_TEMPLATE_DISTRICT = {
  title: "{Name}",
  content: "Thị trấn <b>{Name}<b/>, {Location}</b> .",
};

const POINT_TEMPLATE_SCHOOL = {
  title: "{Name}",
  content: "Trường học này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_HOSPITAL = {
  title: "{Name}",
  content: "Bệnh viện này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_DEFAULT = {
  title: "{Name}",
  content: "Địa điểm này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_SHOP = {
  title: "{Name}",
  content: "Cửa hàng này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_TEMPLE = {
  title: "{Name}",
  content: "Chùa này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_DRINK = {
  title: "{Name}",
  content: "Quán nước này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_FOOD = {
  title: "{Name}",
  content: "Quán ăn này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_REAL_ESTATE = {
  title: "{Name}",
  content: "Bất động sản này ở <b>{Name} - {Location}</b>.",
};

const POINT_TEMPLATE_PARK = {
  title: "{Name}",
  content: "Công viên này ở <b>{Name} - {Location}</b>.",
};

const POINT_TEMPLATE_THEATER = {
  title: "{Name}",
  content: "Rạp phim này ở <b>{Name} - {Location}</b>.",
};

const POINT_TEMPLATE_LINE = {
  title: "{Name}",
  content: "Đường <b>{Name} - {Location}</b>.",
};

const POINT_TEMPLATE_HOTEL = {
  title: "{Name}",
  content: "Khách sạn này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_APARTMENT = {
  title: "{Name}",
  content: "Tòa nhà này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_COMPANY = {
  title: "{Name}",
  content: "Công ty này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_FACTORY = {
  title: "{Name}",
  content: "Nhà máy này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_SALON = {
  title: "{Name}",
  content: "Tiệm tóc này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_GARA = {
  title: "{Name}",
  content: "Gara này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_MARKET = {
  title: "{Name}",
  content: "Chợ/Siêu thị này ở <b>{Location}</b>. <br/> {categoryName}, {categories}",
};

const POINT_TEMPLATE_AREA = {
  title: "{name}",
  content: "Diện tích: <b>{area} km<sup>2</sup></b>.<br>" +
    "Dân số: <b>{population} người</b>.",
};

const DISTRICT_TEMPLATE_INFO = {
  type: "polygon",
  symbol: {
    type: "simple-fill",
    outline: {
      color: [255, 255, 255],
      width: 1,
    },
  },
  popupTemplate: POINT_TEMPLATE_AREA,
}

export {
  DISTRICT_TEMPLATE_INFO,
  MAP_VIEW_TEMPLATE_INFO,
  POINT_TEMPLATE_AREA,
  POINT_TEMPLATE_DISTRICT,
  POINT_TEMPLATE_LINE,
  POINT_TEMPLATE_CITY,
  POINT_TEMPLATE_TOWN,
  POINT_TEMPLATE_DEFAULT,
  POINT_TEMPLATE_DRINK,
  POINT_TEMPLATE_FOOD,
  POINT_TEMPLATE_HOSPITAL,
  POINT_TEMPLATE_HOTEL,
  POINT_TEMPLATE_TEMPLE,
  POINT_TEMPLATE_PARK,
  POINT_TEMPLATE_REAL_ESTATE,
  POINT_TEMPLATE_SCHOOL,
  POINT_TEMPLATE_SHOP,
  POINT_TEMPLATE_THEATER,
  POINT_TEMPLATE_APARTMENT,
  POINT_TEMPLATE_FACTORY,
  POINT_TEMPLATE_COMPANY,
  POINT_TEMPLATE_SALON,
  POINT_TEMPLATE_MARKET, 
  POINT_TEMPLATE_GARA
};