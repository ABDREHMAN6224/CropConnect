/** @type {import('next').NextConfig} */
const nextConfig = {

  // reactStrictMode: false,
};

// configure localhost under images
nextConfig.images = {
  domains: ["localhost"],
};

export default nextConfig;
