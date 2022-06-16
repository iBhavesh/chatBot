/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "groww.in"],
  },
  redirects(){
    return [
      {
        source: "/",
        destination: "/categories",
        permanent: true,
      },
    ]
  }
};

module.exports = nextConfig;
