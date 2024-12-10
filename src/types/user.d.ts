export type Address = {
    province: string;
    district: string;
    ward: string;
    address: string;
  };
  
  export type Notification = {
    content: string;
    title: string;
    link: string;
    date: string;
    isSeen: boolean;
  };
  
  export type User = {
    _id: string;
    username: string;
    email: string;
    avt: string;
    phone: string;
    birthday: Date;
    gender: 'Male' | 'Female' | 'Unknown';
    address: Address;
    notification: Notification[];
    role: 'Admin' | 'Staff' | 'User';
  };
  
  export type PostCardProps ={
    image: string;
    title: string;
    location: string;
    postId: string;
    postDate: string;
    expiryDate: string;
    status: string;
  }
  