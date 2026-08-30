/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Angels-Website",
  assetPrefix: "/Angels-Website/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
