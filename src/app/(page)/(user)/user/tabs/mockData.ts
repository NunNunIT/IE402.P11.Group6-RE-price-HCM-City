import { PostCardProps, User } from '@/types/user';

const userMockData: User = 
  {
    _id: '1',
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3caehS0XRG1og31cR4GAIEpcPDhK37KQgSQ&s',
    phone: '123-456-7890',
    birthday: new Date('1990-01-01'),
    gender: 'Male',
    address: {
      province: 'Hanoi',
      district: 'Hoan Kiem',
      ward: 'Cua Dong',
      address: '123 Hoan Kiem Street',
    },
    notification: [],
    role: 'Admin',
  }


const mockPostData: PostCardProps[] = [
  {
    image: "https://via.placeholder.com/150",
    title: "Cho Thuê Nhà Riêng Tại Xã An Phú Tây, 3 Triệu VND, 30 M2 Hàng Độc Tại Giá Tốt",
    location: "Cho thuê nhà riêng - Bình Chánh, Hồ Chí Minh",
    postId: "41643051",
    postDate: "26/11/2024",
    expiryDate: "06/12/2024",
    status: "Chính chủ bán",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Cho Thuê Căn Hộ 2 Phòng Ngủ, 4 Triệu VND Tháng, 50 M2, Nội Thất Đầy Đủ",
    location: "Cho thuê căn hộ - Quận 7, Hồ Chí Minh",
    postId: "41643052",
    postDate: "28/11/2024",
    expiryDate: "08/12/2024",
    status: "Chính chủ bán",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Mua Nhà Mặt Tiền, Kinh Doanh Tốt, 5 Tỷ VND, 100 M2",
    location: "Bán nhà mặt tiền - Quận 1, Hồ Chí Minh",
    postId: "41643053",
    postDate: "01/12/2024",
    expiryDate: "11/12/2024",
    status: "Bán gấp",
  },
  {
    image: "https://via.placeholder.com/150",
    title: "Cho Thuê Văn Phòng Mới Xây, 10 Triệu VND, 80 M2, Mặt Tiền Đường Lớn",
    location: "Cho thuê văn phòng - Quận 3, Hồ Chí Minh",
    postId: "41643054",
    postDate: "05/12/2024",
    expiryDate: "15/12/2024",
    status: "Cho thuê",
  },
];
export{userMockData, mockPostData};
