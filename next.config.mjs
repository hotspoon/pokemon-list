/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**"
      },
      {
        protocol: "https",
        hostname: "pokeres.bastionbot.org",
        pathname: "/images/pokemon/**"
      }
    ]
  }
}

export default nextConfig
