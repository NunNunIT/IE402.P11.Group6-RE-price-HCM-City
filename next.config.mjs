import NextBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@arcgis/core'],
  experimental: {
    instrumentationHook: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: '**', // Allow any hostname
    },
    {
      protocol: "https", // Giao thức sử dụng (ở đây là HTTPS)
      hostname: "file4.batdongsan.com.vn", // Thêm hostname của Unsplash
      port: "", // Không cần chỉ định cổng
      pathname: "/**", // Đường dẫn cụ thể của hình ảnh (ở đây là tất cả các đường dẫn)
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

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})


export default withBundleAnalyzer(nextConfig);