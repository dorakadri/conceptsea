/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "img.clerk.com",
          },
          {
            protocol: "https",
            hostname: "images.clerk.dev",
          },
          {
            protocol: "http",
            hostname: "res.cloudinary.com",
          }
        ],
         
}
}
module.exports = nextConfig
