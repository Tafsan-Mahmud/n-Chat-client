import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http', // If you're using http for googleusercontent
        hostname: 'googleusercontent.com',
        port: '',
        pathname: '**',
      },
       ],
  },
};

export default nextConfig;
