/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "dreambuilders.dk",
            port: "",
            pathname: "/**",
          }
        ],
      },
      reactStrictMode: false,
};

export default nextConfig;
