/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com", // For Google OAuth profile pictures
      "via.placeholder.com", // For placeholder images
      "avatars.githubusercontent.com", // For GitHub profile pictures
    ],
  },
};

module.exports = nextConfig;
