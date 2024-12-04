/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allow any hostname
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "encrypted-tbn0.gstatic.com", // Thêm hostname của Unsplash
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "photo.rever.vn", // Thêm hostname của Unsplash
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "photo.rever.vn", // Thêm hostname của Unsplash
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
      {
        protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
        hostname: "kenhhomestay.com", // Thêm hostname của Unsplash
        port: "", // Không cần chỉ định cổng
        pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
      },
    ]
  }
};

export default nextConfig;