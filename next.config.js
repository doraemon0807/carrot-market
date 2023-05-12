/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["imagedelivery.net", "videodelivery.net"],
  },
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
