/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["assets-netstorage.groww.in","groww.in","cdn-icons-png.flaticon.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/stocks",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
